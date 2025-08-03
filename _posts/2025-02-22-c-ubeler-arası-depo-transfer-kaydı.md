---
layout: post
title: "NetOpenX - Şubeler Arası Depo Transfer Kaydı"
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
public void SubelerArasiDepoTransferBelgesi()

{

    Kernel kernel = new Kernel();

    Sirket sirket = default(Sirket);

    Fatura fatura = default(Fatura);

    FatUst fatUst = default(FatUst);

    FatKalem fatKalem = default(FatKalem);

    try

    {

        sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                              "vt adi",

                                              "vt kull adi",

                                              "vt kull sifre",

                                              "netsis kull adi",

                                              "netsis sifre",

                                      sube kodu);

        fatura = kernel.yeniFatura(sirket, TFaturaTip.ftDepo);

        fatUst = fatura.Ust();       

        fatUst.FATIRS_NO = fatura.YeniNumara("A");

        fatUst.TIPI = TFaturaTipi.ft_Bos;

        fatUst.AMBHARTUR = TAmbarHarTur.htDepolar;

        ///Çıkış Şube

        fatUst.GCKOD_CIKIS = 0;

        ///Giriş Şube

        fatUst.GCKOD_GIRIS = 1;

        ///Ambar

        fatUst.CariKod = "C0001";

        ///Cari Kod

        fatUst.CARI_KOD2 = "C0002";

        fatUst.Tarih = DateTime.Now;

        fatUst.FiiliTarih = DateTime.Now;

        fatUst.PLA_KODU = "S001";

        fatUst.Proje_Kodu = "P001";

        fatUst.KDV_DAHILMI = true;

         

        fatKalem = fatura.kalemYeni("S0001");       

        ///Giriş Depo Kodu

        fatKalem.Gir_Depo_Kodu = 2;         

        fatKalem.DEPO_KODU = 1;

        fatKalem.STra_GCMIK = 20;

        fatKalem.STra_BF = 10;

         

        fatura.kayitYeni();

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
```


## ⚠️ Önemli Notlar

> **Dikkat:** COM nesnelerini kullandıktan sonra mutlaka temizleyin.

> **Bilgi:** Hata yakalama için try-catch-finally bloklarını kullanın.

