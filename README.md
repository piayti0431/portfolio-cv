# Portfolio / CV - Hoang Phat (Junior SEO)

Cap nhat: 07/07/2026.

Repo nay la static portfolio da tach rieng tai `D:\localhost\laragon\www\portfolio-cv`.

- GitHub: https://github.com/piayti0431/portfolio-cv
- Live Vercel: https://portfolio-cv-nine-sage.vercel.app
- Vercel team: `piayti0431s-projects`
- Auto-deploy: push len `main` se kich hoat Vercel build.

## Trang thai hien tai

V2 - clone UI cua `https://vtnguyengiap.id.vn/` da duoc hoan thien theo thong tin Hoang Phat:

- `index.html`: trang chu clone dung cau truc/chuc nang goc, doi palette indigo/cyan sang teal/cam.
- `assets/css/main.css`: CSS clone da doi mau.
- `assets/js/main.js`: JS clone, form lien he dung `mailto`, khong con AJAX WordPress.
- `cv/index.html`: trang CV theo giao dien goc.
- `cv/Hoang-Phat-CV-SEO.pdf`: PDF placeholder de nut tai CV/iframe khong bi 404. Khi co CV that, thay file nay bang PDF that cung ten.
- `du-lich-quy-nhon/index.html`: trang case study.
- `vung-tau-travel/index.html`: trang case study.
- `privacy-policy/index.html`: trang phap ly.
- `terms/index.html`: trang dieu khoan.

Da go:

- Social doi thu (Facebook/LinkedIn/Telegram) o contact/footer va JSON-LD.
- `ajaxUrl`, `contactNonce`, submit WordPress.
- `VoTaNguyenGiap`, link `vtnguyengiap`, va cac duong dan wp-json/oEmbed.
- Skill reel `Front-end` / `Back-end`.
- Cac nhan `SEO Specialist` con sot tren UI chinh.

## Chuc nang hien co

- Header sticky, mobile menu.
- Nut tai CV, nut xem CV.
- Chuyen VI/EN hien thi theo giao dien goc (tam tro ve cung trang).
- Toggle dark/light.
- Word roll trong hero.
- Tool marquee.
- Smooth scroll va active nav.
- Animation fade-up/skill reel.
- Contact form mo ung dung email bang `mailto:tinhnghich17@gmail.com`.
- Trang con theo dung slug cua site goc.

## Kiem tra da lam

- Truy cap site goc `https://vtnguyengiap.id.vn/` tra ve `200`.
- Test local qua Laragon:
  - `/`
  - `/cv/`
  - `/du-lich-quy-nhon/`
  - `/vung-tau-travel/`
  - `/privacy-policy/`
  - `/terms/`
  - `/assets/css/main.css`
  - `/assets/js/main.js`
  - `/cv/Hoang-Phat-CV-SEO.pdf`
- Da chup so sanh Chrome headless desktop/mobile voi site goc; clone giu bo cuc va chuc nang chinh, khac chu dich ve mau sac va noi dung.
- `rg` khong con cac chuoi: `VoTaNguyenGiap`, `vtnguyengiap`, `nguyengiap`, `ajaxUrl`, `contactNonce`, `Facebook`, `LinkedIn`, `Telegram`, `Front-end`, `Back-end`, `SEO Specialist`.

## Deploy

```bash
git add .
git commit -m "Clone portfolio UI for Hoang Phat"
git push
```

Vercel se auto-deploy sau khi push len `main`.
