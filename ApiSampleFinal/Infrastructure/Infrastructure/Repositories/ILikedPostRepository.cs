using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BlogsApps.Server.Models;

namespace BlogsApps.Server.Repositories
{
    public interface ILikedPostRepository
    {
        Task<IEnumerable<LikedPost>> GetAllLikePostsAsync();
        Task<LikedPost> GetLikePostByIdAsync(Guid id);
        Task AddLikePostAsync(LikedPost likePost);
        Task UpdateLikePostAsync(LikedPost likePost);
        Task DeleteLikePostAsync(Guid id);
        Task<bool> LikePostExistsAsync(Guid id);
    }
}
