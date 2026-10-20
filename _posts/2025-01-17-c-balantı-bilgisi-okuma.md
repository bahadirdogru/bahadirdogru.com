---
layout: single
title: "NetOpenX - Bağlantı Bilgisi Okuma"
permalink: /baglanti-bilgisi-okuma-2025-01-17/
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

using System.Windows.Forms;

using NetOpenX50;

using System.Runtime.InteropServices;

 

namespace NetOpenXTest

{

  public partial class NetTest: Form

  {

    public void Baglanti()

    {

    Kernel kernel = new Kernel();

    Sirket sirket = default(Sirket);

    BaglantiAna bagana = default(BaglantiAna);

    Baglanti bag = default(Baglanti);

    try

    {

      sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

            "vt adi",

            "vt kull adi",

            "vt kull sifre",

            "netsis kull adi",

            "netsis sifre",

            0);

 

      bagana = kernel.yeniBaglantiAna(sirket);

      bagana.Oku("100");//cari kodu

 

      for (int i = 0; i < bagana.BaglantiAdedi ; i++)

      {

         MessageBox.Show(bagana.Baglanti[i].CariKod);

         MessageBox.Show(bagana.Baglanti[i].TIPI + "-" + bagana.Baglanti[i].BaglantiNo);

         MessageBox.Show(bagana.Baglanti[i].Aciklama+ "-" + bagana.Baglanti[i].AlisHesKod);

         MessageBox.Show(bagana.Baglanti[i].BagTutar + "-" + bagana.Baglanti[i].BorcHesKod);

         MessageBox.Show(Convert.ToString(bagana.Baglanti[i].VadeTarihi));

      }

 

    finally

    {

      Marshal.ReleaseComObject(bag);

      Marshal.ReleaseComObject(bagana);

      Marshal.ReleaseComObject(sirket);

      kernel.FreeNetsisLibrary();

      Marshal.ReleaseComObject(kernel);

    }

  }

}
```


## ⚠️ Önemli Notlar

> **Dikkat:** COM nesnelerini kullandıktan sonra mutlaka temizleyin.

> **Bilgi:** Hata yakalama için try-catch-finally bloklarını kullanın.

