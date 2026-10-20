---
layout: single
title: "NetOpenX - Şirket Listesi Getirme"
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
    public static class KernelOrnek
    {
        public static void GetSirketListesi()
        {
            Kernel kernel = new Kernel();
            SirketList sirketList = default(SirketList);
            
            try
            {
                sirketList = kernel.SirketListesi;
                
                for (int i = 0; i < sirketList.SirketSayisi; i++)
                {
                    SirketInfo sirket = sirketList.get_SirketInfo(i);
                    Console.WriteLine("Sirket Adi : {0}, Sirket Yili : {1}", sirket.SirketAdi, sirket.SirketYili);
                }
            }
            finally
            {
                Marshal.ReleaseComObject(sirketList);
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

