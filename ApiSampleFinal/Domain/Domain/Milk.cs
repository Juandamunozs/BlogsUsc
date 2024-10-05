using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Milk
    {
        //indicamos que id es la llave primaria
       // [Key]
        public Guid Id { get; set; }
        public int Litters { get; set; }
        public string Farm { get; set; } 
        public DateTime ExpirationDate { get; set; }
        public Milk() 
        {
            Farm = string.Empty;
        }

    }
}
