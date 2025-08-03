---
layout: post
title: "NetOpenX - Genel İskonto Kullanımı"
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

public class GenelIskontoOrnegi
{
    public void FaturaGenelIskonto()
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
                "vt_adi",             // Veritabanı adı
                "vt_kullanici",       // VT kullanıcı adı
                "vt_sifre",           // VT şifresi
                "netsis_kullanici",   // Netsis kullanıcı
                "netsis_sifre",       // Netsis şifre
                0                     // Şube kodu
            );

            // ftSSip: Müşteri Siparişi
            fatura = kernel.yeniFatura(sirket, FaturaTipi.ftSSip);

            faturaUst = fatura.Ust;
            faturaUst.FATIRS_NO = fatura.YeniNumara("A");
            faturaUst.TIPI = FaturaTip.ft_YurtIci;
            faturaUst.CariKod = "00001";
            faturaUst.Proje_kodu = "033";

            // Genel iskonto %50
            faturaUst.GEN_ISK1O = 50;

            faturaKalem = fatura.kalemYeni("11"); // Stok kodu "11"
            faturaKalem.DEPO_KODU = 1;
            faturaKalem.STra_GCMIK = 10;
            faturaKalem.STra_BF = 150;
            faturaKalem.ProjeKodu = "033";

            // Fatura kaydediliyor
            fatura.kayitYeni();

            MessageBox.Show("Fatura başarıyla kaydedildi. Fatura No: " + faturaUst.FATIRS_NO);
        }
        catch (Exception ex)
        {
            MessageBox.Show("Hata oluştu: " + ex.Message);
        }
        finally
        {
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

