# C# / Bağlantı Bilgisi Okuma

Created: July 6, 2021 5:26 PM

```csharp
using System;
using System.Windows.Forms;
using NetOpenX50;
using System.Runtime.InteropServices;

namespace NetOpenXTest
{
  public partial class NetTest: Form
  {
    public void Baglanti()
    {
    Kernel kernel = new Kernel();
    Sirket sirket = default(Sirket);
    BaglantiAna bagana = default(BaglantiAna);
    Baglanti bag = default(Baglanti);
    try
    {
      sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,
            "vt adi",
            "vt kull adi",
            "vt kull sifre",
            "netsis kull adi",
            "netsis sifre",
            0);

      bagana = kernel.yeniBaglantiAna(sirket);
      bagana.Oku("100");//cari kodu

      for (int i = 0; i < bagana.BaglantiAdedi ; i++)
      {
         MessageBox.Show(bagana.Baglanti[i].CariKod);
         MessageBox.Show(bagana.Baglanti[i].TIPI + "-" + bagana.Baglanti[i].BaglantiNo);
         MessageBox.Show(bagana.Baglanti[i].Aciklama+ "-" + bagana.Baglanti[i].AlisHesKod);
         MessageBox.Show(bagana.Baglanti[i].BagTutar + "-" + bagana.Baglanti[i].BorcHesKod);
         MessageBox.Show(Convert.ToString(bagana.Baglanti[i].VadeTarihi));
      }

    finally
    {
      Marshal.ReleaseComObject(bag);
      Marshal.ReleaseComObject(bagana);
      Marshal.ReleaseComObject(sirket);
      kernel.FreeNetsisLibrary();
      Marshal.ReleaseComObject(kernel);
    }
  }
}
```