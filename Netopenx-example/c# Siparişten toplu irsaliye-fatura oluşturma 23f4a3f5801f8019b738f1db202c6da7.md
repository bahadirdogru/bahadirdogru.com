# c# / Siparişten toplu irsaliye-fatura oluşturma

Created: July 29, 2025 2:57 PM

```csharp
Kernel kernel = new Kernel();

Sirket sirket = default(Sirket);

SiparisTopluIrsFat siparisTopluIrsFat = default(SiparisTopluIrsFat);

 

try

{

    sirket = kernel.yeniSirket(TVTTipi.vtMSSQL, "TEST", "TEMELSET", "", "netsis", "net1", 0);

 

    TopluSipToIrsFatFilterPrm filters = new TopluSipToIrsFatFilterPrm();

    TopluSipToIrsFatYeniBelgeBilgi yeniBelgeBilgi = new TopluSipToIrsFatYeniBelgeBilgi();

 

    siparisTopluIrsFat = kernel.yeniTopluSiparisToIrsFat(sirket, TFaturaTip.ftASip, TFaturaTip.ftAIrs);

 

    filters.SipBasTarihi = Convert.ToDateTime("01.08.2024");

    filters.SipBitisTarihi = Convert.ToDateTime("31.08.2024");

    filters.CariKodu = "320-01-044;320-01-014";

    //filters.SiparisTipi = TSipTipi.sYurtici;

    //filters.KOSULKODU = "02;3;";

    //filters.PlasiyerKodu = "01;1;33";

    //filters.EfatCarilerGetirilsin = true;

    //filters.EkAciklamalar[10] = "kdjfk";

    //filters.EkAciklamalar[1] = "birinci aÃ§Ä±k";

    //filters.SubeKodu = "0;1";

 

    //yeniBelgeBilgi.FatIstisnaKodu = "301";

    //yeniBelgeBilgi.KirilimTip = TTopluSipIrsFatKirilim.tskSiparisNo;

    yeniBelgeBilgi.BelgeNumarasi = "R00000000002248";

    //yeniBelgeBilgi.TevkifatHesapSekli = TTopluSipTevkifatHesap.tstSipDegerHesaplansin;

    //yeniBelgeBilgi.DovizKurGuncellemeSecim = TTopluSipDovizKurGuncelleme.tsdEfektifAlis;

    //yeniBelgeBilgi.SiparislerBirlestirilsin = true;

    //yeniBelgeBilgi.PlasiyerKodFarkliSipBirlestirilsin = true;

    //yeniBelgeBilgi.BelgeTipi = TFaturaTipi.ft_Muhtelif;

    //yeniBelgeBilgi.FaturaKasaKodu = "00";

    //yeniBelgeBilgi.BelgeTarihi= Convert.ToDateTime("16.07.2024");

    //yeniBelgeBilgi.TeslimTarihi = Convert.ToDateTime("25.08.2024");

    //yeniBelgeBilgi.Bform = true;

    //yeniBelgeBilgi.IrsFatAciklama = "AÃ§Ä±klama deneme";

    //yeniBelgeBilgi.TransitIrsaliye = true;

    //yeniBelgeBilgi.MusteriKodu = "145";

    //yeniBelgeBilgi.EIrsaliye = true;

    //yeniBelgeBilgi.TevkifatHesapSekli = TTopluSipTevkifatHesap.tstTumuHesaplansin;

    //yeniBelgeBilgi.ResmiBelgeNo = "0R00000000002248";

    //yeniBelgeBilgi.DovizKurGuncellemeSecim = TTopluSipDovizKurGuncelleme.tsdDovizSatis;

    //yeniBelgeBilgi.TransitIrsaliye = true;

    //yeniBelgeBilgi.EIrsaliye = false;

 

    //yeniBelgeBilgi.FiyatArttirimi = 1.0;

 

 

    //siparisTopluIrsFat.HaricTutulacakSiparisNoEkle("R00000000002673");

    //siparisTopluIrsFat.HaricTutulacakSiparisNoEkle("R00000000002675");

    //siparisTopluIrsFat.HaricTutulacakSiparisNoEkle("R00000000002674");

    siparisTopluIrsFat.TopluSiparisToIrsFat(filters, yeniBelgeBilgi);

}

catch (Exception ex)

{

    MessageBox.Show(ex.Message);

}

finally

{

    Marshal.ReleaseComObject(siparisTopluIrsFat);

    sirket.LogOff();

    Marshal.ReleaseComObject(sirket);

    kernel.FreeNetsisLibrary();

    Marshal.ReleaseComObject(kernel);

}
```