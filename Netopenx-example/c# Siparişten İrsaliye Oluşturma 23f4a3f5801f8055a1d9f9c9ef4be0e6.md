# c# / Siparişten İrsaliye Oluşturma

Created: July 29, 2025 2:47 PM

```csharp
using System; 

using System.Runtime.InteropServices;

using NetOpenX50;

 

namespace NetOpenXTest

{

    public static class FaturaOrnek

    {

        public static void Siparis2IrsFat()

        {

            Kernel kernel = new Kernel();

            Sirket sirket = default(Sirket);

            Fatura fatura = default(Fatura);

            Fatura irsaliye = default(Fatura);

            FatUst irsaliyeUst = default(FatUst);

            try

            {

                sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                              "vt adi",

                                              "vt kull adi",

                                              "vt kull sifre",

                                              "netsis kull adi",

                                              "netsis sifre",

                                              0);

                fatura = kernel.yeniFatura(sirket, TFaturaTip.ftSSip);

                fatura.OkuUst("M00000000000006", "00002");

                fatura.OkuKalem();

 

                irsaliye = kernel.yeniFatura(sirket, TFaturaTip.ftSIrs);

                irsaliyeUst = irsaliye.Ust();               

                 

                irsaliyeUst.FATIRS_NO = irsaliye.YeniNumara("A");

                fatura.Siparis2IrsFat(irsaliye);

            }

            finally

            {

                Marshal.ReleaseComObject(irsaliyeUst);

                Marshal.ReleaseComObject(irsaliye);

                Marshal.ReleaseComObject(fatura);

                Marshal.ReleaseComObject(sirket);

                kernel.FreeNetsisLibrary();

                Marshal.ReleaseComObject(kernel);

            }

        }       

    }

}
```