namespace ApiSampleFinal.Models.LikePostModels
{
    public class LikePostDTO
    {
        public Guid Id { get; set; }  // Identificador del Like
        public Guid PostId { get; set; }  // Identificador de la publicación que se ha dado "like"
        public Guid UserId { get; set; }  // Identificador del usuario que ha dado el "like"
     
    }
}
