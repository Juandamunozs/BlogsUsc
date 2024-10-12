using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BlogsApps.Server.Models;

namespace BlogsApps.Server.Repositories
{
    public interface ICommentRepository
    {
        Task<IEnumerable<Comment>> GetAllCommentsAsync();         // Obtener todos los comentarios
        Task<Comment> GetCommentByIdAsync(Guid id);              // Obtener un comentario por su ID
        Task AddCommentAsync(Comment comment);                    // Agregar un nuevo comentario
        Task UpdateCommentAsync(Comment comment);                 // Actualizar un comentario existente
        Task DeleteCommentAsync(Guid id);                         // Eliminar un comentario por su ID
        Task<bool> CommentExistsAsync(Guid id);                  // Verificar si un comentario existe
    }
}
