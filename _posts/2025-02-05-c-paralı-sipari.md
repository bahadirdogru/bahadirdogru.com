---
layout: post
title: "NetOpenX - Parçalı Sipariş"
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

 

    fatura = kernel.yeniFatura(sirket, TFaturaTip.ftSFat);

    fatUst = fatura.Ust();

    fatUst.FATIRS_NO = "R00000000002108";

    fatUst.TIPI = TFaturaTipi.ft_Acik;

    fatUst.CariKod = "120-01-014";

    fatUst.Tarih = DateTime.Now;

    fatUst.SIPARIS_TEST = DateTime.Now;

    fatUst.Proje_Kodu = "b";

 

    fatKalem = fatura.kalemYeni("SB1");

    fatKalem.STra_GCMIK = 1;

    fatKalem.DEPO_KODU = 1;

    fatKalem.STra_BF = 21;

 

    fatKalem.STra_SIPNUM = "R00000000000356";

    fatKalem.STra_SIPKONT = 1;

    fatKalem.STra_SIP_TURU = "S";

 

    fatura.kayitYeni();

 

    MessageBox.Show(fatUst.FATIRS_NO);

}

catch (Exception ex)

{

    MessageBox.Show(ex.Message);

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
```


## ⚠️ Önemli Notlar

> **Dikkat:** COM nesnelerini kullandıktan sonra mutlaka temizleyin.

> **Bilgi:** Hata yakalama için try-catch-finally bloklarını kullanın.

