using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyspotecTestService.Business.Models
{
    public class TicketStatus
    {
        private static readonly string ON_PROCCESS = "En proceso";
        private static readonly string SUSPENDED = "Suspendido";
        private static readonly string FINISHED = "Terminado";
        private static readonly string EXPIRED = "Vencida";

        public static string OnProccess
        {
            get
            {
                return ON_PROCCESS;
            }
        }

        public static string Suspended
        {
            get
            {
                return SUSPENDED;
            }
        }

        public static string Finished
        {
            get
            {
                return FINISHED;
            }
        }

        public static string Expired
        {
            get
            {
                return EXPIRED;
            }
        }

    }
}
