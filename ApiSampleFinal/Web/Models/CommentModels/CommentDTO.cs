namespace ApiSampleFinal.Models.CommentModels
{
    public class CommentDTO
    {
        public Guid Id { get; set; }  // El identificador del comentario

        public string Content { get; set; }  // Contenido del comentario

        public Guid UserId { get; set; }  // Identificador del usuario que hizo el comentario

        public DateTime PubDate { get; set; }  // Fecha y hora de creación del comentario

        public Guid PostId { get; set; }  // Identificador del post al que pertenece el comentario (si aplica)
    }
}
