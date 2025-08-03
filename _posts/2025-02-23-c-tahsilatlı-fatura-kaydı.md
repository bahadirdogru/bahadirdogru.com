---
layout: post
title: "NetOpenX - Tahsilatlı Fatura Kaydı"
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

FatUst fatUst = default(FatUst);

FatKalem fatKalem = default(FatKalem);

HizliTahsilatAna hizliTahsilatAna = default(HizliTahsilatAna);

HizliTahsilat tahsil = default(HizliTahsilat);

 

try

{

     sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                      "vt adı",

                                      "vt kull adı",

                                      "vt kull sifre",

                                      "netsis kull adı",

                                      "netsis kull sifre",

                                      "sube kodu");

 

    fatura = kernel.yeniFatura(sirket, TFaturaTip.ftSFat);

    fatura.TahsilatKayitKullan = true;

    fatura.FiyatSistemineGoreHesapla = false;

    fatura.StokKartinaGoreHesapla = false;

 

    fatUst = fatura.Ust();

    fatUst.FATIRS_NO = fatura.YeniNumara("R");

    fatUst.CariKod = "00002";

    fatUst.Tarih = DateTime.Now;

    fatUst.SIPARIS_TEST = DateTime.Now;

    fatUst.TIPI = TFaturaTipi.ft_Kapali;

    fatUst.KDV_DAHILMI = true;

 

    fatKalem = fatura.kalemYeni("STK02");

    fatKalem.DEPO_KODU = 1;

    fatKalem.STra_GCMIK = 1;

    fatKalem.STra_NF = 120;

    fatKalem.STra_BF = 120;

    fatKalem.STra_KDV = 20;

    fatKalem.STra_testar = new DateTime(2024, 9, 27);

 

    fatura.HesaplamalariYap();

    tahsil = fatura.tahsilatYeni();

    tahsil.TahsilatTipi = TTahsilatTipi.ttNakit;

    tahsil.SozKodu = "NAKİT";

    tahsil.Tutar = 60;

    //tahsil.Referans_Kodu = "1";

    tahsil.Proje_Kodu = "1";

 

    tahsil = fatura.tahsilatYeni();

    tahsil.TahsilatTipi = TTahsilatTipi.ttKrediKarti;

    tahsil.SozKodu = "K1";

    tahsil.Tutar = 60;

    tahsil.PLA_KODU = "1";

    //tahsil.Referans_Kodu = "1";

    tahsil.TaksitSay = 1;

    tahsil.Proje_Kodu = "1";

 

    fatura.kayitYeni();

    MessageBox.Show("KAYIT OLUŞTURULDU " + fatUst.FATIRS_NO);

}

catch (Exception ex)

{

    MessageBox.Show(ex.Message);

}

finally

{

    Marshal.ReleaseComObject(hizliTahsilatAna);

    Marshal.ReleaseComObject(tahsil);

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
