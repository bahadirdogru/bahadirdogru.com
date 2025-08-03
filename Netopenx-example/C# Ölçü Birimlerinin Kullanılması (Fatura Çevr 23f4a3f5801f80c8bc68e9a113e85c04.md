# C# / Ölçü Birimlerinin Kullanılması (Fatura Çevrim)

Created: July 29, 2025 3:56 PM

```csharp
using System;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using NetOpenX50;

public class OlcuBirimiKullanimi
{
    public void FaturaCevrim()
    {
        Kernel kernel = null;
        Sirket sirket = null;
        Fatura fatura = null;
        FatUst fatUst = null;
        FatKalem fatKalem = null;

        try
        {
            kernel = new Kernel();

            sirket = kernel.yeniSirket(
                NETSISVT.vtMSSQL,    // veya vttipi değişkenine göre
                "vt adı",
                "vt kull adı",
                "vt kull sifre",
                "netsis kull adı",
                "netsis kull sifre",
                0 // şube kodu
            );

            fatura = kernel.yeniFatura(sirket, FaturaTipi.ftSFat);
            fatUst = fatura.Ust;

            fatUst.FATIRS_NO = fatura.YeniNumara("A");
            fatUst.TIPI = FaturaTip.ft_Acik;
            fatUst.CariKod = "00034";
            fatUst.Proje_Kodu = "033";
            fatUst.PLA_KODU = "01";

            // Ölçü birim çevrimi manuel yapılacaksa:
            fatura.OtomatikCevrimYapilsin = false;

            fatKalem = fatura.kalemYeni("serisiz");
            fatKalem.Olcubr = 2;           // Ölçü birim 2 (Koli)
            fatKalem.STra_GCMIK = 20;      // 5 koli * 4 adet (manuel çevrim sonucu adet miktarı)
            fatKalem.STra_BF = 1;

            // Ölçü birim çevrimi otomatik yapılsın istenirse:
            fatura.OtomatikCevrimYapilsin = true;

            fatKalem = fatura.kalemYeni("serisiz");
            fatKalem.Olcubr = 2;          // Ölçü birim 2 (Koli)
            fatKalem.STra_GCMIK = 5;      // 5 koli miktarı (otomatik çevrim ile adet miktarı hesaplanacak)
            fatKalem.STra_BF = 1;

            fatura.kayitYeni();

            MessageBox.Show("Fatura başarıyla kaydedildi. Fatura No: " + fatUst.FATIRS_NO);
        }
        catch (Exception ex)
        {
            MessageBox.Show("Hata oluştu: " + ex.Message);
        }
        finally
        {
            if (fatKalem != null) Marshal.ReleaseComObject(fatKalem);
            if (fatUst != null) Marshal.ReleaseComObject(fatUst);
            if (fatura != null) Marshal.ReleaseComObject(fatura);
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