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

        public async Task DeleteUserAsync(Guid id)
        {
            var user = await _context.Users.FindAsync(id);  // Buscar usuario
            if (user != null)  // Sin validación adicional
            {
                _context.Users.Remove(user);  // Eliminar usuario
                await _context.SaveChangesAsync();  // Guardar cambios
            }
        }

        public async Task<bool> UserExistsAsync(Guid id)
        {
            return await _context.Users.AnyAsync(e => e.UserId == id);  // Comprobar si existe
        }
    }
}
