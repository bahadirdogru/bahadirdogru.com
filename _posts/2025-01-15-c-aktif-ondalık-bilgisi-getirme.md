---
layout: post
title: "NetOpenX - Aktif Ondalık Bilgisi Getirme"
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
using NetOpenX;

public class NDSOkuma
{
    public void NDSOku()
    {
        Kernel kernel = null;
        Sirket sirket = null;
        Fatura fatura = null;

        try
        {
            kernel = new Kernel();

            sirket = kernel.yeniSirket(
                NETSISVT.vtMSSQL,
                "ENTERPRISE8",
                "TEMELSET",
                "",
                "NETSIS",
                "",
                32767
            );

            // Örnek: Netsis Kernel üzerinde nds değerlerini çağırmak için
            // Not: Yorum satırındakiler örnek, isterseniz aktif edin
            // MessageBox.Show("ndsMiktar: " + sirket.getirNDS(1, 1, 1, "ndsMiktar"));
            // MessageBox.Show("ndsDovtutar: " + sirket.getirNDS(1, 1, 1, "ndsDovtutar"));
            // MessageBox.Show("ndsFirmaDovTut: " + sirket.getirNDS(1, 1, 1, "ndsFirmaDovTut"));
            // MessageBox.Show("ndsOran: " + sirket.getirNDS(1, 1, 1, "ndsOran"));

            fatura = kernel.yeniFatura(sirket, FaturaTipi.ftSFat);

            MessageBox.Show("ndsMiktar: " + fatura.getirAktifNDS("ndsMiktar"));
            MessageBox.Show("ndsTutar: " + fatura.getirAktifNDS("ndsTutar"));
            // MessageBox.Show("ndsDovtutar: " + fatura.getirAktifNDS("ndsDovtutar"));
            // MessageBox.Show("ndsFirmaDovTut: " + fatura.getirAktifNDS("ndsFirmaDovTut"));
            // MessageBox.Show("ndsOran: " + fatura.getirAktifNDS("ndsOran"));

            double deger = 900000.638;
            int ondalikHane = Convert.ToInt32(fatura.getirAktifNDS("ndsTutar"));

            MessageBox.Show("Yuvarlanmış sayı: " + kernel.sayiYuvarla(deger, ondalikHane));
        }
        catch (Exception ex)
        {
            MessageBox.Show("Hata oluştu: " + ex.Message);
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


## ⚠️ Önemli Notlar

> **Dikkat:** COM nesnelerini kullandıktan sonra mutlaka temizleyin.

> **Bilgi:** Hata yakalama için try-catch-finally bloklarını kullanın.
