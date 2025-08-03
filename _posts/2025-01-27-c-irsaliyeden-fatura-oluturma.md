---
layout: post
title: "NetOpenX - İrsaliyeden Fatura Oluşturma"
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

using NetOpenX50;

namespace NetOpenXTest

{

    public static class FaturaOrnek

    {     

        public static void Irsaliye2Fatura()

        {

            Kernel kernel = new Kernel();

            Sirket sirket = default(Sirket);

            Fatura irsaliye = default(Fatura);

            Fatura fatura = default(Fatura);

            FatUst faturaUst = default(FatUst);

            try

            {

                sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                              "vt adi",

                                              "vt kull adi",

                                              "vt kull sifre",

                                              "netsis kull adi",

                                              "netsis sifre",

                                              0);

                irsaliye = kernel.yeniFatura(sirket, TFaturaTip.ftSIrs);

                irsaliye.OkuUst("I00000000000002", "00002");

                irsaliye.OkuKalem();

                fatura = kernel.yeniFatura(sirket, TFaturaTip.ftSFat);

                faturaUst = fatura.Ust();

                faturaUst.FATIRS_NO = fatura.YeniNumara("A");

                irsaliye.Irsaliye2Fatura(fatura);

            }

            finally

            {

                Marshal.ReleaseComObject(faturaUst);

                Marshal.ReleaseComObject(fatura);

                Marshal.ReleaseComObject(irsaliye);

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

