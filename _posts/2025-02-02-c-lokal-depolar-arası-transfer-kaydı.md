---
layout: single
title: "NetOpenX - Lokal Depolar Arası Transfer Kaydı"
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
public void LokalDepolarArasiTransferBelgesi()

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

        fatura = kernel.yeniFatura(sirket, TFaturaTip.ftLokalDepo);

        

        fatUst = fatura.Ust();

        fatUst.FATIRS_NO = fatura.YeniNumara("A");

        fatUst.TIPI = TFaturaTipi.ft_Bos;

        fatUst.AMBHARTUR = TAmbarHarTur.htDepolar;

        fatUst.Tarih = DateTime.Now;

        fatUst.FiiliTarih = DateTime.Now;

        fatUst.PLA_KODU = "S001";

        fatUst.Proje_Kodu = "P001";

        fatUst.KDV_DAHILMI = true;

        

        fatKalem = fatura.kalemYeni("S0001");

        ///Giriş Depo Kodu

        fatKalem.Gir_Depo_Kodu = 3;

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

