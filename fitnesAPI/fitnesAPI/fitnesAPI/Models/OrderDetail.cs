using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace fitnesAPI.Models
{
    public class OrderDetails
    {
        
        public int OrderDetailId { get; set; }
        public int OrderMasterId { get; set; }
        public int ProteinItemId { get; set; }
        public decimal ProteinItemPrice { get; set; }
         public int Quantity { get; set; }


    }
}
