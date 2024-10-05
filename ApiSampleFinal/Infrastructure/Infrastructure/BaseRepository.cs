using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore.Query.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class BaseRepository
    {
        public readonly AppDbContext context;
        public BaseRepository(AppDbContext context)
        {
            this.context = context;
        }

        public void Save()
        {
            context.SaveChanges();
        }

        public void Beguin()
        {
            context.Database.BeginTransaction();
        }
        public void Comit()
        {
            context.Database.CommitTransaction();
        }

        public void RollBack()
        {
            context.Database.RollbackTransaction();
        }
    }
}
