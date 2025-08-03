# C# / Hızlı Tahsilat Kaydı

Created: July 29, 2025 3:29 PM

```csharp
using System;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using NetOpenX50;

public class HizliTahsilatKaydi
{
    public void TahsilatKaydet()
    {
        Kernel kernel = null;
        Sirket sirket = null;
        Fatura fatura = null;
        FatUst fatUst = null;
        FatKalem fatKalem = null;
        HizliTahsilat tahsil = null;

        try
        {
            kernel = new Kernel();

            sirket = kernel.yeniSirket(
                NETSISVT.vtMSSQL,
                "BRC12",     // Veritabanı adı
                "sa",        // VT kullanıcı adı
                "sapass",    // VT şifre
                "NETSIS",    // Netsis kullanıcı
                "1",         // Netsis şifre
                0            // Şube kodu
            );

            fatura = kernel.yeniFatura(sirket, FaturaTipi.ftSFat);
            fatura.TahsilatKayitKullan = true;

            fatUst = fatura.Ust;
            fatUst.CariKod = "001";
            fatUst.TIPI = FaturaTip.ft_Kapali;
            fatUst.Tarih = DateTime.Now;
            fatUst.FATIRS_NO = fatura.YeniNumara("A");
            fatUst.PLA_KODU = "0";
            fatUst.KS_KODU = "01";

            fatKalem = fatura.kalemYeni("001"); // Stok Kodu
            fatKalem.STra_GCMIK = 1;
            fatKalem.STra_DOVTIP = 1;
            fatKalem.STra_DOVFIAT = 1.5;
            fatKalem.STra_BF = 1.77;
            fatKalem.DEPO_KODU = 1;

            fatura.HesaplamalariYap();

            // Tahsilat girişi
            tahsil = fatura.tahsilatYeni;
            tahsil.SozKodu = "NAKİT";
            tahsil.Tutar = fatUst.GENELTOPLAM;
            tahsil.PLA_KODU = "0";
            tahsil.Referans_Kodu = "1";
            tahsil.DovTutar = 1.5;
            tahsil.Proje_Kodu = "0";
            tahsil.Kur = tahsil.Tutar / tahsil.DovTutar;

            fatura.kayitYeni();

            MessageBox.Show("Fatura ve tahsilat başarıyla kaydedildi. Fatura No: " + fatUst.FATIRS_NO);
        }
        catch (Exception ex)
        {
            MessageBox.Show("Hata oluştu: " + ex.Message);
        }
        finally
        {
            if (tahsil != null) Marshal.ReleaseComObject(tahsil);
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