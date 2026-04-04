using BCrypt.Net;
using BookSwap.DataAccessLayer;
using BookSwap.DataAccessLayer.Context;
using BookSwap.Domain.Entities.User;
using BookSwap.Domain.Models.Service;
using BookSwap.Domain.Models.User;

namespace BookSwap.BusinessLayer.Structure;

public class UserActions
{
    public UserActions() { }

    protected ServiceResponse RegisterAction(UserCreateDto dto)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var exists = db.Users.Any(u => u.Email == dto.Email);
        if (exists)
            return new ServiceResponse { IsSuccess = false, Message = "Email already in use" };
        
        var usernameExists = db.Users.Any(u => u.Username == dto.Username);
        if (usernameExists)
            return new ServiceResponse { IsSuccess = false, Message = "Username already in use" };

        var user = new UserEntity
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Username = dto.Username,
            Email = dto.Email,
            Phone = dto.Phone,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = UserRole.User,
            CreatedAt = DateTime.UtcNow
        };

        try
        {
            db.Users.Add(user);
            db.SaveChanges();
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Register failed" };
        }

        return new ServiceResponse { IsSuccess = true, Message = "Register success" };
    }

    protected ServiceResponse LoginAction(LoginDto dto)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var user = db.Users.FirstOrDefault(u =>
            u.Email == dto.EmailOrUsername ||
            u.Username == dto.EmailOrUsername
        );

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return new ServiceResponse { IsSuccess = false, Message = "Invalid credentials" };

        var tokenService = new TokenService();
        user.SessionId = tokenService.GenerateToken();
        db.SaveChanges();

        var userInfo = new UserInfoDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Username = user.Username,
            Email = user.Email,
            Phone = user.Phone,
            Role = user.Role.ToString().ToLower(),
            SessionId = user.SessionId,
            CreatedAt = user.CreatedAt
        };

        return new ServiceResponse { IsSuccess = true, Data = userInfo };
    }

    protected ServiceResponse LogoutAction(int userId)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var user = db.Users.Find(userId);
        if (user == null)
            return new ServiceResponse { IsSuccess = false, Message = "User not found" };

        user.SessionId = string.Empty;

        try
        {
            db.SaveChanges();
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Logout failed" };
        }

        return new ServiceResponse { IsSuccess = true, Message = "Logged out" };
    }

    protected ServiceResponse GetUserByIdAction(int id)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var user = db.Users.Find(id);
        if (user == null)
            return new ServiceResponse { IsSuccess = false, Message = "User not found" }; 

        var userInfo = new UserInfoDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Username = user.Username,
            Email = user.Email,
            Phone = user.Phone,
            Role = user.Role.ToString().ToLower(),
            SessionId = user.SessionId,
            CreatedAt = user.CreatedAt
        };

        return new ServiceResponse { IsSuccess = true, Data = userInfo };
    }

    protected ServiceResponse GetUserListAction()
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var list = db.Users
            .Select(u => new UserInfoDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Username = u.Username,
                Email = u.Email,
                Phone = u.Phone,
                Role = u.Role.ToString().ToLower(),
                SessionId = u.SessionId,
                CreatedAt = u.CreatedAt
            }).ToList();

        return new ServiceResponse { IsSuccess = true, Data = list };
    }

    protected ServiceResponse UpdateUserAction(int id, UserUpdateDto dto)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var user = db.Users.Find(id);
        if (user == null)
            return new ServiceResponse { IsSuccess = false, Message = "User not found" };

        user.FirstName = dto.FirstName;
        user.Username = dto.Username;
        user.Phone = dto.Phone;

        try
        {
            db.SaveChanges();
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Update failed" };
        }

        return new ServiceResponse { IsSuccess = true, Message = "User updated" };
    }

    protected ServiceResponse DeleteUserAction(int id)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var user = db.Users.Find(id);
        if (user == null)
            return new ServiceResponse { IsSuccess = false, Message = "User not found" };

        try
        {
            db.Users.Remove(user);
            db.SaveChanges();
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Delete failed" };
        }

        return new ServiceResponse { IsSuccess = true, Message = "User deleted" };
    }

    protected ServiceResponse ChangeRoleAction(int id, ChangeRoleDto dto)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var user = db.Users.Find(id);
        if (user == null)
            return new ServiceResponse { IsSuccess = false, Message = "User not found" };

        if (!Enum.TryParse<UserRole>(dto.Role, true, out var newRole))
            return new ServiceResponse { IsSuccess = false, Message = "Invalid role. Use: user, admin" };

        user.Role = newRole;

        try
        {
            db.SaveChanges();
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Change role failed" };
        }

        return new ServiceResponse { IsSuccess = true, Message = $"Role changed to {newRole}" };
    }
}
