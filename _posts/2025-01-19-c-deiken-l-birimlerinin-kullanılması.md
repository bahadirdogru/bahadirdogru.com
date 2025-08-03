---
layout: post
title: "NetOpenX - Değişken Ölçü Birimlerinin Kullanılması"
language: tr
author: bahadir
categories: [netopenx]
excerpt: "NetOpenX entegrasyonu ile C# kullanarak yapılan işlemlerin detaylı açıklaması ve örnek kodları."
image: "assets/images/netsis.png"
tags: [NetOpenX, C#, ERP, Entegrasyon]
toc: true
---

## 📋 Genel Bakış

Bu makale NetOpenX entegrasyonu kullanarak ilgili işlemlerin nasıl gerçekleştirileceğini açıklamaktadır.

## 💻 Kod Örneği

```csharp
using System;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using NetOpenX50;

public class DegiskenOlcuBirimiKullanimi
{
    public void FaturaCevrimDegiskenOlcu()
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
                NETSISVT.vtMSSQL,
                "vt adı",
                "vt kull adı",
                "vt kull şifre",
                "netsis kull adı",
                "netsis kull şifre",
                0 // şube kodu
            );

            fatura = kernel.yeniFatura(sirket, FaturaTipi.ftSFat);
            fatUst = fatura.Ust;

            fatUst.FATIRS_NO = fatura.YeniNumara("A");
            fatUst.TIPI = FaturaTip.ft_Acik;
            fatUst.CariKod = "00031";
            fatUst.Proje_Kodu = "033";
            fatUst.PLA_KODU = "01";

            // Değişken ölçü birimleri parametresi aktif olmalıdır.

            // Manuel çevrim (otomatik çevrim kapalı)
            fatura.OtomatikCevrimYapilsin = false;

            fatKalem = fatura.kalemYeni("serisiz");
            fatKalem.Olcubr = 2;                // Ölçü Birim 2 (Koli)
            fatKalem.STra_GCMIK = 25;           // (5 koli * 5 adet)
            fatKalem.STra_GCMIK2 = 0;
            fatKalem.CEVRIM = 0.2;
            fatKalem.STra_BF = 1;

            // Otomatik çevrim (NetOpenX40 kütüphanesine yaptırılır)
            fatura.OtomatikCevrimYapilsin = true;

            fatKalem = fatura.kalemYeni("serisiz");
            fatKalem.Olcubr = 2;                // Ölçü Birim 2 (Koli)
            fatKalem.STra_GCMIK = 5;            // (5 koli)
            fatKalem.STra_GCMIK2 = 25;          // (5 koli * 5 adet)
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


## ⚠️ Önemli Notlar

> **Dikkat:** COM nesnelerini kullandıktan sonra mutlaka temizleyin.

> **Bilgi:** Hata yakalama için try-catch-finally bloklarını kullanın.

