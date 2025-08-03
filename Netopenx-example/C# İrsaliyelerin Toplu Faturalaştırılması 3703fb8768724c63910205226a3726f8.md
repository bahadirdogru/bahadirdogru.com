# C# / İrsaliyelerin Toplu Faturalaştırılması

Created: July 6, 2021 5:26 PM

```csharp
using System;
using System.Runtime.InteropServices;
using NetOpenX50;
 
namespace NetOpenXTest
{
    public static class TopluFaturaOrnek
    {
        public static void IrsaliyeleriTopluFaturalastir()
        {
            Kernel kernel = new Kernel();
            Sirket sirket = default(Sirket);
            TopluFatura topluFat = default(TopluFatura);
            try
            {
                sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,
                                                  "vt adı",
                                                  "vt kull adı",
                                                  "vt kull şifre",
                                                  "netsis kull adı",
                                                  "netsis şifre",
                                                   0);
                topluFat = kernel.yeniTopluFatura(sirket, TFaturaTip.ftSIrs);
 
                topluFat.IrsaliyelerBirlessin = true;                
                topluFat.FaturalastirmaKirilim = TFaturaKirilim.fkKosulKod;
                topluFat.AltCariKodu = "00002";
                topluFat.UstCariKodu = "00002";
                topluFat.AltIrsaliyeNumarasi = "I00000000000021";
                topluFat.UstIrsaliyeNumarasi = "I00000000000022";
                topluFat.FaturaNumarasi = "F00000000000113"; //Oluşacak olan faturanın numarasını belirtir
                topluFat.AltIrsaliyeTipi = TFaturaTipi.ft_Kapali;
                topluFat.UstIrsaliyeTipi = TFaturaTipi.ft_Acik;
                
                topluFat.IrsaliyeleriFaturalastir(); //irsaliyeleri faturalaştırır
            }
            finally
            {
                Marshal.ReleaseComObject(topluFat);
                Marshal.ReleaseComObject(sirket);
                kernel.FreeNetsisLibrary();
                Marshal.ReleaseComObject(kernel);
            }
        }
    }
}
```