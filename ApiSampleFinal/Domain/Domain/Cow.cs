using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Cow
    {
        [Key]
        public Guid Id { get; set; }
        public string Race {  get; set; }
         public Milk Milk { get; set; }
    }
}
