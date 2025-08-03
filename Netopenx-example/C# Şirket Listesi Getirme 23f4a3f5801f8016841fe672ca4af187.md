# C# / Şirket Listesi Getirme

Created: July 29, 2025 4:19 PM

```csharp
using System;
using System.Runtime.InteropServices;
using NetOpenX50;

namespace NetOpenXTest
{
    public static class KernelOrnek
    {
        public static void GetSirketListesi()
        {
            Kernel kernel = new Kernel();
            SirketList sirketList = default(SirketList);
            
            try
            {
                sirketList = kernel.SirketListesi;
                
                for (int i = 0; i < sirketList.SirketSayisi; i++)
                {
                    SirketInfo sirket = sirketList.get_SirketInfo(i);
                    Console.WriteLine("Sirket Adi : {0}, Sirket Yili : {1}", sirket.SirketAdi, sirket.SirketYili);
                }
            }
            finally
            {
                Marshal.ReleaseComObject(sirketList);
                kernel.FreeNetsisLibrary();
                Marshal.ReleaseComObject(kernel);
            }
        }
    }
}
```