using BookSwap.BusinessLayer.Interfaces;
using BookSwap.BusinessLayer.Structure;
using BookSwap.DataAccessLayer.Context;
using BookSwap.Domain.Models.Service;
using BookSwap.Domain.Models.User;

namespace BookSwap.BusinessLayer.Core;

public class UserLogic : UserActions, IUserLogic
{
    public UserLogic(BookSwapDbContext context) : base(context) { }

    public ServiceResponse Register(UserCreateDto dto)
        => RegisterAction(dto);

    public ServiceResponse Login(LoginDto dto)
        => LoginAction(dto);

    public ServiceResponse GetUserById(int id)
        => GetUserByIdAction(id);

    public ServiceResponse GetUserList()
        => GetUserListAction();

    public ServiceResponse UpdateUser(int id, UserUpdateDto dto)
        => UpdateUserAction(id, dto);

    public ServiceResponse DeleteUser(int id)
        => DeleteUserAction(id);
}

