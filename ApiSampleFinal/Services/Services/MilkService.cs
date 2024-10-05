using Domain;
using Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class MilkService : IMilkService
    {
        IMilkRepository MilkRepository { get; set; }
        public  MilkService(IMilkRepository MilkRepository)
        {
            this.MilkRepository = MilkRepository;
        }
        public void AddMilkExistences(Milk milk)
        {
            MilkRepository.Save(milk);
        }

        public Milk GetMilkExistences(Guid id)
        {
            Milk milk = MilkRepository.GetMilk(id);
            return new Milk();
        }
    }
}
