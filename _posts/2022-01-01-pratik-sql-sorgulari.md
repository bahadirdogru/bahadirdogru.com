---
layout: post
title:  "Pratik Sql Sorguları"
language: tr
author: bahadir
categories: [Linux]
excerpt: "Sql sorguları"
image: "assets/images/sql.png" 
tags: [mysql, mssql, sql]
toc: false
---

- Kolayca db kopyası çıkartma
```bash
mysqldump --user="kullanici" --password="sifre" database1 | mysql --user "kullanici" --password="sifre" database2;
```

- Kolayca tablo yedeği alma
```sql
SELECT * INTO backedup_tablename FROM original_tablename
```
