---
layout: single
title:  "Türkiye'nin Bilişim Teknolojileri Çıkmazı!"
language: tr
date:   2016-02-19
categories: [ Life ]
excerpt: "Bunun bu ülkenin ve üniversitelerinin bir meselesi olduğunu düşünüyorum..."
tags:  [Tükçe, Bilişim, Üniversite]
beforetoc: "Prism highlighter is a very powerful thing. In this article I'm going to show you what you can actually do with it, some tricks and tips while editing your post. Tocs is also enabled as you can see in summary."
toc: false
---

Türkiye’nin diye iddialı bir başlık attım çünkü bunun bu ülkenin ve üniversitelerinin bir meselesi olduğunu düşünüyorum. Bu yazıyı yazma sebebimi ve arkaplanını anlatayım. Bu yazının perspektifi bir IT’ci değil daha çok İşletmeci olacak.

Bir bilişim teknolojileri sorumlusu olarak bir şirketin tüm bilgisayarlarını, yazıcılarını ve işleyişlerini yönetmek zorunda oluşum ve bunları geliştirmek için satın almalar yada yazılımlarla içli dışlı olmak beni sürekli araştırmaya zorluyor. Bu da bir şirketi sanki sıfırdan kurguluyormuş gibi düşünmeme neden oluyor. İşte formülize en temel adımlar:

### 1- Erp ( Enterprise Resource Planning )

Yani Kurumsal Kaynak Planlama. Kaynak ismi yabancılaştırsa da ilk okunduğunda anlamını aslında şirket yazılımı demek gerekir çünkü pratikte öyleler.  
Finans kaynağı, İnsan kaynağı, Taşınmazlar, Kasa ve Bankadaki para kaynakları, Demirbaşlar, Maaşlar, Muhasebe kayıtları, Vergi beyannameleri, Müşteri ilişkileri ve hatta e-ticaret. Tüm bunlara dair modülleri olan ERP’ler aslında Şirket Programları oluyorlar.

Peki Türkiye’nin elinde kendi yazılım şirketlerinin ürettiği ERP yazılımları var mı? Yani yerli neyi var? Cevap basit herkes şunları sıralar.  
Netsis, Logo, Eta, Mikro, Akınsoft vs..

Ve tüm bunlar Microsoft tabanlı çalışan yazılımlar. Sadece bu yazılımları çalıştırmak için gerekli lisanslama ücretleri 30 bin dollar’ı bulabiliyor. İhtiyaçlara göre değişse de temelde şirketler ya bu ücretleri bizim gibi ödüyorlar yada korsan kullanım yapıyorlar. Peki açık kaynaklı, ücretsiz yada Microsoft bağımsız yazılımlar var mı? Var. Ancak türkiyede uygulanabilirliği yok. Türkiyede uygulanan ve sürekli değiştirilen muhasebe düzeni ile uğraşıcak yazılımcılar çok az. Ve onlarda microsoft tabanlı çalışıyorlar.

Windows Server yerine Debian Server veya RedHat Server kullanabilirsiniz. Aynı şeyleri yapıyorlar ve çoğu zaman debian daha avantajlı oluyor. Ancak Debian’da Eta yada logo çalışmaz. Otomatik olarak size birkaç bin dolar yük biniyor. İkinci adımda Microsoft SQL Veritabanı yerine MySQL yada PostgreSQL kullansanız olmaz mı? Olur. Ancak Windows server’da Mysql server kullanmak yerine binlerce dolar ödeyerek MS-SQL kullanmak Netsis, Logo ve Eta gibi şirketler için daha mantıklı heralde. Böylece binlerce dollarlık bir yük sadece bir ERP yazılımı ihtiyacımızdan dolayı sırtımıza biniyor. Ve bu paraların ülkemizde bir katma değer ürettiği falan da yok! Direk olarak teknolojik bir hasat olarak amerikaya gidiyor.

### 2- Çalışanlar ve Ofis Yazılımları

Hangi sistem olursa olsun en nihayetinde her şirketin elemanları asıl işleri yapanlardır. Bugün 50 kişinin bilgisayarda çalıştığı bir firma 50 windows lisansı almak durumunda. Ortalamada 100 dollar olduğunu düşünürsek 5000 dollarlık saf ayarlanmamış ve ihtiyaçları giderilmemiş işletim sistemi yüklü bilgisayarlar elde etmiş oluyoruz. Word, Excel olmadan olur mu? Olmaz. Hemen birkaç bincik daha yüklerine ekleniyor firmanın. Peki tüm bu maliyetler bu ülkede bir katma değer oluşturuyor mu? Hayır. Amerikaya teknoloji vergimizi, haracımızı ödüyoruz.

### 3- Özel yazılımlar

Her şirketin kendi kültürü, sosyolojisi vardır. Bunu optimize edecek yazılımlara ihtiyaç duyulduğunda en önemli sorun “Entegrasyon” olur. Çünkü misal verecek olursak parmak izi ile giriş çıkışların kayıtlarının tutulduğu bir sistem istenildiğinde cihaz yazılımının ERP yazılımındaki personellerle uyumlu çalışmasını ve böylece raporlanabilirlik beklersiniz. Eğer beklemiyorsanız zaten problem sizde. Peki bu durumda ne olur? Siz microsoft tabanlı çalışan ve verilerinizi tuttuğunuz o sistemlere muhtaç bir şekilde yazılım geliştirmek üzere paralar ödersiniz. Yazılımcı kod yazmaya başlamak için binlerce dollar değerinde Visual Studio ile yazılıma başlar. Üretilen katma değer 1 ise 9 tane yine Amerikaya gider.

### Kök Sorun nedir o vakit?

Kök sorun eğitim. Üniversitelerden mezun olan Bilgisayar Mühendisleri daha Sqlite ismini duymamış ise. Hayatlarında ubuntu, postgreSql ve nginx kelimelerini bile daha duymamışsa bu ülkeden ne beklenebilir? Microsoft kültürü ve teknolojisini daha küçüklükten çocuklara bilgisayar diye öğretirsek en bağımsız, en milli şirketler bile kökten Microsoft bağımlısı olacaktır. Eğitim derkende en önce sayın hocalarımızdan başlamak gerekir. Hayatında Windows’tan başka işletim sistemi kullanmayan hocalarımız var bu ülkede.

### Pardus Saçmalığı?

Bu meselelere biraz aşina olanlar hemen Pardus var diyecektir. Peki kaç kişi kullanıyor bu sistemi bugün kendi ülkesinde? Hiç. Dahası pardus yerli olacak diye her şeyi sıfırdan yazmaya çalışmanın anlamı ne? Open Source ilham alınacak bir projeden niye bir fork (çatallama) yapılmadı? En sonunda durduruldu zaten. Peki almanlar ne yaptı? Almanlar Suse’yi geliştirdi. Üniversiterinde bugün Suse çalıştırılıyor ve önemli devlet kurumları microsoft’tan arındırılmış durumda. Biz niye yapmadık? Tübitak’a sormak lazım bunu.

Bugün türkiye’nin bir mail sitesi, arama motoru yok! Niye? Teknolojiyi ilk takip edip ithal etmeyi ve bununla para kazanmak peşinde koşan yazılım şirketleri var bugün bu ülkede. Gerçekten bir şeyler yapmaya çalışanlarda ki oldukça az ve nadir bulunuyorlar bir firma için ateş pahası oluyorlar. Adamlar haklı az olan kıymetlidir.

### Open Source ve bilinen yanlışlar

Açık kaynakdan dem vurduğumu fark edenler hemen açık kaynak güvenli değil diyorlar. Halbuki alakası olmadığına dair bir dünya örnek var.. Ve Açık kaynak der ki “Bir açık binlerce gözden kaçamaz”.

Bir diğer klişe ise Açık Kaynak bedavadır ve bedava şeyler kurumsal olarak mantıklı olmaz. (Ucuz etin yahnisi edebiyatı) Ancak bilinenin aksine Açık Kaynak bedava değildir. Sadece bir hamur gibidir. Kurumsal projelere uyarlama ve destek gerekir ki bu ülkenin üniversitelerinin yetiştirdiği adamların bence asıl yapması gereken mühendislik ve değer üretme burada olmalıdır. (Her açık kaynak bedava yada özgür demek de değildir. Bu ayrı bir bahis burada girmiyorum)

Hemen kronolojik olarak diğer bir klişe gelicektir. Finansal açıdan bir Açık kaynaklı projeyi uyarlamak ve desteklemek daha maliyetli olacaktır diye. Haklı da olabilirler parasını ödeyip hemen çalıştırmaya başlayacakları bir yazılım yerine proje uyarlaması daha masraflı olabilir. Ancak bir seferlik olacaktır. Bu aslında başka bir sorunumuzunda teşhisi olacaktır. Açık Kaynak sadece almak üzere değildir. Vermek de gerekir. Bir un fabrikası açık kaynak kodlu bir yazılımı optimize ederek kullanıyorsa bunu diğer firmalara satmalı ve diğer firmalar da açık olarak geliştirmeli. Fakat bu ruhu yakalayamadığımız için herkes kendisinde ki küçük kod parçaçığını çok değerli zannetme kompleksine giriyor. Elin Amerikalısıda istediği lisansı satabiliyor.

### Ne Yapmalı?

Bugün yapılması gerekenler aslında basit. Okullarda Ubuntu kullanmaya başlayabilirler. Kendi kardeşimle denedim kesinlikle zor değil öğrenmesi. Libre Office kullanarak MS-Office bağımlılığı ortadan kaldırabilirler. Windows bile kullanılsa libre office çalıştırılabiliyor. Üniversiteler microsoft tabanlı eğitimlerin yerine gerçek mühendislikle uğraşabilirler. Devlet tübitak ve türksat ile bir işletim sistemi geliştirebilir. Bunu debian tabanlı yapabilir mesela. Bir sonraki adımda üzerine bizim muhasebemizle uyumlu ERP programı yazarak yada teşvik ederek; bu ülkenin şirketlerine kurumsal lisanlama yaparak satabilirler. Bunu için vergi muhafiyetleri organize edebilirler.

Üniversiteler bir araya gelerek google emsali bir proje başlatabilir.

Bugüne kadar donanıma yaptığımız desteği biz ülke olarak yazılıma yapmadık. Okullardaki fatih projesi kapsamında dağıtılan android tabletlerin içine yükleyecek bir App üretmedikten sonra o tabletlet ne işe yarar? Bence artık bunun farkına varma zamanı geldi.

Ve artık planları en az 100 yıllık yaparak bir standart koyma sürekli kanunlarla muhasebe ve ticaret sistemlerini, eğitim sistemlerinin değiştirilmemesi lazım. Sürekli sil-baştan yapıldığı için bir “tavır”, bir “maya” tutturulamıyor.

### Ben neler yapıyorum..

WordPress, Magento, OpenERP, OpenKM, Alfersco gibi projelerin kendi çalıştığım şirkette nasıl uyarlanabileceğini, LibreOffice’in ve Thunderbird’ün pratikte şirket kültüründe nasıl yer edebileceğine ve nasıl bir ekip oluşturabilirsem kaliteli yazılımlar geliştirebileceğimize bakıyorum.

İşte size benim en sevdiğim metodu öğreteyim. Önce bir işi seçin. Arşivleme mesela. Peki dijital dökümanların arşivelemesi ile alakalı bir yazılım olup olmadığını sorun. Örnek olarak bana hemen Microsoft SharePoint denildi. O bu işe yarayabilirmiş. Bir sonraki adım  [alternativeto.net](http://alternativeto.net/) adresinden bu yazılımın alternatiflerinin listesine bakın. Alfresco ve OpenKM gibi projeleri bulacaksınız. Sonra YouTube’dan kullanım ve kurulumlarını inceleyin. Bir sanal makina kurun ve deneyin. Sonra şirketinize uyarlayın. Ben işte buna iş geliştirme diyorum.

### Sonuç

Bu ülkede bilişim sektörünün öğretmenleri ve öğrencileri gerçekten değer üretebileceğimiz alanlara odaklanmazsa, Yazılım firmaları yaşayıp durduğumuz bu iç lisanslama sorunsalının üzerine gitmezse ve Sunucu firmaları uygun fiyatlı cloud tabanlı, güvenli, geliştirilebilir esnek imkanlar sunmazsa. En önemlisi devlet bununla alakalı gerçekten bir politika üretmezse bizler ülke olarak sadece bize verilen seçenekler içerisinden seçen ve yaşayan bir toplum oluyoruz, olacağız. Halbuki toplumların kendi seçeneklerini yazabilmesi gerekir. O sebeple ben bu ülkede Bilişim alanında büyük bir çıkmaz görüyorum.
