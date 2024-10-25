using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BlogsApps.Server.Models;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace BlogsApps.Server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;  // Cambiar a AppDbContext según tu implementación

        public UserRepository(AppDbContext context)
        {
            _context = context;  // Sin validación ni manejo de errores
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();  // Obtener todos los usuarios
        }

        public async Task<User> GetUserByIdAsync(Guid id)
        {
            return await _context.Users.FindAsync(id);  // Buscar usuario por ID
        }

        public async Task AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);  // Agregar usuario
            await _context.SaveChangesAsync();  // Guardar cambios
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Entry(user).State = EntityState.Modified;  // Marcar como modificado
            await _context.SaveChangesAsync();  // Guardar cambios
        }

        public async Task DeleteUserAsync(Guid userId)
        {
            // Eliminar primero los posts creados por el usuario
            var userPosts = await _context.Posts.Where(p => p.UserId == userId).ToListAsync();
            if (userPosts.Any())
            {
                // Eliminar las entidades relacionadas a cada post del usuario
                foreach (var post in userPosts)
                {
                    // Eliminar registros en LikedPosts que referencian al post del usuario
                    var likedPosts = await _context.LikedPosts.Where(lp => lp.PostId == post.Id).ToListAsync();
                    if (likedPosts.Any())
                    {
                        _context.LikedPosts.RemoveRange(likedPosts);
                    }

                    // Eliminar los comentarios asociados al post
                    var comments = await _context.Coments.Where(c => c.PostId == post.Id).ToListAsync();
                    if (comments.Any())
                    {
                        _context.Coments.RemoveRange(comments);
                    }

                    // Eliminar el post
                    _context.Posts.Remove(post);
                }
            }

            // Eliminar los likes del usuario en otros posts
            var userLikedPosts = await _context.LikedPosts.Where(lp => lp.UserId == userId).ToListAsync();
            if (userLikedPosts.Any())
            {
                _context.LikedPosts.RemoveRange(userLikedPosts);
            }

            // Eliminar los comentarios del usuario
            var userComments = await _context.Coments.Where(c => c.UserId == userId).ToListAsync();
            if (userComments.Any())
            {
                _context.Coments.RemoveRange(userComments);
            }

            // Finalmente, buscar y eliminar el usuario
            var user = await _context.Users.FindAsync(userId);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }


        public async Task<bool> UserExistsAsync(Guid id)
        {
            return await _context.Users.AnyAsync(e => e.UserId == id);  // Comprobar si existe
        }
    }
}
