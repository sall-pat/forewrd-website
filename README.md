# FOREWRD Studio — Website

## Folder Structure

```
forewrd-website/
├── index.html              ← Homepage (scroll animation + lookbook)
├── collection.html         ← Product grid with tabs
├── size-guide.html         ← Size guide page
├── story.html              ← Brand story
├── contact.html            ← Contact page
├── css/
│   └── style.css           ← Shared styles
├── js/
│   └── nav.js              ← Shared nav + UI logic
└── assets/
    ├── renders/            ← 150 scroll animation frames
    │   ├── 0001.png
    │   ├── 0002.png
    │   └── ... through 0150.png
    ├── logo/
    │   ├── forewrd-full.png
    │   └── f-icon.png
    ├── lookbook/           ← 9 styled set photos
    │   ├── look-01-midnight-blue-set.jpg
    │   ├── look-02-champagne-set.jpg
    │   ├── look-03-peplum-corset-jorts.jpg
    │   ├── look-04-brown-pants-maroon-bralette.jpg
    │   ├── look-05-peplum-corset-harem.jpg
    │   ├── look-06-black-pants-silver-top.jpg
    │   ├── look-07-denim-pants-ice-blue-blouse.jpg
    │   ├── look-08-champagne-cowl-set.jpg
    │   └── look-09-denim-jacket-skirt.jpg
    ├── products/
    │   ├── tops/            (2-4 angles each)
    │   │   ├── mbbs-1.jpg   mbbs-2.jpg
    │   │   ├── mb-bra-1.jpg mb-bra-2.jpg
    │   │   ├── cbc-1.jpg    cbc-2.jpg
    │   │   ├── apc-1.jpg    apc-2.jpg
    │   │   ├── mr-bra-1.jpg mr-bra-2.jpg
    │   │   ├── stu-1.jpg    stu-2.jpg
    │   │   ├── ibt-1.jpg    ibt-2.jpg
    │   │   └── cfc-1.jpg    cfc-2.jpg
    │   ├── bottoms/
    │   │   ├── mbw-1.jpg    mbw-2.jpg
    │   │   ├── chm-1.jpg    chm-2.jpg
    │   │   ├── cbj-1.jpg    cbj-2.jpg
    │   │   ├── bbp-1.jpg    bbp-2.jpg
    │   │   ├── hrm-1.jpg    hrm-2.jpg
    │   │   ├── bkp-1.jpg    bkp-2.jpg
    │   │   ├── bfd-1.jpg    bfd-2.jpg
    │   │   ├── dzs-1.jpg    dzs-2.jpg
    │   │   └── cdj-1.jpg    cdj-2.jpg
    │   ├── jewellery/       (1 image each)
    │   │   ├── fee.jpg
    │   │   ├── melb.jpg
    │   │   ├── slb.jpg
    │   │   ├── eme.jpg
    │   │   ├── gmee.jpg
    │   │   ├── trqb.jpg
    │   │   ├── trs.jpg
    │   │   ├── bsr.jpg
    │   │   ├── frgr.jpg
    │   │   └── sqrg.jpg
    │   └── accessories/
    │       └── pscarf.jpg
    ├── fonts/
    │   ├── Begum-Bold.woff2
    │   ├── Begum-Medium.woff2
    │   └── Begum-LightItalic.woff2
    └── icons/
        └── arrow.svg       ← Already included
```

## Quick Start

1. Download and unzip this folder
2. Rename your images to match the names above
3. Drop them into the matching folders
4. Open `index.html` in a browser to preview

## Deploy on GitHub Pages

1. Create a new GitHub repository (e.g. `forewrd-website`)
2. Push this entire folder to the repo
3. Go to Settings → Pages
4. Under "Source", select "Deploy from a branch"
5. Choose `main` branch and `/ (root)` folder
6. Click Save
7. Your site will be live at `https://yourusername.github.io/forewrd-website`

### Connect forewrdstudio.com

1. In GitHub Pages settings, add `forewrdstudio.com` as a custom domain
2. At your DNS provider, add these records:
   - A record → 185.199.108.153
   - A record → 185.199.109.153
   - A record → 185.199.110.153
   - A record → 185.199.111.153
   - CNAME for www → yourusername.github.io
3. GitHub provides free HTTPS automatically

## Adding More Product Images

Each clothing product defaults to 2 images in the code. If you have 3 or 4 angles, just:
1. Add the extra files (e.g. `mbbs-3.jpg`, `mbbs-4.jpg`)
2. In `collection.html`, find the product's `images` array and add the new filename

Example — changing from 2 to 4 images:
```js
// Before:
images: ['mbbs-1.jpg', 'mbbs-2.jpg']
// After:
images: ['mbbs-1.jpg', 'mbbs-2.jpg', 'mbbs-3.jpg', 'mbbs-4.jpg']
```

## WhatsApp Number

All WhatsApp links: +91 9167077708
To change: find-and-replace `919167077708` across all HTML files.
