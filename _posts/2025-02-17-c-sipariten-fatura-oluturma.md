---
layout: post
title: "NetOpenX - Siparişten Fatura Oluşturma"
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
using NetOpenX; // COM referansı gerekli

public class SiparisFaturaIslemi
{
    public void SiparisToIrsFat()
    {
        Kernel kernel = null;
        Sirket sirket = null;
        Fatura siparis = null;
        Fatura yeniFatura = null;

        try
        {
            kernel = new Kernel();

            // Şirket nesnesi oluşturuluyor
            sirket = kernel.yeniSirket(
                NETSISVT.vtOracle,         // Veritabanı tipi
                "ENTERPRISE8",             // VT adı
                "TEMELSET",                // VT kullanıcı adı
                "",                        // VT şifre
                "NETSIS",                  // Netsis kullanıcı adı
                "",                        // Netsis şifre
                32767                      // Şube kodu
            );

            // Sipariş ve Fatura nesneleri oluşturuluyor
            siparis = kernel.yeniFatura(sirket, FaturaTipi.ftSSip);
            yeniFatura = kernel.yeniFatura(sirket, FaturaTipi.ftSFat);

            // Sipariş üst bilgisi okunuyor
            siparis.OkuUst("00000000000SIP1", "cari1");
            siparis.OkuKalem();

            // Yeni fatura üst bilgisi atanıyor
            yeniFatura.Ust.FATIRS_NO = "00000000000FAT1";
            yeniFatura.Ust.Tarih = Convert.ToDateTime("01/01/2016");

            // Sipariş -> Fatura dönüştürme
            try
            {
                siparis.Siparis2IrsFat(yeniFatura);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Siparişten faturaya dönüştürme hatası: " + ex.Message);
            }
        }
        catch (Exception ex)
        {
            MessageBox.Show("Genel hata: " + ex.Message);
        }
        finally
        {
            // COM nesnelerini serbest bırak
            if (yeniFatura != null) Marshal.ReleaseComObject(yeniFatura);
            if (siparis != null) Marshal.ReleaseComObject(siparis);
            if (sirket != null) Marshal.ReleaseComObject(sirket);
            if (kernel != null)
            {
                kernel.FreeNetsisLibrary();
                Marshal.ReleaseComObject(kernel);
            }

            yeniFatura = null;
            siparis = null;
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
