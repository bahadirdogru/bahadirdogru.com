---
layout: post
title: "NetOpenX - Sipariş Kalemlerinden Kümüle Fatura Oluşturma"
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
using System;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using NetOpenX50;

public class SiparistenKumuleFatura
{
    public void SiparisiFaturalandir(string siparisNo, string cariKod)
    {
        Kernel krnl = null;
        Sirket sirket = null;
        Fatura siparis = null;
        Fatura fatura = null;
        FatUst fatUst = null;
        FatUst sipUst = null;
        FatKalem faturaKalem = null;
        FatKalem siparisKalem = null;
        NetRS query = null;

        try
        {
            krnl = new Kernel();

            // Aktif şirket bağlantısı
            sirket = krnl.yeniSirketAktifEXE(KernelClass.Values["TS_CORE"]);

            // Sipariş nesnesi oluşturuluyor
            siparis = krnl.yeniFatura(sirket, 7); // 7 = ftSSip
            siparis.OkuUst(siparisNo, cariKod);
            siparis.OkuKalem();

            // Fatura nesnesi oluşturuluyor
            fatura = krnl.yeniFatura(sirket, 0); // 0 = ftSFat
            fatUst = fatura.Ust;
            sipUst = siparis.Ust;

            fatUst.FatIrs_No = fatura.YeniNumara("A");
            fatUst.CariKod = sipUst.CariKod;
            fatUst.Tarih = sipUst.Tarih;
            fatUst.Proje_kodu = sipUst.Proje_kodu;
            fatUst.Pla_Kodu = sipUst.Pla_Kodu;
            fatUst.FiiliTarih = sipUst.FiiliTarih;

            // Kalem kopyalama ve kümülatif toplama
            for (int i = 0; i < siparis.KalemAdedi; i++)
            {
                bool kalemBulundu = false;
                siparisKalem = siparis.Kalem(i);

                for (int j = 0; j < fatura.KalemAdedi; j++)
                {
                    faturaKalem = fatura.Kalem(j);
                    if (siparisKalem.StokKodu == faturaKalem.StokKodu)
                    {
                        kalemBulundu = true;
                        faturaKalem.STra_GCMIK += siparisKalem.STra_GCMIK;
                        break;
                    }
                    Marshal.ReleaseComObject(faturaKalem);
                }

                if (!kalemBulundu)
                {
                    faturaKalem = fatura.kalemYeni(siparisKalem.StokKodu);
                    faturaKalem.STra_GCMIK = siparisKalem.STra_GCMIK;
                    faturaKalem.STra_GCMIK2 = siparisKalem.STra_GCMIK2;
                    faturaKalem.STra_TAR = siparisKalem.STra_TAR;
                    faturaKalem.STra_NF = siparisKalem.STra_NF;
                    faturaKalem.STra_BF = siparisKalem.STra_BF;
                    faturaKalem.STra_KDV = siparisKalem.STra_KDV;
                    faturaKalem.STra_GC = siparisKalem.STra_GC;
                    faturaKalem.STra_DOVTIP = siparisKalem.STra_DOVTIP;
                    faturaKalem.STra_DOVFIAT = siparisKalem.STra_DOVFIAT;
                    faturaKalem.DEPO_KODU = siparisKalem.DEPO_KODU;
                }

                Marshal.ReleaseComObject(faturaKalem);
                Marshal.ReleaseComObject(siparisKalem);
            }

            MessageBox.Show("Oluşturulan Fatura Numarası: " + fatura.Ust.FatIrs_No);
            fatura.KayitYeni();

            // Gerekirse sipariş kapatma/kilitleme yapılabilir
            query = krnl.yeniNetRS(sirket);
            // örnek: query.Calistir("UPDATE SIPAMAS SET KAPALI = 'E' WHERE ...");
        }
        catch (Exception ex)
        {
            MessageBox.Show("Hata: " + ex.Message);
        }
        finally
        {
            if (query != null) Marshal.ReleaseComObject(query);
            if (fatUst != null) Marshal.ReleaseComObject(fatUst);
            if (sipUst != null) Marshal.ReleaseComObject(sipUst);
            if (siparisKalem != null) Marshal.ReleaseComObject(siparisKalem);
            if (faturaKalem != null) Marshal.ReleaseComObject(faturaKalem);
            if (siparis != null) Marshal.ReleaseComObject(siparis);
            if (fatura != null) Marshal.ReleaseComObject(fatura);
            if (sirket != null) Marshal.ReleaseComObject(sirket);

            if (krnl != null)
            {
                krnl.FreeNetsisLibrary();
                Marshal.ReleaseComObject(krnl);
            }

            GC.Collect();
            GC.WaitForPendingFinalizers();
        }
    }
}

```


## ⚠️ Önemli Notlar

> **Dikkat:** COM nesnelerini kullandıktan sonra mutlaka temizleyin.

> **Bilgi:** Hata yakalama için try-catch-finally bloklarını kullanın.

