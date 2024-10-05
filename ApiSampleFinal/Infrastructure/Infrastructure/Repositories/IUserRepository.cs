using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BlogsApps.Server.Models;

namespace BlogsApps.Server.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(Guid id);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(Guid id);
        Task<bool> UserExistsAsync(Guid id);
    }
}