using ApiSampleFinal.Models.MilkModels;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace ApiSampleFinal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MilkSalesController : ControllerBase
    {
        public IMilkService MilkService { get; set; }
        //adicionar imapper por injeccion de dependencias
        public IMapper Mapper { get; set; }

        public MilkSalesController(IMilkService service, IMapper mapper)
        {
            MilkService = service;
            Mapper = mapper;
        }   
        [HttpGet("GetMilkExistences")]
        public IActionResult GetMilkExistences(Guid id)
        {
            Milk Availablemilk = MilkService.GetMilkExistences(id);
            //quitar al implementar automapper
            /*
            MilkDTO response = new MilkDTO()
            {
                ExpirationDate = Availablemilk.ExpirationDate,
                Farm = Availablemilk.Farm,
                Litters = Availablemilk.Litters
            };
           */
           // cambiar implemnntacion por el mapper
            return Ok(Mapper.Map<MilkDTO>(Availablemilk));

            //return Ok(response);
        }

        [HttpPost("AddMilkExistences")]
        public IActionResult AddMilkExistences([FromBody]MilkDTO milk)
        {
            MilkService.AddMilkExistences(Mapper.Map<Milk>(milk));
            return Ok();
        }
    }
}
