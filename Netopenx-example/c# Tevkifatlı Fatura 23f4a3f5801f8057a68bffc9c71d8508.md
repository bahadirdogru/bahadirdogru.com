# c# / Tevkifatlı Fatura

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

                                   "REMDA2016",

                                   "TEMELSET",

                                   "",

                                   "Admin",

                                   "Admin",

                                   0);

    fatura = kernel.yeniFatura(sirket, TFaturaTip.ftSFat);

 

    fatUst = fatura.Ust();

    fatUst.FATIRS_NO = "F00000000000012";

    fatUst.CariKod = "00001";

    fatUst.Tarih = DateTime.Now;

    fatUst.ENTEGRE_TRH = DateTime.Now;

    fatUst.FiiliTarih = DateTime.Now;

    fatUst.TIPI = TFaturaTipi.ft_Acik;

    fatUst.KDV_DAHILMI = false;

    fatUst.Proje_Kodu = "1";

 

    fatKalem = fatura.kalemYeni("STK01");

    fatKalem.STra_GCMIK = 1;

    fatKalem.STra_NF = 100;

    fatKalem.STra_BF = 100;

    fatKalem.STra_KDV = 18;

    fatKalem.DEPO_KODU = 1;

 

    fatura.HesaplamalariYap();

 

    fatUst.FAT_ALTM2 = -1;

 

    fatura.kayitYeni();

    MessageBox.Show(fatUst.FATIRS_NO);

 

 

}

catch (Exception EX)

{

    MessageBox.Show(EX.Message);

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