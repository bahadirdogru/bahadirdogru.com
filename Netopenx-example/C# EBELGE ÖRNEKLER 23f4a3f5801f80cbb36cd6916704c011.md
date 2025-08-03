# C# / EBELGE ÖRNEKLER

Created: July 29, 2025 4:23 PM
Link: https://dys.logo.cloud/external?cid=884b5895-65f5-42bf-ae4f-9ec979a447ae&link=478364d5-2dbc-4956-b52d-ca3c52493e5c&tenantId=cdd87e13-3009-4dd1-a5b8-2a005c0e58da&hideName=True&locale=tr_TR

**E-Fatura Kayıt**

```csharp
public static void Kaydet()

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

     fatUst.FATIRS_NO = fatura.YeniEfaturaNumara("GIB");

     fatUst.CariKod = "120-01-014";

     fatUst.Tarih = DateTime.Now;

     fatUst.TIPI = TFaturaTipi.ft_Acik;

     fatUst.EFatOzelKod = 302;

 

     //fatUst.KOD1 = "3";

     fatUst.KDV_DAHILMI = false;

 

     fatKalem = fatura.kalemYeni("barkod");

     fatKalem.DEPO_KODU = 1;

     fatKalem.STra_GCMIK = 1;

     fatKalem.STra_NF = 12;

     fatKalem.STra_BF = 12;

 

     //fatKalem.SeriEkle("Z2","","Z SERI 2","",1,0,"","","","",0);

     fatura.kayitYeni();

      

     MessageBox.Show(fatUst.FATIRS_NO);

 }

 catch (Exception ex)

 {

     MessageBox.Show(ex.Message);

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
```

E-İrsaliye Kayıt:

```csharp

using System;

 using System.Runtime.InteropServices;

 using NetOpenX50;

 namespace NetOpenXTest

 {

     public static class FaturaOrnek

     {

        public static void SatisIrsaliyesiKaydet()

         {

             Kernel kernel = new Kernel();

             Sirket sirket = default(Sirket);

             Fatura fatura = default(Fatura);

             FatUst fatUst = default(FatUst);

             FatKalem fatKalem = default(FatKalem);

         IEIrsEkBilgi eIrsEkBilgi= default(IEIrsEkBilgi);

             try           

             {

                 sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                   "vt adi",

                                   "vt kull adi",

                                   "vt kull sifre",

                                   "netsis kull adi",

                                   "netsis sifre",

                                               0);

                   fatura = kernel.yeniFatura(sirket, TFaturaTip.ftSIrs); 

                   fatUst = fatura.Ust(); 

                   fatUst.FATIRS_NO = fatura.YeniEIrsaliyeNumara("EIR");  // E-irsaliye belgeleri için sıradaki numarayı getirir.

                   fatUst.CariKod = "EFATA2"; 

                   fatUst.Tarih = DateTime.Now; 

                   fatUst.ENTEGRE_TRH = DateTime.Now;

                   fatUst.FiiliTarih = DateTime.Now;

                   fatUst.SIPARIS_TEST = DateTime.Now;

                   fatUst.FIYATTARIHI = DateTime.Now;

                   fatUst.TIPI = TFaturaTipi.ft_Acik; 

                   //fatUst.PLA_KODU = "02"; 

                   //fatUst.Proje_Kodu = "033"; 

                   fatUst.EIrsaliye = true;  //Bu alan temelsette satış irsaliyesi girişindeki e-irsaliye checkbox’ı gibi çalışıyor. Bu alanın true ya da false olmasına bağlı olarak numara ve cari kodu kontrolleri eklendi.

                   fatUst.KDV_DAHILMI = true; 

                   fatKalem = fatura.kalemYeni("1"); 

                   fatKalem.DEPO_KODU = 2; 

                   fatKalem.STra_GCMIK = 5; 

                   fatKalem.STra_NF = 12; 

                   fatKalem.STra_BF = 12; 

 

                  eIrsEkBilgi = fatura.EIrsaliyeEkYeni();  //E-İrsaliye ek bilgi girişi desteklendi. 

                  eIrsEkBilgi.TASIYICIIL = "CARRIERCITY";

                  eIrsEkBilgi.TASIYICIULKE = "TR";

                  eIrsEkBilgi.TASIYICIADI = "CARRIERNAME";

                  eIrsEkBilgi.TASIYICIPOSTAKODU = "34863";

                  eIrsEkBilgi.TASIYICIILCE = "CARRIERSUBCITY";

                  eIrsEkBilgi.TASIYICIVKN = "CARRIERVKN";

                  eIrsEkBilgi.SOFOR1SOYADI = "DPERSON1FAMILYNAME";

                  eIrsEkBilgi.SOFOR1ADI = "DPERSON1FIRSTNAME";

                  eIrsEkBilgi.SOFOR1TCKN = "DPERSON1NID";

                  eIrsEkBilgi.SOFOR1ACIKLAMA = "DPERSON1TITLE";

                  eIrsEkBilgi.SOFOR1TCKN = "11223344556";

                  eIrsEkBilgi.PLAKA = "35LL747";

                  eIrsEkBilgi.SEVKTAR = DateTime.Now;

                  eIrsEkBilgi.SOFOR2SOYADI = "DPERSON2FAMILYNAME";

                  eIrsEkBilgi.SOFOR2ADI = "DPERSON2FIRSTNAME";

                  eIrsEkBilgi.SOFOR2TCKN = "DPERSON2NID";

                  eIrsEkBilgi.SOFOR2ACIKLAMA = "DPERSON2TITLE";

                  eIrsEkBilgi.SOFOR3SOYADI = "DPERSON3FAMILYNAME";

                  eIrsEkBilgi.SOFOR3ADI = "DPERSON3FIRSTNAME";

                  eIrsEkBilgi.SOFOR3TCKN = "DPERSON3NID";

                  eIrsEkBilgi.SOFOR3ACIKLAMA = "DPERSON3TITLE";

                  eIrsEkBilgi.DORSEPLAKA1 = "DORSEPLAKA1";

                  eIrsEkBilgi.DORSEPLAKA2 = "DORSEPLAKA2";

                  eIrsEkBilgi.DORSEPLAKA3 = "DORSEPLAKA3";

 

 

                fatura.kayitYeni();       

                MessageBox.Show(fatUst.FATIRS_NO);     

    }

              

     

    finally

             {

                 Marshal.ReleaseComObject(eIrsEkBilgi);

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

**E-Arşiv Oluşturma**

```csharp
public static void Kaydet()

 {

     Kernel kernel = new Kernel();

     Sirket sirket = default(Sirket);

     EBelge eBelge = default(EBelge);

  

 try           

 {

     sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                   "vt adi",

                                   "vt kull adi",

                                   "vt kull sifre",

                                   "netsis kull adi",

                                   "netsis sifre",

                                   0);

     eBelge = kernel.yeniEBelge(sirket, TEBelgeTip.ebtArsiv);

     eBelge.BelgeNo ="000000000000001";//Fatura no

     eBelge.DizaynNo = 2697;

     eBelge.DovizliOlustur = true;

     eBelge.kayitYeni();

 }

 finally

 {

     Marshal.ReleaseComObject(eBelge);

     sirket.LogOff();

     Marshal.ReleaseComObject(sirket);

     kernel.FreeNetsisLibrary();

     Marshal.ReleaseComObject(kernel);

 }
```

**E-Fatura Taslak Oluşturma**

```csharp
public static void Kaydet()

 {

       

 Kernel kernel = new Kernel();

 Sirket sirket = default(Sirket);

 EBelge eBelge = default(EBelge);

 

 

 try           

 {

     sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                   "vt adi",

                                   "vt kull adi",

                                   "vt kull sifre",

                                   "netsis kull adi",

                                   "netsis sifre"

,

                                   0);

     eBelge = kernel.yeniEBelge(sirket, TEBelgeTip.ebtEFatura);

     eBelge.BelgeNo = "CLK000000000041";//Fatura no

     eBelge.DizaynKontrol = false;

     eBelge.DovizliOlustur = false;

     eBelge.kayitYeni();

    

 }

 finally

 {

     Marshal.ReleaseComObject(eBelge);

     sirket.LogOff();

     Marshal.ReleaseComObject(sirket);

     kernel.FreeNetsisLibrary();

     Marshal.ReleaseComObject(kernel);

}
```

**E-İrsaliye Taslak Oluşturma**

```csharp
public static void Kaydet()

{

           

     Kernel kernel = new Kernel();

     Sirket sirket = default(Sirket);

     EBelge eBelge = default(EBelge);

 

   

     try           

     {

          eBelge = kernel.yeniEBelge(sirket, TEBelgeTip.ebtEIrs);

          eBelge.KaynakTip = TEBelgeKaynakTipi.eitIrs;

          eBelge.BelgeNo ="000000000000001";//Fatura no

          eBelge.DizaynNo = 2697;

          eBelge.FiyatBilgileriBasilsin = true;

          eBelge.kayitYeni();

         

     }

     finally

     {

         Marshal.ReleaseComObject(eBelge);

         sirket.LogOff();

         Marshal.ReleaseComObject(sirket);

         kernel.FreeNetsisLibrary();

         Marshal.ReleaseComObject(kernel);

    }
```

**E-Fatura Görüntüleme**

```csharp
public static void Kaydet()

 {

       

 Kernel kernel = new Kernel();

 Sirket sirket = default(Sirket);

 EBelge eBelge = default(EBelge);

 

 

 try           

 {

     sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                   "vt adi",

                                   "vt kull adi",

                                   "vt kull sifre",

                                   "netsis kull adi",

                                   "netsis sifre",

                                   0);

     eBelge = kernel.yeniEBelge(sirket, TEBelgeTip.ebtEFatura);

     eBelge.BelgeNo = "CLK000000000041";//Fatura no

     eBelge.DizaynKontrol = false;

     eBelge.DovizliOlustur = false;

     eBelge.kayitYeni();

    

 }

 finally

 {

     Marshal.ReleaseComObject(eBelge);

     sirket.LogOff();

     Marshal.ReleaseComObject(sirket);

     kernel.FreeNetsisLibrary();

     Marshal.ReleaseComObject(kernel);

}

 

 

 

 

public static void Kaydet()

 {

       

 Kernel kernel = new Kernel();

 Sirket sirket = default(Sirket);

 EBelge eBelge = default(EBelge);

 

 

 

 try           

 {

     sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                   "vt adi",

                                   "vt kull adi",

                                   "vt kull sifre",

                                   "netsis kull adi",

                                   "netsis sifre",

                                   0);

     

     eBelge = kernel.yeniEBelge(sirket, TEBelgeTip.ebtEFatura);

     eBelge.EBelgeGoruntuleme("CLK2018000000041", @"C:\temp", TEBelgeBoxType.ebAll, "");

    

 }

 finally

 {

     Marshal.ReleaseComObject(eBelge);

     sirket.LogOff();

     Marshal.ReleaseComObject(sirket);

     kernel.FreeNetsisLibrary();

     Marshal.ReleaseComObject(kernel);

}
```

**E-Arşiv Görüntüleme**

```csharp
public static void Kaydet()

 {

       

 Kernel kernel = new Kernel();

 Sirket sirket = default(Sirket);

 EBelge eBelge = default(EBelge);

 

 

 

 try           

 {

     sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                  "vt adi",

                                   "vt kull adi",

                                   "vt kull sifre",

                                   "netsis kull adi",

                                   "netsis sifre",

                                   0);

     

     eBelge = kernel.yeniEBelge(sirket, TEBelgeTip.ebtArsiv);       

     eBelge.EBelgeGoruntuleme("EAR2018000000041", @"C:\temp", TEBelgeBoxType.ebAll, "");

    

 }

 finally

 {

     Marshal.ReleaseComObject(eBelge);

     sirket.LogOff();

     Marshal.ReleaseComObject(sirket);

     kernel.FreeNetsisLibrary();

     Marshal.ReleaseComObject(kernel);

}
```

**E-Irsaliye Görüntüleme**

```csharp
public static void Kaydet()

 {

       

 Kernel kernel = new Kernel();

 Sirket sirket = default(Sirket);

 EBelge eBelge = default(EBelge);

 

 try           

 {

     sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

     "vt adi",

     "vt kull adi",

     "vt kull sifre",

     "netsis kull adi",

     "netsis sifre",

      0);

     

     eBelge = kernel.yeniEBelge(sirket, TEBelgeTip.ebtEIrs);

     eBelge.EBelgeGoruntuleme("EIR2020000000008", @"C:\temp", TEBelgeBoxType.ebOutbox, "");

 }

 finally

 {

     Marshal.ReleaseComObject(eBelge);

     sirket.LogOff();

     Marshal.ReleaseComObject(sirket);

     kernel.FreeNetsisLibrary();

     Marshal.ReleaseComObject(kernel);

}
```

**E-Fatura Gönderme**

```csharp
public static void Kaydet()

{

                  

             Kernel kernel = new Kernel();

             Sirket sirket = default(Sirket);

             EBelge eBelge = default(EBelge);

 

             

     try           

             {

                sirket = kernel.yeniSirket(TVTTipi.vtMSSQL, "ENT9", "TEMELSET", "", "NETSIS", "NET1", 0);

                eBelge = kernel.yeniEBelge(sirket, TEBelgeTip.ebtEFatura);

                eBelge.BelgeNo = "CLK000000000066";     

        eBelge.EBelgeGonderme("CLK000000000066", "Z001", TFaturaTip.ftSFat);

        eBelge.DizaynKontrol = false; eBelge.DovizliOlustur = false;

         }

     

    finally

    {

  

    Marshal.ReleaseComObject(eBelge);

    sirket.LogOff();

    Marshal.ReleaseComObject(sirket);

    kernel.FreeNetsisLibrary();

    Marshal.ReleaseComObject(kernel);

 

 

    }

}
```

**İhracat kayıtlı E-Fatura Gönderme**

```csharp
public static void Kaydet()

           {

                 

            Kernel kernel = new Kernel();

            Sirket sirket = default(Sirket);

            EBelge eBelge = default(EBelge);

 

            

    try           

            {

               sirket = kernel.yeniSirket(TVTTipi.vtMSSQL, "ENT9", "TEMELSET", "", "NETSIS", "NET1", 0);

               eBelge = kernel.yeniEBelge(sirket, TEBelgeTip.ebtEFatura);

               eBelge.BelgeNo = "IHR000000000002";

               eBelge.Ihracat = true; // dış ticaretten girilen belgelerde set edilmeli

               eBelge.EBelgeGonderme("IHR000000000002", "E-FATDOV", TFaturaTip.ftSProforma); // dış ticaretten girilen belgelerde set edilmeli

               eBelge.DizaynKontrol = false;

               eBelge.DovizliOlustur = false;

    

 

           }

            

   finally

            {

               Marshal.ReleaseComObject(eBelge);

               sirket.LogOff();

               Marshal.ReleaseComObject(sirket);

               kernel.FreeNetsisLibrary();

               Marshal.ReleaseComObject(kernel);

           }
```

**E-Arşiv Gönderme**

```csharp
public static void Kaydet()

           {

                 

            Kernel kernel = new Kernel();

            Sirket sirket = default(Sirket);

            EBelge eBelge = default(EBelge);

 

            

    try           

            {

               sirket = kernel.yeniSirket(TVTTipi.vtMSSQL, "ENT9", "TEMELSET", "", "NETSIS", "NET1", 0);

               eBelge = kernel.yeniEBelge(sirket, TEBelgeTip.ebtArsiv);  eBelge.BelgeNo = "EAR000000000048"; 

       eBelge.EBelgeGonderme("EAR000000000048", "320-01-041", TFaturaTip.ftSFat);                

       eBelge.DizaynKontrol = false;

               eBelge.DovizliOlustur = false;

    

 

           }

            

   finally

            {

               Marshal.ReleaseComObject(eBelge);

               sirket.LogOff();

               Marshal.ReleaseComObject(sirket);

               kernel.FreeNetsisLibrary();

               Marshal.ReleaseComObject(kernel);

           }
```

**E-İrsaliye Gönderme**

```csharp
public static void Kaydet()

{

                  

             Kernel kernel = new Kernel();

             Sirket sirket = default(Sirket);

             EBelge eBelge = default(EBelge);

 

             

     try           

             {

        sirket = kernel.yeniSirket(TVTTipi.vtMSSQL, "ENT9", "TEMELSET", "", "NETSIS", "NET1", 0);

                eBelge = kernel.yeniEBelge(sirket, TEBelgeTip.ebtEIrs);

        eBelge.BelgeNo = "EIR000000000019";

        eBelge.EBelgeGonderme("EIR000000000019", "E-FAT", TFaturaTip.ftSIrs);

        eBelge.DizaynKontrol = false;

        eBelge.DovizliOlustur = false;

         }

 

 

 

 

    finally

{

 

 

    Marshal.ReleaseComObject(eBelge);

    sirket.LogOff();

    Marshal.ReleaseComObject(sirket);

    kernel.FreeNetsisLibrary();

    Marshal.ReleaseComObject(kernel);

 

 

}

}
```

**Ret-Kabul**

```csharp
Kernel kernel = new Kernel();

Sirket sirket = default(Sirket);

EBelge eBelge = default(EBelge);

 

try           

{

    sirket = kernel.yeniSirket(TVTTipi.vtMSSQL, "ENT9", "TEMELSET", "", "NETSIS", "NET1", 0);

 

    eBelge = kernel.yeniEBelge(sirket, TEBelgeTip.ebtEIrs);

    eBelge.EBelgeKabulRet("EIR2021000000231", TEBelgeYanitTipi.ytRet);

}

finally

{

    Marshal.ReleaseComObject(eBelge);

    sirket.LogOff();

    Marshal.ReleaseComObject(sirket);

    kernel.FreeNetsisLibrary();

    Marshal.ReleaseComObject(kernel);

}
```

**E-İrsaliye Kalem Kabul-Ret**

```csharp
Kernel kernel = new Kernel();

Sirket sirket = default(Sirket);

EBelge eBelge = default(EBelge);

EBelgeYanitKalem eBelgeYanitKalem = default(EBelgeYanitKalem);

 

try           

{

    sirket = kernel.yeniSirket(TVTTipi.vtMSSQL, "ENT9", "TEMELSET", "", "NETSIS", "NET1", 0);

 

    eBelge = kernel.yeniEBelge(sirket, TEBelgeTip.ebtEIrs);

    eBelgeYanitKalem = eBelge.EBelgeYanitKalemYeni();

    eBelgeYanitKalem.YanitKalemSiraNo = 1;

    eBelgeYanitKalem.YanitRetMiktar = 1;

    eBelgeYanitKalem.YanitRetOlcuBr = "AD";

    eBelgeYanitKalem.YanitKalemAciklama = "test";

 

    eBelgeYanitKalem = eBelge.EBelgeYanitKalemYeni();

    eBelgeYanitKalem.YanitKalemSiraNo = 2;

    eBelgeYanitKalem.YanitRetMiktar = 1;

    eBelgeYanitKalem.YanitRetOlcuBr = "AD";

    eBelgeYanitKalem.YanitKalemAciklama = "test2";

 

    eBelge.EBelgeKalemKabul("EIR2021000000233");

}

finally

{

    Marshal.ReleaseComObject(eBelgeYanitKalem);

    Marshal.ReleaseComObject(eBelge);

    sirket.LogOff();

    Marshal.ReleaseComObject(sirket);

    kernel.FreeNetsisLibrary();

    Marshal.ReleaseComObject(kernel);

}
```

**E-Belge Cari Güncelleme**

```csharp
Kernel kernel = new Kernel();

Sirket sirket = default(Sirket);

EBelge eBelge = default(EBelge);

 

try           

{

    sirket = kernel.yeniSirket(TVTTipi.vtMSSQL, "ENT9", "TEMELSET", "", "NETSIS", "NET1", 0);

    eBelge = kernel.yeniEBelge(sirket, TEBelgeTip.ebtEFatura);

    eBelge.EBelgeCariGuncelle();

    MessageBox.Show("İşlem Tamamlandı");

}

catch (Exception ex)

{

    MessageBox.Show(ex.Message);

}

finally

{

    Marshal.ReleaseComObject(eBelge);

    sirket.LogOff();

    Marshal.ReleaseComObject(sirket);

    kernel.FreeNetsisLibrary();

    Marshal.ReleaseComObject(kernel);

}
```

**E-Arsiv Iptal**

```csharp
public static void Kaydet()

 {

       

 Kernel kernel = new Kernel();

 Sirket sirket = default(Sirket);

 EBelge eBelge = default(EBelge);

 

 try           

 {

     sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

      "vt adi",

      "vt kull adi",

      "vt kull sifre",

      "netsis kull adi",

      "netsis sifre",

      0);

     

     eBelge = kernel.yeniEBelge(sirket, TEBelgeTip.ebtArsiv);

     eBelge.BelgeNo = "CLK000000000041";//Fatura no

     //"IptalKontrol" default değeri True. Daha önce iptal faturası oluşturulmuş ise işlemin yapılmasına izin vermiyor, False olarak set ettikten sonra tekrar tekrar                   //oluşturulabilir.

      //eBelge.IptalKontrol = False;

     eBelge.IptalFaturasiOlustur();

 }

 finally

 {

     Marshal.ReleaseComObject(eBelge);

     sirket.LogOff();

     Marshal.ReleaseComObject(sirket);

     kernel.FreeNetsisLibrary();

     Marshal.ReleaseComObject(kernel);

}
```

**Toplu E-Belge Oluşturma**

```csharp
//Toplu e-fatura, e-irsaliye, e-arşiv ve e-müstahsil oluşturma desteği eklenmiştir. TopluEBelgeOlusturPrm nesnesine temelsette görünen tüm parametreler eklenmiştir. İhtiyaç olanlara aktarım yapılabilir //olarak düzenlenmiştir. Ek olarak TaslakOlustur ve TaslakGonder özelliği eklendi.

//TopluEBelgeOlustur methodu çalıştırıldığında ikisi de false olursa TopluEBelgeSonucGetir methoduyla sadece listeyi geri dönüyor. TaslakOlustur true olursa listedeki belgeleri için taslak oluşturuyor. //Aynı anda TaslakGonder de true gönderilirse taslak oluşturduktan sonra gönderimi de yapılıyor. Sadece zaten oluşmuş taslakları görmek ve göndermek için TopluEBelgeGonder methodunun çalıştırılması //yeterli.

 

            Kernel kernel = new Kernel();

            Sirket sirket = default(Sirket);

            EBelge eBelge = default(EBelge);

            try           

            {

                sirket = kernel.yeniSirket(TVTTipi.vtMSSQL, "ENT9", "TEMELSET", "", "NETSIS", "NET1", 0);

 

                TopluEBelgeOlusturPrm param = new TopluEBelgeOlusturPrm();

                List<TopluEBelgeSonuc> sonuc = new List<TopluEBelgeSonuc>();

 

                eBelge = kernel.yeniEBelge(sirket, TEBelgeTip.ebtEFatura);

                param.EFatBelgeTip = TEFatBelgeTip.efYurtici;

                param.EBelgeTip = TEBelgeTip.ebtEFatura;

                param.SiparisBas = true;              

                //param.BasBelgeNo = "EIR000000000676";

                //param.BitBelgeNo = "EIR000000000676";

                param.BasTarihi = Convert.ToDateTime("13.11.2021");

                param.BitTarihi = Convert.ToDateTime("19.11.2021");

                param.TaslakOlustur = true;

                param.TaslakGonder = true;

                //param.DizaynSor = false;

                //param.DizaynNo = "";

 

                bool result = eBelge.TopluEBelgeOlustur(param);

                //bool result = eBelge.TopluEBelgeGonder(param);

                for (int i = 0; i < eBelge.TopluEBelgeSonucAdedi(); i++)

                {

                    sonuc.Add(eBelge.TopluEBelgeSonucGetir(i));

                }

            }

            catch (Exception ex)

            {

                MessageBox.Show(ex.Message);

            }

            finally

            {

                //Marshal.ReleaseComObject(param);

                Marshal.ReleaseComObject(eBelge);

                sirket.LogOff();

                Marshal.ReleaseComObject(sirket);

                kernel.FreeNetsisLibrary();

                Marshal.ReleaseComObject(kernel);

            }
```

**E-ihracat faturası ek bilgi kaydı**

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

           EIhracatEk eihracatEk = default(EIhracatEk); //ödeme kodu, nakliye tipi ve çeki listesi eklenmesi desteklendi.

            

           sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                           "ENT9",

                                           "TEMELSET",

                                           "",

                                           "NETSIS",

                                           "NET1",

                                           0);

 

            

           Ceki cekiItem = default(Ceki);

           eihracatEk = kernel.yeniEIhracatEk(sirket, TFaturaTip.ftSIrs, "IHR000000000046", "E-FAT");

           eihracatEk.OdemeKodu = 2;

           eihracatEk.NakliyeTipi = TNakliyeTipi.ntDeniz;

           cekiItem = eihracatEk.yeniCeki(1); //ceki kalemleri eklenir.

           cekiItem.PaketTipi = "1";

           cekiItem.KonteynerTipi = "1";

           cekiItem.Miktar = 1;

           eihracatEk.kayitYeni();

            

            Marshal.ReleaseComObject(cekiItem);

           Marshal.ReleaseComObject(eihracatEk);

           Marshal.ReleaseComObject(sirket);

           kernel.FreeNetsisLibrary();

           Marshal.ReleaseComObject(kernel);         }       

    }

}
```

**E-ihracat faturası ek bilgi kayıt oku**

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

            EIhracatEk eihracatEk = default(EIhracatEk);

            Ceki cekiItem = default(Ceki);

             

            sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                            "ENT9",

                                           "TEMELSET",

                                           "",

                                           "NETSIS",

                                           "NET1",

                                            0);

 

             

 

 

             eihracatEk = kernel.yeniEIhracatEk(sirket, TFaturaTip.ftSIrs, "IHR000000000045", "E-FAT");

                for (int i = 0; i <= eihracatEk.CekiAdedi - 1; i++)

               {

              

            cekiItem = eihracatEk.get_CekiKalem(i);

                        var paketTip = cekiItem.PaketTipi;            

 

 

                        }

 

 

            Marshal.ReleaseComObject(cekiItem);

            Marshal.ReleaseComObject(eihracatEk);

            Marshal.ReleaseComObject(sirket);

            kernel.FreeNetsisLibrary();

            Marshal.ReleaseComObject(kernel);        

}       

     }

 }
```

**E-ihracat faturası ek bilgi kayıt sil**

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

            EIhracatEk eihracatEk = default(EIhracatEk);

 

             

            sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                            "ENT9",

                                           "TEMELSET",

                                           "",

                                           "NETSIS",

                                           "NET1",

                                            0);

 

             

 

 

             eihracatEk = kernel.yeniEIhracatEk(sirket, TFaturaTip.ftSIrs, "IHR000000000045", "E-FAT");

             eihracatEk.kayitSil();

 

 

            Marshal.ReleaseComObject(cekiItem);

            Marshal.ReleaseComObject(eihracatEk);

            Marshal.ReleaseComObject(sirket);

            kernel.FreeNetsisLibrary();

            Marshal.ReleaseComObject(kernel);        

}       

     }

 }
```