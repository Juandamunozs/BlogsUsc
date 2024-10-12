using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogsApps.Server.Models
{
    public class Post
    {
        // ID
        [Key]
        public Guid Id { get; set; }

        // Rating
        public int Rating { get; set; }

        // Title
        [Column(TypeName = "nvarchar(100)")]
        public required string Title { get; set; }

        // Content
        [Column(TypeName = "nvarchar(1200)")]
        public required string Content { get; set; }

        // Author is User ID (foreign key)
        public Guid UserId { get; set; }  // Clave foránea para User
        public User? User { get; set; }   // Relación con User

        // Status
        [Column(TypeName = "nvarchar(100)")]
        public required string Status { get; set; }

        // PubDate
        public required DateTime PubDate { get; set; }

        // Blog relationship
        public Guid BlogId { get; set; }  // Clave foránea para Blog
        public Blog Blog { get; set; }

        // List of Comments
        public IList<Comment> Comments { get; set; } = new List<Comment>();

        // List of Likes (LikedPosts)
        public IList<LikedPost> LikedPosts { get; set; } = new List<LikedPost>();
    }
}
