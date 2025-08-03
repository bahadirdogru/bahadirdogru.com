# c# / Satış Talep Teklifleştirme

Created: July 29, 2025 2:49 PM

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

 

                siparis = kernel.YeniTalepTeklifIslem(sirket, TFaturaTip.ftSatTalep);

                siparis.BelgeTipi = TFaturaTip.ftSatTeklif;

                siparis.BelgeNo = siparis.YeniNumara("R");

                //siparis.BelgelerKapatilsin = true;

                siparis.ProjeKirilimiYapilsin = true;

                siparis.kalemYeni("000000000000041", "320-01-041", 1);

                siparis.kalemYeni("000000000000041", "320-01-041", 2);

 

                siparis.Tekliflestir();

 

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