---
layout: post
title:  "Linux/Debian Çok Yer Kaplayan Dosyaları Bulmak"
language: tr
author: bahadir
categories: [Linux]
excerpt: "Silinmesi gereken çok büyük dosyaları bulmak için kullanılan komutlar."
image: "assets/images/Gnu-bash-logo.png" 
tags: [Pardus, Debian, ubuntu, Bash, linux, ncdu, du]
toc: false
---

Debian işletim sisteminde en çok yer kaplayan dosyaları bulmak istiyorsanız, aşağıdaki adımları izleyebilirsiniz:

"Terminal"'i açın.

Aşağıdaki komutu terminale girin:

```bash
du -h --max-depth=1 / | sort -hr
```

Bu komut, disk üzerindeki tüm dizinlerin boyutlarını gösterir ve en büyük olanları en üstte gösterir. Dizinlerin boyutları, "-h" seçeneği sayesinde uygun bir formatta gösterilir (örneğin, "4.0K", "87M" gibi). "--max-depth=1" seçeneği, sadece birinci seviye dizinlerin boyutlarını gösterir (yani, "/" dizinindeki alt dizinleri içermez).


Bu komutun çıktısı, sistemdeki tüm dizinlerin boyutlarını gösterir. En çok yer kaplayan dizinler, en üstte gösterilir. Örneğin, aşağıdaki çıktıda, "/var" dizini en çok yer kaplıyor ve onu "/tmp" dizininden sonra ikinci sırada gelen en büyük dizin olarak gösterir:

```bash
4.0G    /var
1.4G    /tmp
1.1G    /usr
732M    /home
...
```	

Eğer sadece bir dizinin içindeki dosyaların boyutlarını görmek istiyorsanız, yerine o dizinin yolunu girin. Örneğin:
```bash	
du -h --max-depth=1 /var | sort -hr
```

Bu komut, "/var" dizinin içindeki tüm dosyaların ve alt dizinlerin boyutlarını gösterir ve en büyük olanları en üstte gösterir.

*Not:* Bu komutun çalışması için "du" ve "sort" komutlarının yüklü olması gerekir. Eğer bu komutlar yüklü değilse, "apt-get install coreutils" ve "apt-get install coreutils" komutlarını kullanarak yükleyebilirsiniz.

Bu işlemler için hazır paketlerde mevcut.

Disk alanını kullanan en büyük dosyaları bulmak için ncdu (NCurses Disk Usage) adlı bir araç kullanabilirsiniz. Bu araç, komut satırı üzerinden çalışan bir uygulamadır ve bir dizinin içeriğini özetleyerek en büyük dosyaları gösterir.

Kurulum için aşağıdaki komutu kullanabilirsiniz:

```bash
sudo apt-get install ncdu
```

Ardından, ncdu komutunu çalıştırarak istediğiniz dizinin içeriğini taramaya başlayabilirsiniz. Örneğin, / dizininin içeriğini taramak için aşağıdaki komutu kullanabilirsiniz:

```bash	
ncdu /
```

Bu komut çalıştırıldığında, ncdu programı tarama işlemini başlatacak ve tarama tamamlandıktan sonra en büyük dosyaları gösteren bir ekran görüntüleyecektir. Ekranın sol tarafında, en büyük dosyaların bulunduğu dizinlerin listesi görüntülenir ve sağ tarafında ise bu dizinlerin içinde kaç MB disk alanı kullandıkları gösterilir.

Ekranın üstünde bulunan yön tuşlarını kullanarak dizinler arasında gezinebilir, Enter tuşuna basarak dizinlerin içine girebilir ve q tuşuna basarak programdan çıkabilirsiniz.

Dosyaları sıralamak için s tuşuna basabilir ve dosyaların boyutlarını göstermek için S tuşuna basabilirsiniz. Bu sayede en büyük dosyaları bulmak ve nerede bulunduğunu öğrenmek daha kolay hale gelecektir.