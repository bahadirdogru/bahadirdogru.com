# c# / Müşteri Siparişi Kaydı

Created: July 29, 2025 2:45 PM
Link: https://dys.logo.cloud/external?cid=805af85e-f2a2-4a22-a935-e6702226417c&link=9fb5a4bf-4dd5-4241-92ed-05f761cfe29b&tenantId=cdd87e13-3009-4dd1-a5b8-2a005c0e58da&hideName=True&locale=tr_TR

```csharp
using System;

using System.Runtime.InteropServices;

using NetOpenX50;

namespace NetOpenXTest

{

    public static class FaturaOrnek

    {

        public static void MusteriSiparisiKaydet()

        {

            Kernel kernel = new Kernel();

            Sirket sirket = default(Sirket);

            Fatura fatura = default(Fatura);

            FatUst fatUst = default(FatUst);

            FatKalem fatKalem = default(FatKalem);

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

                 

                fatura.StokKartinaGoreHesapla = true;

                fatUst = fatura.Ust();

                fatUst.FATIRS_NO = fatura.YeniNumara("A");

                fatUst.CariKod = "00002";

                fatUst.Tarih = DateTime.Now;

                fatUst.ENTEGRE_TRH = DateTime.Now;

                fatUst.FiiliTarih = DateTime.Now;

                fatUst.SIPARIS_TEST = DateTime.Now;

                fatUst.TIPI = TFaturaTipi.ft_YurtIci;

                fatUst.PLA_KODU = "02";

                fatUst.Proje_Kodu = "033";

                fatUst.KDV_DAHILMI = true;

                fatKalem = fatura.kalemYeni("00003");

                fatKalem.DEPO_KODU = 2;

                fatKalem.STra_GCMIK = 5;

                fatKalem.STra_NF = 12;

                fatKalem.STra_BF = 12;

                fatKalem.SatirBaziAcik[1] = "satır açıklama deneme";

 

                fatura.kayitYeni();

                MessageBox.Show(fatUst.FATIRS_NO);

           }

            catch (Exception ex)

               {

                 MessageBox.Show(ex.Message);

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