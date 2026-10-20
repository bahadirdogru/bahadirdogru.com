---
layout: single
title: "NetOpenX - Sipariş Revizyon"
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

        public static void SatisFaturasiKaydet()

        {

            Kernel kernel = new Kernel();

           Sirket sirket = default(Sirket);

           Fatura fatura = default(Fatura);

           FatUst fatUst = default(FatUst);

           FatKalem fatKalem = default(FatKalem);

 

           try

           {

               sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                      "vt adı",

                                      "vt kull adı",

                                      "vt kull sifre",

                                      "netsis kull adı",

                                      "netsis kull sifre",

                                                 "şube kodu");

 

               fatura = kernel.yeniFatura(sirket, TFaturaTip.ftSSip);

               fatUst = fatura.Ust();

               fatUst.FATIRS_NO = "AK0000000000072";

               fatUst.CariKod = "M0000000024";

               fatUst.Tarih = DateTime.Today;

               fatUst.TIPI = TFaturaTipi.ft_YurtIci;

               fatKalem = fatura.kalemYeni("stk038");

               fatKalem.Gir_Depo_Kodu = 2;

               fatKalem.DEPO_KODU = 1;

               fatKalem.STra_GCMIK = 1;

               fatKalem.STra_BF = 1;

               fatura.SiparisRevizyon("AK0000000000071", DateTime.Today);

               MessageBox.Show(fatUst.FATIRS_NO);

 

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

