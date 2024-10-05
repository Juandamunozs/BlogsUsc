using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public interface IMilkRepository
    {
        Milk GetMilk(Guid id);
        void Save(Milk milk);
    }
}
