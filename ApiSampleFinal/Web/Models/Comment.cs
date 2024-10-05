using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogsApps.Server.Models
{
    public class Comment
    {
        //ID
        [Key]
        public Guid Id { get; set; }

        //Content
        [Column(TypeName = "nvarchar(100)")]
        public required string Content { get; set; }

        //Author is user ID
        public Guid UserId { get; set; }
        public User? Users { get; set; }

        //Post ID
        public Guid? PostId { get; set; }
        public Post? Posts { get; set; }


        //PubDate
        public DateTime PubDate { get; set; }

    }
}
