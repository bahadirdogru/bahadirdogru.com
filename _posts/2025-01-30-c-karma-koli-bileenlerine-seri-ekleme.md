---
layout: post
title: "NetOpenX - Karma Koli Bileşenlerine Seri Ekleme"
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

public class KarmaKoliSeriEkleme
{
    public void KarmaKoliKaydet()
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
                "vt kull sifre",
                "netsis kull adı",
                "netsis kull sifre",
                0 // şube kodu
            );

            fatura = kernel.yeniFatura(sirket, FaturaTipi.ftSFat);

            fatUst = fatura.Ust;
            fatUst.FATIRS_NO = fatura.YeniNumara("A");
            fatUst.TIPI = FaturaTip.ft_Acik;
            fatUst.KDV_DAHILMI = true;
            fatUst.CariKod = "00034";
            fatUst.Tarih = DateTime.Now;
            fatUst.ENTEGRE_TRH = DateTime.Now;
            fatUst.Proje_Kodu = "033";
            fatUst.PLA_KODU = "01";

            fatKalem = fatura.kalemYeni("koli1");
            fatKalem.DEPO_KODU = 1;
            fatKalem.STra_BF = 10;
            fatKalem.STra_GCMIK2 = 1;

            fatKalem.KarmaKoliIsle();

            // Karma koli kaleminin sıra numarasını alıyoruz (0 bazlı indeks için -1)
            int karmaKoliSiraNo = fatKalem.Sira - 1;

            // Birinci bileşene seri bilgisi ekleniyor
            fatura.Kalem(karmaKoliSiraNo + 1).SeriEkle("A", "", "", "", fatura.Kalem(karmaKoliSiraNo + 1).STra_GCMIK);

            // İkinci bileşene seri bilgisi ekleniyor
            fatura.Kalem(karmaKoliSiraNo + 2).SeriEkle("B", "", "", "", fatura.Kalem(karmaKoliSiraNo + 2).STra_GCMIK);

            fatura.kayitYeni();

            MessageBox.Show("Karma koli ve seri kayıtları başarıyla yapıldı. Fatura No: " + fatUst.FATIRS_NO);
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

