# c# / İrsaliyeden Fatura Oluşturma

Created: July 29, 2025 2:48 PM
Link: https://dys.logo.cloud/external?cid=805af85e-f2a2-4a22-a935-e6702226417c&link=9fb5a4bf-4dd5-4241-92ed-05f761cfe29b&tenantId=cdd87e13-3009-4dd1-a5b8-2a005c0e58da&hideName=True&locale=tr_TR

```csharp
using System;

using System.Runtime.InteropServices;

using NetOpenX50;

namespace NetOpenXTest

{

    public static class FaturaOrnek

    {     

        public static void Irsaliye2Fatura()

        {

            Kernel kernel = new Kernel();

            Sirket sirket = default(Sirket);

            Fatura irsaliye = default(Fatura);

            Fatura fatura = default(Fatura);

            FatUst faturaUst = default(FatUst);

            try

            {

                sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                              "vt adi",

                                              "vt kull adi",

                                              "vt kull sifre",

                                              "netsis kull adi",

                                              "netsis sifre",

                                              0);

                irsaliye = kernel.yeniFatura(sirket, TFaturaTip.ftSIrs);

                irsaliye.OkuUst("I00000000000002", "00002");

                irsaliye.OkuKalem();

                fatura = kernel.yeniFatura(sirket, TFaturaTip.ftSFat);

                faturaUst = fatura.Ust();

                faturaUst.FATIRS_NO = fatura.YeniNumara("A");

                irsaliye.Irsaliye2Fatura(fatura);

            }

            finally

            {

                Marshal.ReleaseComObject(faturaUst);

                Marshal.ReleaseComObject(fatura);

                Marshal.ReleaseComObject(irsaliye);

                Marshal.ReleaseComObject(sirket);

                kernel.FreeNetsisLibrary();

                Marshal.ReleaseComObject(kernel);

            }

        }       

    }

}
```