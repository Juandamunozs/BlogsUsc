using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BlogsApps.Server.Models;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace BlogsApps.Server.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly AppDbContext _context;

        public CommentRepository(AppDbContext context)
        {
            _context = context;
        }

        // Obtener todos los comentarios
        public async Task<IEnumerable<Comment>> GetAllCommentsAsync()
        {
            return await _context.Coments.ToListAsync();
        }

        // Obtener un comentario por su ID
        public async Task<Comment> GetCommentByIdAsync(Guid id)
        {
            return await _context.Coments.FindAsync(id);
        }

        // Agregar un nuevo comentario
        public async Task AddCommentAsync(Comment comment)
        {
            await _context.Coments.AddAsync(comment);
            await _context.SaveChangesAsync();
        }

        // Actualizar un comentario existente
        public async Task UpdateCommentAsync(Comment comment)
        {
            _context.Coments.Update(comment);
            await _context.SaveChangesAsync();
        }

        // Eliminar un comentario por su ID
        public async Task DeleteCommentAsync(Guid id)
        {
            var comment = await _context.Coments.FindAsync(id);
            if (comment != null)
            {
                _context.Coments.Remove(comment);
                await _context.SaveChangesAsync();
            }
        }

        // Verificar si un comentario existe
        public async Task<bool> CommentExistsAsync(Guid id)
        {
            return await _context.Coments.AnyAsync(e => e.Id == id);
        }
    }
}
