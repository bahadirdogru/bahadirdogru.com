---
layout: post
title: "NetOpenX - Fatura Silme"
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
Kernel kernel = new Kernel();

Sirket sirket = default(Sirket);

Fatura fatura = default(Fatura);

try

{

    sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                       "vt adı",

                                      "vt kull adı",

                                      "vt kull sifre",

                                      "netsis kull adı",

                                      "netsis kull sifre",

                                  sube kodu);

    fatura = kernel.yeniFatura(sirket, TFaturaTip.ftSFat);

    fatura.OkuUst("A00000000000011", "C0001");

    fatura.OkuKalem();

    fatura.kayitSil();

}

finally

{

    Marshal.ReleaseComObject(fatura);

    Marshal.ReleaseComObject(sirket);

    kernel.FreeNetsisLibrary();

    Marshal.ReleaseComObject(kernel);

}
```


## ⚠️ Önemli Notlar

> **Dikkat:** COM nesnelerini kullandıktan sonra mutlaka temizleyin.

> **Bilgi:** Hata yakalama için try-catch-finally bloklarını kullanın.
