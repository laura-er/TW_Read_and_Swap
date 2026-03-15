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
            Username = dto.Username,
            Email = dto.Email,
            PasswordHash = dto.Password,
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
            .FirstOrDefault(u => u.Email == dto.Email && u.PasswordHash == dto.Password);

        if (user == null)
            return new ServiceResponse { IsSuccess = false, Message = "Invalid email or password" };

        var userInfo = new UserInfoDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Role = user.Role,
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
            Username = user.Username,
            Email = user.Email,
            Role = user.Role,
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
                Username = u.Username,
                Email = u.Email,
                Role = u.Role,
                CreatedAt = u.CreatedAt
            }).ToList();

        return new ServiceResponse { IsSuccess = true, Data = list };
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
