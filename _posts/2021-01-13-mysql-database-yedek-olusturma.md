---
layout: single
title:  "MYSQL Database Yedek Oluşturma"
language: tr
date:   2021-01-13
categories: [ Information Technology ]
excerpt: "Aynı sunucu içerisinde mysql ile yedek almak"
tags:
- Mysql
- Yedek
- Dublicate
- SSH
beforetoc: "Prism highlighter is a very powerful thing. In this article I'm going to show you what you can actually do with it, some tricks and tips while editing your post. Tocs is also enabled as you can see in summary."
description: "My review of Inception movie. Acting, plot and something else in this short description."
toc: true
# rating: 4.5
---

Mysql databaselerinin hızlıca aynı sunucu içerisinde bir kopyasını çıkararak yedek almak yapılan denemelerden ve değişikliklerden etkilenmemek için hızlıca şu yol kullanılabilir.

`mysqldump db_name | mysql new_db_name`

buradaki pipe hızlıca tüm dump işlemini yeni oluşturduğumuz database içerisine uygulayacaktır. new_db_name isminde bir yedeğimiz olacaktır bu sayede.

tabi mysqldump ve mysql komutlarının ikiside başka komutlar alabilirler bu durumda aşağıdaki gibi olacaktır.

`mysqldump -u <user name> --password=<pwd> <original db> | mysql -u <user name> -p <new db>`

ancak burada dikkat edilmesi gereken tabi yeni yada yedek için isim verdiğimiz database'in oluşmuş olması gerektiği.

`echo "create database new_db_name" | mysql -u <dbuser> -p`

Daha verimli olduğunu bulduğum https://digitalfortress.tech/sql/duplicate-a-mysql-database-tutorial/ adresindeki bilgiye göre

 
` 
mysqldump --quote-names -q -u username1 --password='password1' originalDB | mysql -u username2 --password='password2' duplicateDB`

şeklinde kullanılabiliyor. buradaki -q her işlemde sadece bir satırlık işlem yapılmasını sağlayarak büyük tablolarda hata vermesinin önüne geçiyor.
