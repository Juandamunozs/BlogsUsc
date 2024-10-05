using Microsoft.EntityFrameworkCore;

namespace BlogsApps.Server.Models
{
    public class ModelsDbContext : DbContext
    {
        public ModelsDbContext(DbContextOptions<ModelsDbContext> options) : base(options)
        {

        }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<LikedPost> LikedPosts { get; set; }
        public DbSet<Post> Posts { get; set; }
       // public DbSet<Rating> Ratings { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Blog> Blogs { get; set; }
    }
}
