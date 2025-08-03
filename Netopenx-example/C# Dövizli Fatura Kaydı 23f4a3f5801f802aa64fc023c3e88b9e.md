# C# / Dövizli Fatura Kaydı

Created: July 29, 2025 3:26 PM

```csharp
using System;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using NetOpenX50;

public class DovizliFaturaKaydi
{
    public void FaturaCevrim()
    {
        Kernel kernel = null;
        Sirket sirket = null;
        Fatura fatura = null;
        FatUst faturaUst = null;
        FatKalem faturaKalem = null;

        try
        {
            kernel = new Kernel();

            // Şirket bağlantısı
            sirket = kernel.yeniSirket(
                NETSISVT.vtMSSQL,     // Veritabanı tipi
                "vt_adı",             // VT adı
                "vt_kullanıcı",       // VT kullanıcı adı
                "vt_şifre",           // VT şifre
                "netsis_kullanıcı",   // Netsis kullanıcı adı
                "netsis_şifre",       // Netsis şifre
                0                     // Şube kodu
            );

            // Satış faturası nesnesi oluşturuluyor
            fatura = kernel.yeniFatura(sirket, FaturaTipi.ftSFat);
            faturaUst = fatura.Ust;

            // Fatura üst bilgileri
            faturaUst.FATIRS_NO = fatura.YeniNumara("S");
            faturaUst.TIPI = FaturaTip.ft_YurtIci;
            faturaUst.CariKod = "C0001";
            faturaUst.Tarih = DateTime.Now;
            faturaUst.KDV_DAHILMI = false;

            // Kalem ekleniyor
            faturaKalem = fatura.kalemYeni("doviz");
            faturaKalem.STra_GCMIK = 1;
            faturaKalem.STra_DOVTIP = 1;          // Döviz Tipi (1 = USD varsayılabilir)
            faturaKalem.STra_DOVFIAT = 150;       // Döviz fiyatı

            // Birim fiyat (döviz fiyatı * kur) - örnek kur: 2
            faturaKalem.STra_BF = faturaKalem.STra_DOVFIAT * 2;

            // Fatura kayıt ediliyor
            fatura.kayitYeni();

            MessageBox.Show("Dövizli fatura kaydı başarıyla oluşturuldu.\nFatura No: " + faturaUst.FATIRS_NO);
        }
        catch (Exception ex)
        {
            MessageBox.Show("Hata: " + ex.Message);
        }
        finally
        {
            // COM nesneleri serbest bırakılıyor
            if (faturaKalem != null) Marshal.ReleaseComObject(faturaKalem);
            if (faturaUst != null) Marshal.ReleaseComObject(faturaUst);
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