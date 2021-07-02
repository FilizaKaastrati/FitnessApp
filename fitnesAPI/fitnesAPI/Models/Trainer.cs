using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fitnesAPI.Models
{
    public class Trainer
    {
        public int TrainerId { get; set; }
        public string TrainerName { get; set; }
        public string Fitnes { get; set; }

        public string DateOfJoining { get; set;}

        public string PhotoFileName { get; set; }

    }
}
