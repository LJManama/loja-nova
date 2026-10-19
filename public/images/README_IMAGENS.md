# Instruções para Adicionar Imagens Reais dos Produtos

## Passo 1: Baixar as imagens dos produtos

Para cada produto abaixo, baixe uma imagem real e salve na pasta `public/images/` com o nome especificado:

### Smartphones
- `teco-spark-20-pro.jpg` - Tecno Spark 20 Pro
- `infinix-note-40-pro.jpg` - Infinix Note 40 Pro
- `samsung-galaxy-a54.jpg` - Samsung Galaxy A54
- `xiaomi-redmi-note-13.jpg` - Xiaomi Redmi Note 13
- `itel-p40.jpg` - Itel P40

### Laptops
- `hp-15-laptop.jpg` - HP 15 Laptop
- `dell-inspiron-15.jpg` - Dell Inspiron 15
- `lenovo-ideapad-3.jpg` - Lenovo IdeaPad 3
- `asus-vivobook-15.jpg` - ASUS Vivobook 15

### Gaming
- `playstation-5.jpg` - PlayStation 5
- `xbox-series-s.jpg` - Xbox Series S
- `nintendo-switch.jpg` - Nintendo Switch
- `logitech-g-pro-x.jpg` - Logitech G Pro X

### Acessórios
- `samsung-galaxy-buds2.jpg` - Samsung Galaxy Buds2
- `anker-powercore-20000.jpg` - Anker PowerCore 20000
- `cabo-usb-c-2m.jpg` - Cabo USB-C 2m
- `capa-universal.jpg` - Capa Universal Smartphone

### Áudio
- `jbl-go-3.jpg` - JBL Go 3
- `sony-wh-ch520.jpg` - Sony WH-CH520
- `harman-kardon-aura-3.jpg` - Harman Kardon Aura 3

### TV
- `samsung-43-crystal-uhd.jpg` - Samsung 43 Crystal UHD
- `lg-43-uhd-4k.jpg` - LG 43 UHD 4K
- `hisense-50-a6.jpg` - Hisense 50 A6

### Redes
- `tp-link-archer-c6.jpg` - TP-Link Archer C6
- `mikrotik-rb750gr3.jpg` - MikroTik RB750Gr3
- `ubiquiti-unifi-ap-ac-lr.jpg` - Ubiquiti UniFi AP AC LR

### Câmeras
- `canon-eos-4000d.jpg` - Canon EOS 4000D
- `sony-cyber-shot-dsc-w830.jpg` - Sony Cyber-shot DSC-W830
- `gopro-hero-11.jpg` - GoPro Hero 11

### Impressoras
- `hp-deskjet-2776.jpg` - HP DeskJet 2776
- `canon-pixma-g3010.jpg` - Canon PIXMA G3010
- `epson-l3250.jpg` - Epson L3250
- `brother-hl-l2320d.jpg` - Brother HL-L2320D
- `hp-laserjet-pro-m404dn.jpg` - HP LaserJet Pro M404dn

## Onde baixar as imagens?

Você pode baixar imagens dos sites oficiais:
- Tecno: https://www.tecno-mobile.com/
- Infinix: https://www.infinixmobility.com/
- Samsung: https://www.samsung.com/
- Xiaomi: https://www.mi.com/
- Itel: https://www.itel-mobile.com/
- HP: https://www.hp.com/
- Dell: https://www.dell.com/
- Lenovo: https://www.lenovo.com/
- ASUS: https://www.asus.com/
- Sony: https://www.sony.com/
- Canon: https://www.canon.com/
- Epson: https://www.epson.com/
- Brother: https://www.brother.com/
- JBL: https://www.jbl.com/
- Logitech: https://www.logitech.com/
- GoPro: https://www.gopro.com/
- Hisense: https://www.hisense.com/
- TP-Link: https://www.tp-link.com/
- MikroTik: https://mikrotik.com/
- Ubiquiti: https://ui.com/

## Passo 2: Atualizar o banco de dados

Depois de salvar todas as imagens na pasta `public/images/`, execute o comando no PowerShell:

```powershell
& "C:\wamp64\bin\mysql\mysql8.4.7\bin\mysql.exe" -u root loja_nova < "D:\Manama\Web\loja-nova\update_real_images.sql"
```

## Passo 3: O arquivo SQL para atualizar as imagens

O arquivo `update_real_images.sql` será criado automaticamente e vai atualizar todas as URLs para apontar para `/images/nome-do-arquivo.jpg`.

---

**Dica:** Use imagens em formato JPG ou PNG com tamanho de 500x500 pixels para melhor visualização no site.
