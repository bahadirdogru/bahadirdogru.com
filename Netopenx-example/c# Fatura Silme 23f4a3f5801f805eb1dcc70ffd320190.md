# c# / Fatura Silme

Created: July 29, 2025 2:51 PM

```csharp
Kernel kernel = new Kernel();

Sirket sirket = default(Sirket);

Fatura fatura = default(Fatura);

try

{

    sirket = kernel.yeniSirket(TVTTipi.vtMSSQL,

                                       "vt adı",

                                      "vt kull adı",

                                      "vt kull sifre",

                                      "netsis kull adı",

                                      "netsis kull sifre",

                                  sube kodu);

    fatura = kernel.yeniFatura(sirket, TFaturaTip.ftSFat);

    fatura.OkuUst("A00000000000011", "C0001");

    fatura.OkuKalem();

    fatura.kayitSil();

}

finally

{

    Marshal.ReleaseComObject(fatura);

    Marshal.ReleaseComObject(sirket);

    kernel.FreeNetsisLibrary();

    Marshal.ReleaseComObject(kernel);

}
```