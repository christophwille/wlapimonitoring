using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qando.Api
{
    // https://github.com/tjanczuk/edge#how-to-integrate-c-code-into-nodejs-code
    public class Startup
    {
        public async Task<object> Invoke(object input)
        {
            var schnittstelle = new EchtzeitdatenSchnittstelle();

            // FID,SHAPE,BEZEICHNUNG,WL_NUMMER
            // HALTESTELLEWLOGD.1148,POINT (16.37788989956199 48.21175015056167),Schwedenplatz,1198
            MonitorInformation result = await schnittstelle.GetMonitorInformationAsync(1198);

            return result;
        }
    }
}
