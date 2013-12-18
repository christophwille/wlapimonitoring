using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;
using IsQandoUp.QandoApi;

namespace IsQandoUp.Controllers
{
    public class QandoController : ApiController
    {
        // GET api/qando
        public async Task<MonitorInformation> Get()
        {
            var schnittstelle = new EchtzeitdatenSchnittstelle();

            // FID,SHAPE,BEZEICHNUNG,WL_NUMMER
            // HALTESTELLEWLOGD.1148,POINT (16.37788989956199 48.21175015056167),Schwedenplatz,1198
            MonitorInformation result = await schnittstelle.GetMonitorInformationAsync(1198);

            return result;
        }
    }
}
