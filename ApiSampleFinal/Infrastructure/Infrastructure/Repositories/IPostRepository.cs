using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BlogsApps.Server.Models;

namespace BlogsApps.Server.Repositories
{
    public interface IPostRepository
    {
        Task<IEnumerable<Post>> GetAllPostsAsync();
        Task<Post> GetPostByIdAsync(Guid id);
        Task AddPostAsync(Post post);
        Task UpdatePostAsync(Post post);
        Task DeletePostAsync(Guid id);
        Task<bool> PostExistsAsync(Guid id);
        Task UpdatePostStatusAsync(Guid id, string status);
    }
}
