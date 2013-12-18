using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IsQandoUp.QandoApi
{
    public class QandoDeparture
    {
        public int? Countdown { get; set; }

        public DateTime? TimePlanned { get; set; }
        public DateTime? TimeReal { get; set; }
    }
}
