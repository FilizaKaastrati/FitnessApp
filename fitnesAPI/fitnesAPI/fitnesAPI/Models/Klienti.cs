using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fitnesAPI.Models
{
    public class Klienti
    {
        public int KlientId { get; set; }
        public string KlientName { get; set; }
        public string Trainer { get; set; }

        public string DateOfJoining { get; set; }

        public string PhotoFileName { get; set; }

    }
}
