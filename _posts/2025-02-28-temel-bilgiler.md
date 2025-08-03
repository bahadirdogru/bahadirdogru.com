---
layout: post
title: "TEMEL BİLGİLER"
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


# **NetOpenX - Temelleri**

**NetOpenX** Logo ERP ürünü olan **Netsis’in tüm serileri** için yaygın olarak kullanılan güçlü **entegrasyon aracıdır.**

Çözüm Ortaklarının kart veya fişleri Netsis sistemine kolaylıkla ve **veri bütünlüğünü bozmadan** aktarabilmesi amacıyla oluşturulmuştur.

Excel'den Netsis içerisine muhasebe fişi aktarımı, fatura aktarımı, yazarkasada kesilen faturaların Netsis içerisine aktarımı, üretim sonu kaydı aktarımı ya da farklı bir programdan Logo Yazılımın bir ürüne geçerken eski kayıtların aktarılması gibi entegrasyon ihtiyaçlarının kodlamasında kullanılır.

Logo Yazılım, yılın belirli zamanlarında ürünlerinin yeni setlerini yayımlar. **NetOpenX** bu setler ile uyumlu olarak **COM** teknolojisinde **dll**  formatında ****sunulmaktadır.

NetOpenX, temel olarak netsis veri sisteminde tanımlı olan **kart** ve **fişleri** dışarıdan ve veri bütünlüğünü bozmadan

- **eklemek**
- **değiştirmek**
- **silmek**

için kullanılır.

NetOpenX ile excel,desktop uygulamalar, web tabanlı uygulamalar, servis uygulamaları  yada herhangi bir programdan Netsis ERP ürününe malzeme,cari hesap gibi kartlarile sipariş,fatura gibi fişler entegre edilebilir.

# **Avantajları Nelerdir ?**

Netopenx ,netsis arayüzünde yapılan işlemlerin hemen hemen hepsini veri bütünlüğü bozulmadan datanıza entegre etmeyi sağlar.

Kısaca Kullanım Avantajları;

- Versiyon değişikliklerinden en az seviyede etkilenme
- Hızlı ve kolay kodlama imkanı
- Bakım maliyetlerinin azalması
- Hazırlanan kodların tekrar kullanılabilirliği
- Bir çok programlama dili ile kullanılabilme esnekliği (C#,VB.Net,Delphi,PHP…)
- Geliştirme hakkı sadece gerekli eğitimleri ve sertifikaları tamamlamış çözüm ortaklarımızdadır.
- Sürümlerden bağımsız olarak veri bütünlüğü konusunda sorumluluk bütünüyle Logo Yazılımda olacaktır.

# **Neden Kullanmalıyım ?**

ERP sisteminiz dışında kullandığınız yazılımlar olabilir. Bu programlarda yapılan işlemleri ERP sistemize aktarıp bütün işlmelerinizin takibini ERP üzerinden yapmak istiyebilirsiniz. Bu noktada netsis veri tabanına dışarıdan yapılacak insert,update,delete işlemleri veri bütünlüğünü bozabilir. Logo ürünlerinde kullanılan kart veya fişlerin harici olarak veri tabanına aktarılması ihtiyacının doğduğu durumlarda özellikle bu işlemin kullanıcı müdahalesi dışında yapılması gerekiyorsa kullanılması gereken Uyarlama Aracı NetOpenX’dir.

# **Lisans**

NetOpenX dahil olmak üzere uyarlama araçlarının geliştirme lisansları, Logo Çözüm Ortağı firmalar tarafından ihtiyaca yönelik olarak Logo Yazılım’dan alınabilir.

Kullanılacak istemci uygulamasının sayısı gözönünde tutularak lisans ihtiyacı belirlenmelidir.

Netopenx  kullanabilmek için belirlenen kullanıcı sayısına göre  **NetOpenX Runtime Lisansına** ihtiyaç duyulmaktadır.

# **Kurulum**

NetOpenX, yüklenen her setle birlikte ve bu yüklenen sete uygun versiyonda  TEMELSET klasörü altında NetOpenX50.dll olarak gelmektedir. Ayrıca bir Kurulumu yoktur. Merkezi kimlik yönetiminden lisansınızı indirmiş olmanız, NetOpenX50.dll dosyasını register etmiş olmanız ve geliştirdiğiniz projenize NetOpenX50.dll dosyasını  eklemiş olmanız yeterlidir.

# **Geliştirme Ortamı**

Geliştireceğiniz projenizi COM nesnelerini referans olarak ekleyip kod yazabileceğiniz tüm geliştirme platformlarını kullanma şansınız var.

Örneğin ;

- Visual Studio
- Delphi
- SQL Server …

Burada örneklerimizi Visual Studio üzerinden vereceğiz.

Visual Studio ortamında geliştirme yapabilmek için ilk olarak Visual Studio üzerinden Netopenx50.dll dosyası References sekmesinden COM tabı altından eklenmeli ve Netopenx50.dll dosyası register edilmiş olmalıdır.

![download.png](TEMEL%20BI%CC%87LGI%CC%87LER%2023f4a3f5801f8027a217e1594f333f5e/download.png)

Burada yapılması gereken NetOpenX bir COM dll ‘i olduğundan dolayı **COM** altından NetOpenX50 Kütüphanesi reference olarak projeye eklenmeli.

- ** Com tabı altında NetOpenX Kütüphanesi görünmüyor yada farklı bilgi ile görünüyor ise NetOpenX dll’in yanlış yada hiç register edilmediği anlamına gelmektedir. Bu durum karşısında ilk olarak register işlemi gerçekleştirilmelidir.

# **Register İşlemleri**

NetOpenX register işlemi için ürünün kurulumunun yapıldığı   C:\…\ENTERPRISE9\Servis klasörü altından administrator olarak  RegControl.exe çalıştırıldığında register işlemlerini gerçekleştirmiş olursunuz.

Manuel olarak register işlemi için ise komut satırını admin olarak çalıştırılmalıdır.

**->** (Install için) regsvr32.exe Dll_Dosya_Yolu

**->** (Uninstall için) regsvr32.exe Dll_Dosya_Yolu /u

Kullanım yöntemi ise yukarıdaki şekildedir.

# **NetOpenX ile bağlantı kurulması**

NetOpenX temel olarak yaptığı işlem aktarım aracı görevi adı altında Netsis Nesnelerinin **ERP** uygulamasına aktarılmasını (insert,update,delete) sağlar.

ERP nesnelerine erişim için ilk olarak namespace olarak NetOpenx projeye eklenmelidir.

Akabinde işlem yapabilmeka adına Kernel açılmalı ve kernel  sonrasında şirket açılması gereklidir.

**Bağlantı Nesnesi** 

```csharp
using NetOpenX50; //Netopenx referanslarının kullanılabilmesi için eklenen namespace

 

Kernel kernel = new Kernel();           

Sirket sirket = default(Sirket);

         

             sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                           "vt adi",

                                           "vt kull adi",

                                           "vt kull sifre",

                                           "netsis kull adi",

                                           "netsis sifre",0)

 
```

**Fatura Örneği :**

Örnekte satış faturası örneği gösterilmiştir.

**1)** Ürün(aşağıdaki ekran görüntüsü Netsis 3 ürün grubuna aittir) üzerinden fatura üst bilgileri, kalem ve toplam bilgileri doldurularak fatura  oluşturma örneği gösterilmiştir.

![download.png](TEMEL%20BI%CC%87LGI%CC%87LER%2023f4a3f5801f8027a217e1594f333f5e/download%201.png)

![download.png](TEMEL%20BI%CC%87LGI%CC%87LER%2023f4a3f5801f8027a217e1594f333f5e/download%202.png)

![download.png](TEMEL%20BI%CC%87LGI%CC%87LER%2023f4a3f5801f8027a217e1594f333f5e/download%203.png)

**2)** Kod ile gerçekleştirilebilecek örnek yapısı aşağıda gösterilmiştir.Bu örnek yapıya Ürün tarafında manuel olarak giriş yaptığınız sahaları ekleyebilirsiniz. Örneğin proje uygulamanız açık ise proje kodu sahası yada seri takibi açık ise stok seri bilgilerini örnek kod bloğuna ekleyerek netopenx ile kayıt işlemini gerçekleştirebilirsiniz.

**Satış Faturası Kaydı**

```csharp
using System;

using System.Runtime.InteropServices;

using NetOpenX50;

namespace NetOpenXTest

{

    public static class FaturaOrnek

    {

        public static void SatisFaturasiKaydet()

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

                                              0);

                fatura = kernel.yeniFatura(sirket, TFaturaTip.ftSFat);

                fatUst = fatura.Ust();

                fatUst.FATIRS_NO = fatura.YeniNumara("A");

                fatUst.CariKod = "00002";

                fatUst.Tarih = DateTime.Now;

                fatUst.ENTEGRE_TRH = DateTime.Now;

                fatUst.FiiliTarih = DateTime.Now;

                fatUst.TIPI = TFaturaTipi.ft_Acik;

                fatUst.Proje_Kodu = "1";

                fatUst.KDV_DAHILMI = true;

 

                fatKalem = fatura.kalemYeni("001");

                fatKalem.DEPO_KODU = 2;

                fatKalem.STra_GCMIK = 5;

                fatKalem.STra_NF = 12;

                fatKalem.STra_BF = 12;

                  

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

    }

}
```


## ⚠️ Önemli Notlar

> **Dikkat:** COM nesnelerini kullandıktan sonra mutlaka temizleyin.

> **Bilgi:** Hata yakalama için try-catch-finally bloklarını kullanın.
