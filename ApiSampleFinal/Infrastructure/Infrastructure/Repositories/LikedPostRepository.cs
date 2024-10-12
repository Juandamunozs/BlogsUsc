using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlogsApps.Server.Models;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace BlogsApps.Server.Repositories
{
    public class LikedPostRepository : ILikedPostRepository
    {
        private readonly AppDbContext _context;

        public LikedPostRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<LikedPost>> GetAllLikePostsAsync()
        {
            return await _context.LikedPosts.ToListAsync();
        }

        public async Task<LikedPost> GetLikePostByIdAsync(Guid id)
        {
            return await _context.LikedPosts.FindAsync(id);
        }

        public async Task AddLikePostAsync(LikedPost likedPost)
        {
            _context.LikedPosts.Add(likedPost);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateLikePostAsync(LikedPost likePost)
        {
            _context.Entry(likePost).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteLikePostAsync(Guid id)
        {
            var likePost = await _context.LikedPosts.FindAsync(id);
            if (likePost != null)
            {
                _context.LikedPosts.Remove(likePost);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> LikePostExistsAsync(Guid id)
        {
            return await _context.LikedPosts.AnyAsync(e => e.Id == id);
        }
    }
}
