---
layout: post
<<<<<<< Updated upstream
title:  "Magento 1.9 index çalışmaması sorunu"
=======
title:  "Magento 1.9 index çalışmaması"
>>>>>>> Stashed changes
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

### EK:

Eğer db'lerin tam olarak aynı olduğundan emin olmak için şöyle bir yöntem var

> If you're working with small databases I've found running mysqldump on both databases with the --skip-comments and --skip-extended-insert options to generate SQL scripts, then running diff on the SQL scripts works pretty well.

> By skipping comments you avoid meaningless differences such as the time you ran the mysqldump command. By using the --skip-extended-insert command you ensure each row is inserted with its own insert statement. This eliminates the situation where a single new or modified record can cause a chain reaction in all future insert statements. Running with these options produces larger dumps with no comments so this is probably not something you want to do in production use but for development it should be fine. I've put examples of the commands I use below:

```bash
mysqldump --skip-comments --skip-extended-insert -u root -p dbName1>file1.sql
mysqldump --skip-comments --skip-extended-insert -u root -p dbName2>file2.sql
diff file1.sql file2.sql
# vimdiff file1.sql file2.sql
```
kaynak: https://stackoverflow.com/a/8718572