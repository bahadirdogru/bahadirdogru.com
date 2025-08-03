# c# / Satın Alma Talep Siparişleştirme

Created: July 29, 2025 2:48 PM
Link: https://dys.logo.cloud/external?cid=805af85e-f2a2-4a22-a935-e6702226417c&link=9fb5a4bf-4dd5-4241-92ed-05f761cfe29b&tenantId=cdd87e13-3009-4dd1-a5b8-2a005c0e58da&hideName=True&locale=tr_TR

```csharp
Kernel kernel = new Kernel();

            Sirket sirket = default(Sirket);

            TalepTeklifIslem siparis = default(TalepTeklifIslem);

            MessageBox.Show(kernel.Version);

            try

            {

                 sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                      "vt adı",

                                      "vt kull adı",

                                      "vt kull sifre",

                                      "netsis kull adı",

                                      "netsis kull sifre",

                                      sube kodu);

 

                siparis = kernel.YeniTalepTeklifIslem(sirket, TFaturaTip.ftAlTalep);

                siparis.BelgeTipi = TFaturaTip.ftASip;

                siparis.BelgeNo = siparis.YeniNumara("R");

                //siparis.BelgelerKapatilsin = true;

                siparis.ProjeKirilimiYapilsin = true;

                siparis.kalemYeni("000000000000041", "320-01-041", 1);

                siparis.kalemYeni("000000000000041", "320-01-041", 2);

 

                siparis.Siparislestir();

 

                MessageBox.Show(siparis.BelgeNo);

            }

 

 

 

 

 

            finally

            {

 

                Marshal.ReleaseComObject(siparis);

                Marshal.ReleaseComObject(sirket);

                kernel.FreeNetsisLibrary();

                Marshal.ReleaseComObject(kernel);

            }
```