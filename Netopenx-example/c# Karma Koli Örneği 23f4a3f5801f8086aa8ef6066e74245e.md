# c# / Karma Koli Örneği

Created: July 29, 2025 2:53 PM

```csharp
Kernel kernel = new Kernel();

Sirket sirket = default(Sirket);

Fatura fatura = default(Fatura);

FatUst fatUst = default(FatUst);

FatKalem fatKalem = default(FatKalem);

try

{

     sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                      "vt adı",

                                      "vt kull adı",

                                      "vt kull sifre",

                                      "netsis kull adı",

                                      "netsis kull sifre",

                                      "şube kodu");

 

    fatura = kernel.yeniFatura(sirket, TFaturaTip.ftSIrs);

 

    fatUst = fatura.Ust();

    fatUst.FATIRS_NO = fatura.YeniNumara("I");

    fatUst.CariKod = "00001";

    fatUst.Tarih = DateTime.Now;

    fatUst.TIPI = TFaturaTipi.ft_YurtIci;

    fatUst.Proje_Kodu = "1";

    fatUst.KDV_DAHILMI = true;

 

    fatKalem = fatura.kalemYeni("K1");

    fatKalem.DEPO_KODU = 1;

    fatKalem.STra_GCMIK2 = 1;

    fatKalem.STra_NF = 12;

    fatKalem.STra_BF = 12;

    fatKalem.KarmaKoliIsle();

 

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
```