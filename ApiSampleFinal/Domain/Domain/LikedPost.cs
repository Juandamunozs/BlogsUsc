using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogsApps.Server.Models
{
    public class LikedPost
    {
        //ID
        [Key]
        public Guid Id { get; set; }

        //Author is user ID
        public User? User { get; set; }

        //Post ID
        public Guid? PostId { get; set; }
        public Post? Post { get; set; }
    }
}
