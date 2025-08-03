# c# / Satır Bazı Açıklama Girişi

Created: July 29, 2025 2:52 PM

```csharp
using System;

using System.Runtime.InteropServices;

using NetOpenX50;

  

namespace NetOpenXTest

{

    public static class FaturaOrnek

    {

        public static void SatisFaturasiKaydet()

        {

            Kernel kernel = new Kernel();

            Sirket sirket = default(Sirket);

            Fatura fatura = default(Fatura);

            FatUst fatUst = default(FatUst);

            FatKalem fatKalem = default(FatKalem);

            try

            {

                sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                      "vt adı",

                                      "vt kull adı",

                                      "vt kull sifre",

                                      "netsis kull adı",

                                      "netsis kull sifre",

                                                  "şube kodu");

 

                fatura = kernel.yeniFatura(sirket, TFaturaTip.ftSFat);

                

                fatUst = fatura.Ust();

                fatUst.FATIRS_NO = fatura.YeniNumara("A");

                fatUst.CariKod = "00002";

                fatUst.Tarih = DateTime.Now;

                fatUst.ENTEGRE_TRH = DateTime.Now;

                fatUst.FiiliTarih = DateTime.Now;

                fatUst.TIPI = TFaturaTipi.ft_Acik;

                fatUst.PLA_KODU = "02";

                fatUst.Proje_Kodu = "033";

                fatUst.KDV_DAHILMI = true;

                

                fatKalem = fatura.kalemYeni("00003");

                fatKalem.DEPO_KODU = 2;

                fatKalem.STra_GCMIK = 5;

                fatKalem.STra_NF = 12;

                fatKalem.STra_BF = 12;

                fatKalem.SatirBaziAcik[1] = "satır açıklama deneme 1";

                fatKalem.SatirBaziAcik[1] = "satır açıklama deneme 2";

  

                fatura.kayitYeni();

            }

            finally

            {

                Marshal.ReleaseComObject(fatKalem);

                Marshal.ReleaseComObject(fatUst);

                Marshal.ReleaseComObject(fatura);

                Marshal.ReleaseComObject(sirket);

                kernel.FreeNetsisLibrary();

                Marshal.ReleaseComObject(kernel);

             }

        }       

    }

}
```