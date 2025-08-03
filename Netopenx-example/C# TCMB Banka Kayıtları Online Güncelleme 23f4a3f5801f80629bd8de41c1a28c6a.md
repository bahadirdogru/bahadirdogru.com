# C# / TCMB Banka Kayıtları Online Güncelleme

Created: July 29, 2025 2:57 PM

```csharp
Kernel kernel = new Kernel();

         Sirket sirket = default(Sirket);

            try

            {

                  sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

               "vt adi",

               "vt kull adi",

               "vt kull sifre",

               "netsis kull adi",

                "netsis sifre",

                0);

                sirket.TCMBBankaKodlariOnlineGuncelleme("0001", "");

 

            }

            catch (Exception exp)

            {

                MessageBox.Show("Hata: " + exp.Message);

            }

            finally

            {

                Marshal.ReleaseComObject(sirket);

                kernel.FreeNetsisLibrary();

                Marshal.ReleaseComObject(kernel);

            } 
```