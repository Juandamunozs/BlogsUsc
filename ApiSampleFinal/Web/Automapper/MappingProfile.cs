using ApiSampleFinal.Models.MilkModels;
using ApiSampleFinal.Models.UserModels; // Asegúrate de que el espacio de nombres es correcto
using ApiSampleFinal.Models.CommentModels; // Asegúrate de que el espacio de nombres es correcto para los comentarios
using ApiSampleFinal.Models.LikePostModels; // Asegúrate de que el espacio de nombres es correcto para los LikePosts
using ApiSampleFinal.Models.PostModels; // Asegúrate de que el espacio de nombres es correcto para los Posts
using AutoMapper;
using BlogsApps.Server.Models;
using Domain;

namespace ApiSampleFinal.Automapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            MilkMapper();
            UserMapper();     // Añadir mapeo de User
            CommentMapper();  // Añadir mapeo de Comment
            LikePostMapper(); // Añadir mapeo de LikePost
            PostMapper();     // Añadir mapeo de Post
        }

        private void MilkMapper()
        {
            CreateMap<Milk, MilkDTO>()
                .ReverseMap(); // Mapeo bidireccional de Milk y MilkDTO
        }

        private void UserMapper()
        {
            CreateMap<User, UserDTO>()
                .ReverseMap(); // Mapeo bidireccional de User y UserDTO
        }

        private void CommentMapper()
        {
            CreateMap<Comment, CommentDTO>()
                .ReverseMap(); // Mapeo bidireccional de Comment y CommentDTO
        }

        private void LikePostMapper()
        {
            CreateMap<LikedPost, LikePostDTO>()
                .ReverseMap(); // Mapeo bidireccional de LikedPost y LikePostDTO
        }

        private void PostMapper()
        {
            CreateMap<Post, PostDTO>()
                //.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.User != null ? src.User.UserId : Guid.Empty)) // Manejo de nulos
                .ReverseMap(); // Mapeo bidireccional de Post y PostDTO
        }
    }
}
