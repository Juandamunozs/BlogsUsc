using System.ComponentModel.DataAnnotations;

namespace BlogsApps.Server.Models
{
    public class Blog
    {
        [Key]
        public Guid Id { get; set; }
       public  IList<Post> Blogs { get; set; } = new List<Post>();
    }
}
