---
layout: post
title: "NetOpenX - Karma Koli Stoğu ile Depolar Arası Transfer"
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

```csharp
using System;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using NetOpenX50;

public class DepolarArasiTransfer
{
    public void KarmaKoliTransfer()
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
                "vt adı",          // Veritabanı adı
                "vt kull adı",     // VT kullanıcı adı
                "vt kull sifre",   // VT şifre
                "netsis kull adı", // Netsis kullanıcı
                "netsis kull sifre", // Netsis şifre
                sube: 0            // Netsis şube no (gerekirse ayarla)
            );

            fatura = kernel.yeniFatura(sirket, FaturaTipi.ftLokalDepo);
            fatUst = fatura.Ust;

            fatUst.FATIRS_NO = "D00000000000006";
            fatUst.AMBHARTUR = HareketTuru.htKonsinye; // Konsinye transfer
            fatUst.Proje_Kodu = "P1";
            fatUst.GCKOD_CIKIS = 0;
            fatUst.GCKOD_GIRIS = 100;  // Transfer yapılacak şube no
            fatUst.Tarih = DateTime.Now;
            fatUst.KDV_DAHILMI = true;
            fatUst.YEDEK = "D";

            fatKalem = fatura.kalemYeni("kk1"); // Karma koli stok kodu

            fatKalem.DEPO_KODU = 1;        // Çıkış deposu
            fatKalem.Gir_Depo_Kodu = 3;    // Giriş yapılacak depo
            fatKalem.STra_GCMIK2 = 20;     // Karma koli miktarı
            fatKalem.STra_GCMIK = 0;       // Normal giriş/çıkış miktarı
            fatKalem.STra_BF = 100;

            fatKalem.KarmaKoliIsle();

            fatura.kayitYeni();

            MessageBox.Show("Karma koli transferi başarıyla yapıldı. Fatura No: " + fatUst.FATIRS_NO);
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
