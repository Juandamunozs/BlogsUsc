using BlogsApps.Server.Models;
using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
         public DbSet<Milk> Milks { get; set; }
         public DbSet<Cow> Cows { get; set; }
        public DbSet<Blog> Blogs  { get; set;  }
        public DbSet<Comment> Coments { get; set; }
        public DbSet<LikedPost> LikedPosts{ get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<User> Users { get; set; }

    }

}
