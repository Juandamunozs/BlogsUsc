using ApiSampleFinal.Models.MilkModels;
using ApiSampleFinal.Models.UserModels; // Asegúrate de que el espacio de nombres es correcto
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
            UserMapper(); // Añadir mapeo de User
        }

        private void MilkMapper()
        {
            CreateMap<Milk, MilkDTO>()
                .ReverseMap();
        }

        private void UserMapper()
        {
            CreateMap<User, UserDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid())) // Genera un nuevo Id si es necesario
                .ReverseMap();
        }
    }
}
