using System;

namespace ApiSampleFinal.Models.PostModels
{
    public class PostDTO
    {
        public Guid Id { get; set; }  // Identificador único del post

        public string Title { get; set; }  // Título del post

        public string Content { get; set; }  // Contenido del post

        public DateTime PubDate { get; set; }  // Fecha de creación

        public Guid UserId { get; set; }  // Relación con el usuario que creó el post

        public string Rating { get; set; }  // Rating

        public string Status { get; set; } //Estado

        public Guid BlogId { get; set; } // 
    }
}
