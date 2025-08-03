---
layout: post
title: "NetOpenX - Şirketler arası Fatura kopyalama"
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

        //Kaynak

        Sirket kaynakSirket = default(Sirket);

        Fatura kaynakFatura = default(Fatura);

        FatUst kaynakFatUst = default(FatUst);

        FatKalem kaynakFatKalem = default(FatKalem);

        KalemSeri kaynakSeri = default(KalemSeri);

 

 

        //Hedef

        Sirket hedefSirket = default(Sirket);

        Fatura hedefFatura = default(Fatura);

        FatUst hedefFatUst = default(FatUst);

        FatKalem hedefFatKalem = default(FatKalem);

 

        try

        {

            

 

            kaynakSirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                           "CIGDEM804",

                                           "sa",

                                           "sapass",

                                           "NETSIS",

                                           "net1",

                                           0);

                            

 

            kaynakFatura = kernel.yeniFatura(kaynakSirket, TFaturaTip.ftSFat);

 

 

            kaynakFatura.OkuUst("T00000000000005", "1");

            kaynakFatUst = kaynakFatura.Ust();

 

            hedefSirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                       "ENTERPRISE8",

                                       "sa",

                                       "sapass",

                                       "NETSIS",

                                       "net1",

                                       0);

 

            hedefFatura = kernel.yeniFatura(hedefSirket, TFaturaTip.ftSFat);

 

            hedefFatUst = hedefFatura.Ust();

            hedefFatUst.CariKod = "1";

            hedefFatUst.FATIRS_NO = kaynakFatUst.FATIRS_NO;

            hedefFatUst.Tarih = kaynakFatUst.Tarih;

            hedefFatUst.BRUTTUTAR = kaynakFatUst.BRUTTUTAR;

            hedefFatUst.GENELTOPLAM = kaynakFatUst.GENELTOPLAM;

            hedefFatUst.Proje_Kodu = kaynakFatUst.Proje_Kodu;

 

            kaynakFatura.OkuKalem();

 

            for (int i = 0; i < kaynakFatura.KalemAdedi; i++)

            {

                

 

                kaynakFatKalem = kaynakFatura.get_Kalem(i);

 

                hedefFatKalem = hedefFatura.kalemYeni(kaynakFatKalem.StokKodu);

                hedefFatKalem.STra_GCMIK = kaynakFatKalem.STra_GCMIK;

                hedefFatKalem.STra_GCMIK2 = kaynakFatKalem.STra_GCMIK2;

                hedefFatKalem.CEVRIM = kaynakFatKalem.CEVRIM;

                hedefFatKalem.STra_TAR = kaynakFatKalem.STra_TAR;

                hedefFatKalem.STra_NF = kaynakFatKalem.STra_NF;

                hedefFatKalem.STra_BF = kaynakFatKalem.STra_BF;

                hedefFatKalem.STra_IAF = kaynakFatKalem.STra_IAF;

                hedefFatKalem.STra_KDV = kaynakFatKalem.STra_KDV;

                hedefFatKalem.DEPO_KODU = kaynakFatKalem.DEPO_KODU;

            }

 

            hedefFatura.kayitYeni();

        }

        catch (Exception ex)

        {

 

            throw ex;

        }

 

        finally

        {

            Marshal.ReleaseComObject(kaynakFatKalem);

            Marshal.ReleaseComObject(hedefFatKalem);

 

            Marshal.ReleaseComObject(kaynakFatUst);

            Marshal.ReleaseComObject(hedefFatUst);

 

            Marshal.ReleaseComObject(kaynakFatura);

            Marshal.ReleaseComObject(hedefFatura);

 

            kaynakSirket.LogOff();

            hedefSirket.LogOff();

 

            Marshal.ReleaseComObject(kaynakSirket);

            Marshal.ReleaseComObject(hedefSirket);

 

            kernel.FreeNetsisLibrary();

            Marshal.ReleaseComObject(kernel);

 

        }

}
```


## ⚠️ Önemli Notlar

> **Dikkat:** COM nesnelerini kullandıktan sonra mutlaka temizleyin.

> **Bilgi:** Hata yakalama için try-catch-finally bloklarını kullanın.
