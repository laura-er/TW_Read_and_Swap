using BCrypt.Net;
using BookSwap.DataAccessLayer.Context;
using BookSwap.Domain.Entities.User;
using BookSwap.Domain.Models.Service;
using BookSwap.Domain.Models.User;

namespace BookSwap.BusinessLayer.Structure;

public class UserActions
{
    private readonly BookSwapDbContext _context;

    public UserActions(BookSwapDbContext context)
    {
        _context = context;
    }

    protected ServiceResponse RegisterAction(UserCreateDto dto)
    {
        var exists = _context.Users.Any(u => u.Email == dto.Email);
        if (exists)
            return new ServiceResponse { IsSuccess = false, Message = "Email already in use" };

        var user = new UserEntity
        {
            FirstName = dto.FirstName,
            Username = dto.Username,
            Email = dto.Email,
            Phone = dto.Phone,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = "user",
            CreatedAt = DateTime.UtcNow
        };

        try
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Register failed" };
        }

        return new ServiceResponse { IsSuccess = true, Message = "Register success" };
    }

    protected ServiceResponse LoginAction(LoginDto dto)
    {
        var user = _context.Users
            .FirstOrDefault(u => u.Email == dto.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return new ServiceResponse { IsSuccess = false, Message = "Invalid email or password" };

        user.SessionId = Guid.NewGuid().ToString();
        _context.SaveChanges();

        var userInfo = new UserInfoDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            Username = user.Username,
            Email = user.Email,
            Phone = user.Phone,
            Role = user.Role,
            SessionId = user.SessionId,
            CreatedAt = user.CreatedAt
        };

        return new ServiceResponse { IsSuccess = true, Data = userInfo };
    }

    protected ServiceResponse GetUserByIdAction(int id)
    {
        var user = _context.Users.Find(id);
        if (user == null)
            return new ServiceResponse { IsSuccess = false, Message = "User not found" };

        var userInfo = new UserInfoDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            Username = user.Username,
            Email = user.Email,
            Phone = user.Phone,
            Role = user.Role,
            SessionId = user.SessionId,
            CreatedAt = user.CreatedAt
        };

        return new ServiceResponse { IsSuccess = true, Data = userInfo };
    }

    protected ServiceResponse GetUserListAction()
    {
        var list = _context.Users
            .Select(u => new UserInfoDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                Username = u.Username,
                Email = u.Email,
                Phone = u.Phone,
                Role = u.Role,
                SessionId = u.SessionId,
                CreatedAt = u.CreatedAt
            }).ToList();

        return new ServiceResponse { IsSuccess = true, Data = list };
    }

    protected ServiceResponse UpdateUserAction(int id, UserUpdateDto dto)
    {
        var user = _context.Users.Find(id);
        if (user == null)
            return new ServiceResponse { IsSuccess = false, Message = "User not found" };

        user.FirstName = dto.FirstName;
        user.Username = dto.Username;
        user.Phone = dto.Phone;

        try
        {
            _context.SaveChanges();
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Update failed" };
        }

        return new ServiceResponse { IsSuccess = true, Message = "User updated" };
    }

    protected ServiceResponse DeleteUserAction(int id)
    {
        var user = _context.Users.Find(id);
        if (user == null)
            return new ServiceResponse { IsSuccess = false, Message = "User not found" };

        try
        {
            _context.Users.Remove(user);
            _context.SaveChanges();
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Delete failed" };
        }

        return new ServiceResponse { IsSuccess = true, Message = "User deleted" };
    }
}
