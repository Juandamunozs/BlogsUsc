using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogsApps.Server.Models
{
    public class Post
    {
        //ID
        [Key]
        public Guid Id { get; set; }
        public int Rating {  get; set; }

        //Title
        [Column(TypeName = "nvarchar(100)")]
        public required string Title { get; set; }

        //Content
        [Column(TypeName = "nvarchar(1200)")]
        public required string Content { get; set; }

        //Author is user ID
        public User? User { get; set; }


        //Status
        [Column(TypeName = "nvarchar(100)")]
        public required string Status { get; set; }

        //PubDate
       
        public required DateTime PubDate { get; set; }

        public Guid BlogId { get; set; }
        public Blog Blog { get; set; }

        public IList<Comment> Comments { get; set; } = new List<Comment>();
        public IList<LikedPost> LikedPosts { get; set; } = new List<LikedPost>();

    }
}
