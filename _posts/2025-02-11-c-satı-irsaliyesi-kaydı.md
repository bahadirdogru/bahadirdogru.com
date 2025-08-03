---
layout: post
title: "NetOpenX - Satış İrsaliyesi Kaydı"
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

using NetOpenX50;

namespace NetOpenXTest

{

    public static class FaturaOrnek

    {

       public static void SatisIrsaliyesiKaydet()

        {

            Kernel kernel = new Kernel();

            Sirket sirket = default(Sirket);

            Fatura fatura = default(Fatura);

            FatUst fatUst = default(FatUst);

            FatKalem fatKalem = default(FatKalem);

            try

            {

                sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                              "vt adi",

                                              "vt kull adi",

                                              "vt kull sifre",

                                              "netsis kull adi",

                                              "netsis sifre",

                                              0);

                fatura = kernel.yeniFatura(sirket, TFaturaTip.ftSIrs);

                fatUst = fatura.Ust();

                fatUst.FATIRS_NO = fatura.YeniNumara("A");

                fatUst.CariKod = "00002";

                fatUst.Tarih = DateTime.Now;

                fatUst.ENTEGRE_TRH = DateTime.Now;

                fatUst.FiiliTarih = DateTime.Now;

                fatUst.SIPARIS_TEST = DateTime.Now;

                fatUst.TIPI = TFaturaTipi.ft_YurtIci;

                fatUst.PLA_KODU = "02";

                fatUst.Proje_Kodu = "033";

                fatUst.KDV_DAHILMI = true;

                fatKalem = fatura.kalemYeni("00003");

                fatKalem.DEPO_KODU = 2;

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


## ⚠️ Önemli Notlar

> **Dikkat:** COM nesnelerini kullandıktan sonra mutlaka temizleyin.

> **Bilgi:** Hata yakalama için try-catch-finally bloklarını kullanın.
