using BookSwap.Domain.Models.Service;
using BookSwap.Domain.Models.User;

namespace BookSwap.BusinessLayer.Interfaces;

public interface IUserLogic
{
    ServiceResponse Register(UserCreateDto dto);
    ServiceResponse Login(LoginDto dto);
    ServiceResponse GetUserById(int id);
    ServiceResponse GetUserList();
    ServiceResponse DeleteUser(int id);
}