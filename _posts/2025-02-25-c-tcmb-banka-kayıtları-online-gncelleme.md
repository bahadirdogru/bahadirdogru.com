---
layout: post
title: "NetOpenX - TCMB Banka Kayıtları Online Güncelleme"
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

            try

            {

                  sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

               "vt adi",

               "vt kull adi",

               "vt kull sifre",

               "netsis kull adi",

                "netsis sifre",

                0);

                sirket.TCMBBankaKodlariOnlineGuncelleme("0001", "");

 

            }

            catch (Exception exp)

            {

                MessageBox.Show("Hata: " + exp.Message);

            }

            finally

            {

                Marshal.ReleaseComObject(sirket);

                kernel.FreeNetsisLibrary();

                Marshal.ReleaseComObject(kernel);

            } 
```


## ⚠️ Önemli Notlar

> **Dikkat:** COM nesnelerini kullandıktan sonra mutlaka temizleyin.

> **Bilgi:** Hata yakalama için try-catch-finally bloklarını kullanın.

