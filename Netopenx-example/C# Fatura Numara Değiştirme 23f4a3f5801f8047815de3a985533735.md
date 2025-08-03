# C# / Fatura Numara Değiştirme

Created: July 29, 2025 3:24 PM

```csharp
using System;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using NetOpenX50;

public class NumaraDegistirmeIslemi
{
    public void NumaraDegistir()
    {
        Kernel kernel = null;
        Sirket sirket = null;
        Fatura fatura = null;

        try
        {
            kernel = new Kernel();

            // Şirkete bağlanılıyor
            sirket = kernel.yeniSirket(
                NETSISVT.vtMSSQL,    // VT tipi
                "TEST",              // VT adı
                "sa",                // VT kullanıcı adı
                "sapass",            // VT şifre
                "NETSIS",            // Netsis kullanıcı adı
                "1",                 // Netsis şifre veya şube
                0                    // Şube kodu
            );

            // Satış faturası nesnesi oluşturuluyor
            fatura = kernel.yeniFatura(sirket, FaturaTipi.ftSFat);

            // Var olan fatura okunuyor
            fatura.OkuUst("Y00000000000005", "M001");  // Eski fatura no ve cari kod
            fatura.OkuKalem();

            // Numara değiştiriliyor
            fatura.NumaraDegistir("ABC000000000021");  // Yeni fatura numarası
        }
        catch (Exception ex)
        {
            MessageBox.Show("Hata: " + ex.Message);
        }
        finally
        {
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