---
layout: post
title:  "Sık Kullandığım Bash Scriptler"
language: tr
author: bahadir
categories: [Linux]
excerpt: "Bash Scriptler yayınlamak."
image: "assets/images/Gnu-bash-logo.png" 
tags: [Pardus, Debian, Bash, linux]
toc: false
---

- Mp3'lerin uzunluklarını listeler ve uzunluk.txt dosyasına yazar.
   > Find all mp3 files and create a list with their lenght.
```bash
find . -maxdepth 1 -iname '*.mp3' -exec ffprobe -v quiet -of csv=p=0 -show_entries format=duration {} \; > uzunluk.txt
```

- mp3'leri dosya isimleri ile beraber listeler. ve tumliste.txt dosyasına yazar.
   > Find all mp3 files and create a list with name,lenght.
```bash
find . -maxdepth 1 -iname '*.mp3' -print -exec ffprobe -v quiet -of csv=p=0 -show_entries format=duration {} \; > tumliste.txt
```

- Tüm mp3'ler alt dizinlerle beraber bulup listeler ve uzunluklarını yazar.
   > Find all mp3 files recursivly (with subfolders) and create a list with lenght,name.
```bash
find . -iname '*.mp3' -print -exec ffprobe -v quiet -of csv=p=0 -show_entries format=duration {} \;
```

- Tüm dizinlerde mp3lerin uzunluklarını bulur ve yazar.
   > Find all mp3 files recursivly (with subfolders) and create a list with lenght.
```bash
find . -iname '*.mp3' -exec ffprobe -v quiet -of csv=p=0 -show_entries format=duration {} \; > sadeceuzunluk.txt
```

- Dosya listesini çıkarır ve liste.txt dosyasına yazar.
   > Create a file list in current folder.
```bash
ls > liste.txt
```

- rm ile çok uzun olan dosyalar patlıyor. "/bin/rm: cannot execute [Argument list too long]" bu durumda böyle siliyoruz. herşeyi sil hatta rm * yapamaz ise bile sil
   > When we command rm -rf * and if there is too many files. System says "/bin/rm: cannot execute [Argument list too long]". Avoiding to that we find every single file in a loop than we delete.
```bash
find . -name "*" -print | xargs rm 
```

- ekranda göstererek sil
    > find and delete but show what has been deleted.
```bash
find . -name "*" -print | xargs rm -v
```

- bulunduğu dizindeki tüm klasörlere 1 isimli bir altkasör açar
   > open a folder with 1 name in every folder in current directory
```bash
for dir in */; do mkdir -- "$dir/1"; done
```

- bulunduğun dizindeki tüm klasörleri al içlerindeki S ile başlayanları al ve içlerindeki 1/ isimli klasöre taşı
    > find all folders in current directory and move all folders with S in their name to 1/
```bash
for dir in */; do mv $dir/S* $dir/1/; done
```

- Zaten olan bir dosyayı içini boşaltma
    > Make file empty
```bash
echo -n "" > alreadyexistfile.txt
```

- Tüm alt klasörlerdeki dosyaları sil S.png hariç
    > Delete all files execpt S.png revursivly
```bash
find . -type f ! -iname \S.png -delete
```