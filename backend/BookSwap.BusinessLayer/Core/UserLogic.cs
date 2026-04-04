using BookSwap.BusinessLayer.Interfaces;
using BookSwap.BusinessLayer.Structure;
using BookSwap.Domain.Models.Service;
using BookSwap.Domain.Models.User;

namespace BookSwap.BusinessLayer.Core;

public class UserLogic : UserActions, IUserLogic
{
    public UserLogic() : base() { }

    public ServiceResponse Register(UserCreateDto dto)
        => RegisterAction(dto);

    public ServiceResponse Login(LoginDto dto)
        => LoginAction(dto);

    public ServiceResponse Logout(int userId)
        => LogoutAction(userId);

    public ServiceResponse GetUserById(int id)
        => GetUserByIdAction(id);

    public ServiceResponse GetUserList()
        => GetUserListAction();

    public ServiceResponse UpdateUser(int id, UserUpdateDto dto)
        => UpdateUserAction(id, dto);

    public ServiceResponse DeleteUser(int id)
        => DeleteUserAction(id);

    public ServiceResponse ChangeRole(int id, ChangeRoleDto dto)
        => ChangeRoleAction(id, dto);
}

