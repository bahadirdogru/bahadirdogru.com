---
layout: single
title: "NetOpenX - Siparişten İrsaliye Oluşturma"
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

using NetOpenX50;

 

namespace NetOpenXTest

{

    public static class FaturaOrnek

    {

        public static void Siparis2IrsFat()

        {

            Kernel kernel = new Kernel();

            Sirket sirket = default(Sirket);

            Fatura fatura = default(Fatura);

            Fatura irsaliye = default(Fatura);

            FatUst irsaliyeUst = default(FatUst);

            try

            {

                sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                              "vt adi",

                                              "vt kull adi",

                                              "vt kull sifre",

                                              "netsis kull adi",

                                              "netsis sifre",

                                              0);

                fatura = kernel.yeniFatura(sirket, TFaturaTip.ftSSip);

                fatura.OkuUst("M00000000000006", "00002");

                fatura.OkuKalem();

 

                irsaliye = kernel.yeniFatura(sirket, TFaturaTip.ftSIrs);

                irsaliyeUst = irsaliye.Ust();               

                 

                irsaliyeUst.FATIRS_NO = irsaliye.YeniNumara("A");

                fatura.Siparis2IrsFat(irsaliye);

            }

            finally

            {

                Marshal.ReleaseComObject(irsaliyeUst);

                Marshal.ReleaseComObject(irsaliye);

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

