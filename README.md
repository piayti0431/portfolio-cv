# Portfolio — Hoàng Phát · Junior SEO

Trang portfolio cá nhân một trang (single-page), thuần HTML/CSS/JS, **không cần build**. Deploy thẳng lên Vercel / Netlify / GitHub Pages.

## Cấu trúc
```
portfolio/
├── index.html          # Toàn bộ trang (HTML + CSS + JS trong 1 file)
├── images/             # Ảnh chứng minh số liệu (xem images/README.md)
│   ├── quynhon-gsc.png
│   ├── quynhon-ga4.png
│   ├── vungtau-gsc.png
│   └── vungtau-ga4.png
├── .gitignore
└── README.md
```

## Chạy thử ở máy
Mở trực tiếp `index.html` bằng trình duyệt là xong. Hoặc dùng Live Server (VS Code) để xem ảnh load đúng đường dẫn.

## Deploy lên Vercel (GitHub → Vercel)
1. Tạo repo GitHub mới, đẩy toàn bộ thư mục này lên (để `index.html` ở gốc repo).
2. Vào https://vercel.com → **Add New → Project** → chọn repo.
3. Framework Preset: **Other** · Build Command: để trống · Output Directory: để trống.
4. **Deploy** → nhận link `*.vercel.app`.
5. Gắn domain riêng ở **Settings → Domains** (trỏ DNS theo hướng dẫn của Vercel).

## Trước khi deploy — nhớ:
- [ ] Bỏ 4 ảnh screenshot vào `images/` đúng tên (xem `images/README.md`)
- [ ] Cập nhật `<link rel="canonical">` trong `index.html` thành domain thật
- [ ] (Tùy chọn) Thêm ảnh chân dung, link Facebook/LinkedIn/Zalo
