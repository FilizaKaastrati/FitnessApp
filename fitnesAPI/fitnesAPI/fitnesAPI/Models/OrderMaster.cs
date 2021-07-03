using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace fitnesAPI.Models
{
    public class OrderMaster
    {
        
        public int OrderMasterId { get; set; }
        public string OrderNumber { get; set; }
        public int Klienti{ get; set; }
        public string PMethod { get; set; }
        public decimal GTotal { get; set; }
    }
}
