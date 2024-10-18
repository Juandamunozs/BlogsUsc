using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlogsApps.Server.Models;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace BlogsApps.Server.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly AppDbContext _context;

        public PostRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Post>> GetAllPostsAsync()
        {
            //return await _context.Posts.Include(x=>x.User).ToListAsync();
            return await _context.Posts.ToListAsync();
        }

        public async Task<Post> GetPostByIdAsync(Guid id)
        {
            return await _context.Posts.FindAsync(id);
        }

        public async Task AddPostAsync(Post post)
        {
            await _context.Posts.AddAsync(post);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePostStatusAsync(Guid id, string status)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post != null)
            {
                post.Status = status;
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdatePostAsync(Post post)
        {
            _context.Posts.Update(post);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePostAsync(Guid id)
        {
            // Primero, eliminar los registros en LikedPosts que referencian a este post
            var likedPosts = await _context.LikedPosts.Where(lp => lp.PostId == id).ToListAsync();
            if (likedPosts.Any())
            {
                _context.LikedPosts.RemoveRange(likedPosts);
            }

            // Luego, buscar y eliminar el post
            var post = await _context.Posts.FindAsync(id);
            if (post != null)
            {
                _context.Posts.Remove(post);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> PostExistsAsync(Guid id)
        {
            return await _context.Posts.AnyAsync(p => p.Id == id);
        }
    }
}
