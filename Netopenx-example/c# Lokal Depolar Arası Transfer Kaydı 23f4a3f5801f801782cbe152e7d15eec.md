# c# / Lokal Depolar Arası Transfer Kaydı

Created: July 29, 2025 2:46 PM
Link: https://dys.logo.cloud/external?cid=805af85e-f2a2-4a22-a935-e6702226417c&link=9fb5a4bf-4dd5-4241-92ed-05f761cfe29b&tenantId=cdd87e13-3009-4dd1-a5b8-2a005c0e58da&hideName=True&locale=tr_TR

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