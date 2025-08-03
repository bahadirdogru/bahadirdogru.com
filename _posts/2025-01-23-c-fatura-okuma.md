---
layout: post
title: "NetOpenX - Fatura Okuma"
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
try
{
    // Initialize company connection
    sirket = kernel.yeniSirket(
        TVTTipi.vtMSSQL,
        "REMDA2016",
        "TEMELSET",
        "",
        "netsis",
        "net1",
        0
    );
    
    // Create invoice object
    kaynakFatura = kernel.yeniFatura(sirket, TFaturaTip.ftSIrs);
    
    // Read invoice header
    kaynakFatura.OkuUst("R00000000001298", "120-01-014");
    kaynakFatUst = kaynakFatura.Ust();
    
    // Read invoice items
    kaynakFatura.OkuKalem();
    MessageBox.Show(Convert.ToString(kaynakFatura.KalemAdedi));
    
    // Loop through all invoice items
    for (int i = 0; i < kaynakFatura.KalemAdedi; i++)
    {
        kaynakFatKalem = kaynakFatura.get_Kalem(i);
        MessageBox.Show(kaynakFatKalem.StokKodu);
    }
}
finally
{
    // Release COM objects
    Marshal.ReleaseComObject(kaynakFatura);
    Marshal.ReleaseComObject(kaynakFatUst);
    Marshal.ReleaseComObject(sirket);
    kernel.FreeNetsisLibrary();
    Marshal.ReleaseComObject(kernel);
}
```


## ⚠️ Önemli Notlar

> **Dikkat:** COM nesnelerini kullandıktan sonra mutlaka temizleyin.

> **Bilgi:** Hata yakalama için try-catch-finally bloklarını kullanın.
