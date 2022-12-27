---
layout: post
title:  "Linux/Debian Sunucudan Sunucuya Dosya Transfer Etme Kopyalama Nasıl Yapılır?"
language: tr
author: bahadir
categories: [Linux]
excerpt: "rsync ssh scp gibi protokoller ile sunucudan sunucuya dosya taşıma işlemi."
image: "assets/images/Gnu-bash-logo.png" 
tags: [Pardus, Debian, ubuntu, Bash, linux, sftp, ssh]
toc: false
---

SSH (Secure Shell) protokolü ile sunucudan sunucuya dosya transferi yapmak için birkaç yöntem vardır. Bu yöntemlerden bazıları şunlardır:

1- scp (Secure Copy) komutu:

Bu komut, SSH üzerinden dosya transferi yapmak için kullanılan bir standart araçtır. scp komutunu kullanarak, bir dosyayı bir sunucudan başka bir sunucuya kopyalayabilir veya tersine de çalıştırabilirsiniz. Örneğin, aşağıdaki komut ile /path/to/local/file dosyasını user@remote:/path/to/remote/ dizinine kopyalayabilirsiniz:

```bash
scp /path/to/local/file user@remote:/path/to/remote/
```

2- rsync komutu:

Bu komut, scp komutundan daha gelişmiş bir seçenektir ve dosya transferi sırasında dosyaların delta (değişikliklerinin) kopyalanmasını sağlar. Bu sayede dosya transferi sırasında ağ bağlantısı kesilse bile, dosya transferi kesintiye uğramadan devam edebilir. rsync komutunu kullanarak dosya transferi yapmak için aşağıdaki komutu kullanabilirsiniz:

```bash
rsync -avz /path/to/local/file user@remote:/path/to/remote/
```

3- sftp (Secure File Transfer Protocol) komutu:

Bu komut, SSH üzerinden dosya transferi yapmak için kullanılan bir araçtır ve bir FTP (File Transfer Protocol) istemcisi gibi çalışır. sftp komutunu kullanarak dosya transferi yapmak için aşağıdaki komutu kullanabilirsiniz:

```bash
sftp user@remote
```

Bu komut çalıştırıldıktan sonra, sftp programı başlayacak ve komut satırında bir FTP-benzeri arayüz görüntülenecektir. Bu arayüzde, get ve put komutlarını kullanarak dosyaları indirebilir veya yükleyebilirsiniz. Örneğin, aşağıdaki komutları kullanarak /path/to/remote/file dosyasını /path/to/local/ dizinine indirebilir ve `/path/to/local/file` dosyasını `/path/to/remote/` dizinine yükleyebilirsiniz: