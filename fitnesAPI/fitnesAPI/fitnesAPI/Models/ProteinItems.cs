using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace fitnesAPI.Models
{
    public class ProteinItems
    {
        public int ProteinItemId { get; set; }
        public string ProteinItemName { get; set; }
        public decimal Price { get; set; }
    }
}
