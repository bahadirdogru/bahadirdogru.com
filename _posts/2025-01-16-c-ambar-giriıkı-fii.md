---
layout: post
title: "NetOpenX - Ambar Giriş-Çıkış Fişi"
language: tr
author: bahadir
categories: [netopenx]
excerpt: "NetOpenX entegrasyonu ile C# kullanarak yapılan işlemlerin detaylı açıklaması ve örnek kodları."
image: "assets/images/logo.png"
tags: [NetOpenX, C#, ERP, Entegrasyon]
toc: true
---

## 📋 Genel Bakış

Bu makale NetOpenX entegrasyonu kullanarak ilgili işlemlerin nasıl gerçekleştirileceğini açıklamaktadır.

## 💻 Kod Örneği

Ambar Giriş:

```csharp
using System;

using System.Runtime.InteropServices;

using NetOpenX50;

  

namespace NetOpenXTest

{

    public static class FaturaOrnek

    {

        public static void SatisFaturasiKaydet()

        {

            Kernel kernel = new Kernel();

            Sirket sirket = default(Sirket);

            Fatura fatura = default(Fatura);

            FatUst fatUst = default(FatUst);

            FatKalem fatKalem = default(FatKalem);

            try

            {

                sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                       "vt adı",

                                      "vt kull adı",

                                      "vt kull sifre",

                                      "netsis kull adı",

                                      "netsis kull sifre",

                                                  "şube kodu");

 

                fatura = kernel.yeniFatura(sirket, TFaturaTip.ftAmbarG);

                

                fatUst = fatura.Ust();

                fatUst.FATIRS_NO = fatura.YeniNumara("A");

                fatUst.CariKod = "00002";

                fatUst.AMBHARTUR = TAmbarHarTur.htMuhtelif;

                fatUst.CikisYeri = TCikisYeri.cyStokKod;

                fatUst.Tarih = DateTime.Now;

                fatUst.ENTEGRE_TRH = DateTime.Now;

                fatUst.FiiliTarih = DateTime.Now;

                fatUst.Proje_Kodu = "033";

                

                fatKalem = fatura.kalemYeni("00003");

                fatKalem.Gir_Depo_Kodu = 1;

                fatKalem.STra_GCMIK = 5;

                fatKalem.STra_NF = 12;

                fatKalem.STra_BF = 12;

                 

  

                fatura.kayitYeni();

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

Ambar Çıkış:

```csharp
using System;
using System.Windows.Forms;
using NetOpenX50; // COM referansı eklenmeli

public class AmbarCikisFisi
{
    public void AmbarCikisiFisiKaydet()
    {
        kernel kernel = null;
        Sirket sirket = null;
        Fatura fatura = null;
        FatUst fatUst = null;
        FatKalem fatKalem = null;

        try
        {
            kernel = new kernel();

            // Şirket bağlantısı
            sirket = kernel.yeniSirket(
                NETSISVT.vtMSSQL,
                "vt adi",           // veritabanı adı
                "vt kull adi",      // veritabanı kullanıcı adı
                "vt kull sifre",    // veritabanı şifresi
                "netsis kull adi",  // Netsis kullanıcı adı
                "netsis sifre",     // Netsis şifresi
                sube_kodu           // şube kodu (int ya da string olabilir)
            );

            // Fatura nesnesi
            fatura = kernel.yeniFatura(sirket, FaturaTipi.ftAmbarC);
            fatUst = fatura.Ust;

            fatUst.FATIRS_NO = fatura.YeniNumara("A");
            fatUst.AMBHARTUR = AMBHARTUR.htUretim;
            fatUst.CikisYeri = CikisYeriTipi.cyMasrafMer;
            fatUst.CariKod = "99999999"; // Masraf kodu
            fatUst.Tarih = DateTime.Now;
            fatUst.FiiliTarih = DateTime.Now;
            fatUst.ODEMETARIHI = DateTime.Now;

            // Kalem ekle
            fatKalem = fatura.kalemYeni("00003");
            fatKalem.MuhasebeKodu = "620-01-003"; // Muhasebe kodu girilmeli
            fatKalem.STra_GCMIK = 1;
            fatKalem.DEPO_KODU = 1;

            // Kaydet
            fatura.kayitYeni();
        }
        catch (Exception ex)
        {
            MessageBox.Show("Hata: " + ex.Message);
        }
        finally
        {
            // Bellek temizliği
            if (fatKalem != null) Marshal.ReleaseComObject(fatKalem);
            if (fatUst != null) Marshal.ReleaseComObject(fatUst);
            if (fatura != null) Marshal.ReleaseComObject(fatura);
            if (sirket != null) Marshal.ReleaseComObject(sirket);
            if (kernel != null)
            {
                kernel.FreeNetsisLibrary();
                Marshal.ReleaseComObject(kernel);
            }

            fatKalem = null;
            fatUst = null;
            fatura = null;
            sirket = null;
            kernel = null;

            GC.Collect();
            GC.WaitForPendingFinalizers();
        }
    }
}
```


## ⚠️ Önemli Notlar

> **Dikkat:** COM nesnelerini kullandıktan sonra mutlaka temizleyin.

> **Bilgi:** Hata yakalama için try-catch-finally bloklarını kullanın.
