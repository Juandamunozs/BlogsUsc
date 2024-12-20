﻿using BlogsApps.Server.Repositories;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            // Aquí van los repositorios
            services.AddScoped<IMilkRepository, MilkRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICommentRepository, CommentRepository>();// Agregado el registro para UserRepository
            services.AddScoped<ILikedPostRepository, LikedPostRepository>();
            services.AddScoped<IPostRepository, PostRepository>();

            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlServer(connectionString);
            });

            return services;
        }
    }
}
