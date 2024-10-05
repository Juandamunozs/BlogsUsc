using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class MilkRepository : BaseRepository, IMilkRepository
    {
        public MilkRepository(AppDbContext context) : base(context)
        {
        }

        public Milk GetMilk(Guid id)
        {
            return context.Milks.Find(id);
        }

        public void Save(Milk milk)
        {
            try
            {
                Beguin();
                context.Milks.Add(milk);
                Comit();
                Save();
            }
            catch (Exception ex) 
            {
                RollBack();
                throw ex;
            }
        }
    }
}
