# bahadirdogru.com

Bahadır Doğru’nun kişisel sitesi. Jekyll ile üretilir, GitHub Pages üzerinden [bahadirdogru.com](https://bahadirdogru.com) adresinde yayımlanır. Hazır tema yoktur; şablonlar `_layouts/` ve `_includes/` altında, stil `assets/css/site.css` içindedir.

- `/` ana sayfa: siteler, açık kaynak depolar, son yazılar
- `/calismalar/` projeler (`_data/sites.yml` + `_portfolio/`)
- `/notlar/` NetOpenX C# örnekleri
- `/arsiv/` 2014–2022 yazıları
- `/hakkinda/` hakkında (TR · EN · DE)

## Alt siteler

Aynı tasarım dilini paylaşan alt alan adları `_data/sites.yml` dosyasındadır; ana sayfadaki kartlar ve her sayfanın altbilgisi buradan beslenir. Yeni bir alt site eklemek için oraya bir kayıt eklemek yeterli.

| Site | Depo |
| --- | --- |
| bdhtml2pdf.bahadirdogru.com | bahadirdogru/bdhtml2pdf (`docs/`) |
| vikunja.bahadirdogru.com | bahadirdogru/vikunja-enterprise (`docs/`) |
| netsis.bahadirdogru.com | bahadirdogru/netsis-documentation-examples (`docs/`) |
| tsoft.bahadirdogru.com | bahadirdogru/tsoft-documentation-examples (`docs/`) |

Renk değişkenleri (`--bg`, `--fg`, `--accent` …), 56 px üst çubuk, 8 px köşe yarıçapı, açık/koyu tema düğmesi ve yuvarlatılmış kare harf logosu netsis ve tsoft siteleriyle aynıdır. Birinde değişirse diğerlerinde de değiştirin.

## Yerelde çalıştırma

```bash
bundle install
bundle exec jekyll serve
```
