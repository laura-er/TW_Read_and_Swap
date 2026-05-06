using BookSwap.Domain.Models.Service;
using BookSwap.Domain.Models.User;

namespace BookSwap.BusinessLayer.Interfaces;

public interface IUserLogic
{
    ServiceResponse Register(UserCreateDto dto);
    ServiceResponse Login(LoginDto dto);
    ServiceResponse Logout(int userId);
    ServiceResponse GetUserById(int id);
    ServiceResponse GetUserByUsername(string username);
    ServiceResponse GetUserList();
    ServiceResponse UpdateUser(int id, UserUpdateDto dto);
    ServiceResponse DeleteUser(int id);
    ServiceResponse ChangeRole(int id, ChangeRoleDto dto);
}