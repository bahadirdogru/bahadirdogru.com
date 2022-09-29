---
layout: post
title:  "Magento 1.9 index çalışmaması sorunu"
language: tr
author: bahadir
categories: [Magento]
excerpt: "Magento index çalışmama sorunu."
image: "assets/images/magento_ecommerce.jpg" 
tags: [magento, mysql, index]
toc: false
---

### Nasıl oluyor?

indeksleme işlemi sırasında mysql pat diye kapanmışsa yada sunucuda hiç dosya yazmaya yer kalmamışsa işlem ortada kalabiliyor. Mysql sistem tablolarında indekslemeye dair bir iz kalıyor ve silinemiyor. db.table.index gibi bir isim yapısı olduğu için db2 olarak kullanırsak bundan sonra sql tablosunu düzeliyor.

Bunun için mysqldump ile yedek alıp başka isimdeki database'e komple yazıp sistemi bu db üzerinde çalışabilir hale getirmek gerekiyor.

### Yapılması gerekenler:

1- maintanence mode'u açmak için ana dizine maintenance.flag isimli bir dosya oluşturuyoruz. 
```bash
sudo touch /magentodirectory/maintenance.flag
```

2- magento isimli database'i bu komutla yedek alıyoruz. 
```bash
sudo mysqldump -u [user] -p [database_name] > [filename].sql
```

3- yeni database açıyoruz magento2 isminde.
```bash
mysql -u root -p -e "CREATE DATABASE magento2 CHARACTER SET utf8 COLLATE utf8_general_ci"; 
```

4- magento2 üzerine yedek yazılır.
```bash
mysql -u [user] -p [database_name] < [filename].sql
```

5- mevcut kullanıcımıza bu database için yetki veriyoruz.
```bash
mysql -u [user] -e "GRANT ALL PRIVILEGES ON magento2.* TO '[user]'@'localhost';"
```

6-  /<Magento Install Dir>/app/etc/local.xml; dosyasında database bilgilerini güncelliyoruz.

7- magmi gibi harici kütüphane kullananlar için ayarlarına girerek database adını magento2 olarak düzenlemek gerekir.

8- maintenance.flag'i kaldırmak ve yönetim panelinden tekrar indekslerin tamamını yenilemek.
```bash
sudo rm /magentodirectory/maintenance.flag
```