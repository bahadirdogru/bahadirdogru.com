# C# / Talep - Teklif Okuma

Created: July 29, 2025 3:57 PM

```csharp
using System;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using NetOpenX;

public class TekTalOkuma
{
    public void TekTalOku()
    {
        Kernel kernel = null;
        Sirket sirket = null;
        Fatura tekTal = null;
        FatUst tekTalUst = null;
        FatKalem tekTalKalem = null;

        try
        {
            kernel = new Kernel();

            sirket = kernel.yeniSirket(
                NETSISVT.vtOracle,
                "ENTERPRISE8",
                "TEMELSET",
                "",
                "NETSIS",
                "",
                32767
            );

            tekTal = kernel.yeniFatura(sirket, FaturaTipi.ftSatTeklif);

            // Faturanın üst bilgileri okunuyor
            tekTal.OkuUst("000000000088886", "BANKA");
            tekTalUst = tekTal.Ust;

            // İsterseniz üst bilgiyi gösterebilirsiniz
            // MessageBox.Show(tekTalUst.CariKod + " -- " + tekTalUst.FATIRS_NO);

            // Faturanın kalemleri okunuyor
            tekTal.OkuKalem();

            for (int i = 0; i < tekTal.KalemAdedi; i++)
            {
                tekTalKalem = tekTal.kalem(i);

                // Örneğin stok kodu ve birim fiyat gösterimi:
                // MessageBox.Show(tekTalKalem.StokKodu + " " + tekTalKalem.STra_BF);
            }
        }
        catch (Exception ex)
        {
            MessageBox.Show("Hata oluştu: " + ex.Message);
        }
        finally
        {
            if (tekTalKalem != null) Marshal.ReleaseComObject(tekTalKalem);
            if (tekTalUst != null) Marshal.ReleaseComObject(tekTalUst);
            if (tekTal != null) Marshal.ReleaseComObject(tekTal);
            if (sirket != null) Marshal.ReleaseComObject(sirket);
            if (kernel != null)
            {
                kernel.FreeNetsisLibrary();
                Marshal.ReleaseComObject(kernel);
            }

            GC.Collect();
            GC.WaitForPendingFinalizers();
        }
    }
}

```