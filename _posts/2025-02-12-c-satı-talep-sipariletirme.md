---
layout: post
title: "NetOpenX - Satış Talep Siparişleştirme"
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

            TalepTeklifIslem siparis = default(TalepTeklifIslem);

            MessageBox.Show(kernel.Version);

            try

            {

                 sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                      "vt adı",

                                      "vt kull adı",

                                      "vt kull sifre",

                                      "netsis kull adı",

                                      "netsis kull sifre",

                                      sube kodu);

 

                siparis = kernel.YeniTalepTeklifIslem(sirket, TFaturaTip.ftSatTalep);

                siparis.BelgeTipi = TFaturaTip.ftSSip;

                siparis.BelgeNo = siparis.YeniNumara("R");

                //siparis.BelgelerKapatilsin = true;

                siparis.ProjeKirilimiYapilsin = true;

                siparis.kalemYeni("000000000000041", "320-01-041", 1);

                siparis.kalemYeni("000000000000041", "320-01-041", 2);

 

                siparis.Siparislestir();

 

                MessageBox.Show(siparis.BelgeNo);

            }

 

 

 

 

 

            finally

            {

 

                Marshal.ReleaseComObject(siparis);

                Marshal.ReleaseComObject(sirket);

                kernel.FreeNetsisLibrary();

                Marshal.ReleaseComObject(kernel);

            }
```


## ⚠️ Önemli Notlar

> **Dikkat:** COM nesnelerini kullandıktan sonra mutlaka temizleyin.

> **Bilgi:** Hata yakalama için try-catch-finally bloklarını kullanın.
