---
layout: single
title: "NetOpenX - Satır Bazlı Koşul Kodu ile Fatura Kaydı"
language: tr
categories: [netopenx]
excerpt: "NetOpenX entegrasyonu ile C# kullanarak yapılan işlemlerin detaylı açıklaması ve örnek kodları."
image: "/assets/images/netsis.png"
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

public class KosulluFaturaKaydi
{
    public void KosulluFatura()
    {
        Kernel kernel = null;
        Sirket sirket = null;
        Fatura fatura = null;
        FatUst faturaUst = null;
        FatKalem faturaKalem = null;

        try
        {
            kernel = new Kernel();

            sirket = kernel.yeniSirket(
                NETSISVT.vtMSSQL,
                "vt_adı",           // Veritabanı adı
                "vt_kullanici",     // VT kullanıcı
                "vt_sifre",         // VT şifre
                "netsis_kullanici", // Netsis kullanıcı
                "netsis_sifre",     // Netsis şifre
                0                   // Şube kodu
            );

            fatura = kernel.yeniFatura(sirket, FaturaTipi.ftSFat);

            // Koşullu hesaplamalar aktif ediliyor
            fatura.KosulluHesapla = true;
            fatura.StokKartinaGoreHesapla = false;
            fatura.FiyatSistemineGoreHesapla = false;

            faturaUst = fatura.Ust;
            faturaUst.FATIRS_NO = fatura.YeniNumara("S");
            faturaUst.TIPI = FaturaTip.ft_Acik;
            faturaUst.CariKod = "C0001";
            faturaUst.KOSULKODU = "GENISK1";
            faturaUst.Tarih = DateTime.Now;
            faturaUst.KOSULTARIHI = DateTime.Now;
            faturaUst.KDV_DAHILMI = false;

            // 1. kalem
            faturaKalem = fatura.kalemYeni("s1");
            faturaKalem.STra_GCMIK = 1;
            faturaKalem.STra_BF = 100;
            faturaKalem.STra_KOSULK = "KOS1";

            // 2. kalem
            faturaKalem = fatura.kalemYeni("s2");
            faturaKalem.STra_GCMIK = 1;
            faturaKalem.STra_BF = 200;
            faturaKalem.STra_KOSULK = "KOS2";

            // Kayıt işlemi
            fatura.kayitYeni();

            MessageBox.Show("Koşullu fatura başarıyla kaydedildi.\nFatura No: " + faturaUst.FATIRS_NO);
        }
        catch (Exception ex)
        {
            MessageBox.Show("Hata oluştu: " + ex.Message);
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


## ⚠️ Önemli Notlar

> **Dikkat:** COM nesnelerini kullandıktan sonra mutlaka temizleyin.

> **Bilgi:** Hata yakalama için try-catch-finally bloklarını kullanın.

