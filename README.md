# 🌟 We2Star — WeCamp Batch 10 Capstone Project

> Ứng dụng web hỗ trợ lập kế hoạch du lịch (Travel Planner) — bao gồm quản lý lịch trình, ngân sách, danh sách đồ đóng gói và dashboard tổng quan.

---

## Mục lục

- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt & Chạy project](#cài-đặt--chạy-project)
- [Các lệnh hữu ích](#các-lệnh-hữu-ích)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Dependencies](#dependencies)

---

## Yêu cầu hệ thống

| Công cụ  | Phiên bản tối thiểu |
| -------- | -------------------- |
| Node.js  | >= 18.x              |
| npm      | >= 9.x               |
| Git      | >= 2.x               |

---

## Cài đặt & Chạy project

### 1. Clone repository

```bash
git clone https://github.com/ThuTran-ttss/wecamp_batch10_capstone_we2star.git
cd wecamp_batch10_capstone_we2star
```

### 2. Cài đặt dependencies

```bash
cd webapp
npm install
```

### 3. Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại **http://localhost:5173** (mặc định của Vite).

### 4. Build production

```bash
npm run build
```

### 5. Preview bản build

```bash
npm run preview
```

---

## Các lệnh hữu ích

| Lệnh               | Mô tả                                  |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Khởi chạy dev server (HMR)             |
| `npm run build`     | Build ứng dụng cho production           |
| `npm run preview`   | Preview bản build production            |
| `npm run lint`      | Kiểm tra lỗi code với ESLint           |

---

## Cấu trúc thư mục

```
wecamp_batch10_capstone_we2star/
├── webapp/                    
│   ├── public/                 # Static assets (favicon, images,…)
│   ├── src/
│   │   ├── assets/             # Tài nguyên (styles, images,…)
│   │   │   └── styles/
│   │   │       └── global.css  # CSS toàn cục & Tailwind imports
│   │   │
│   │   ├── components/         # React components theo feature
│   │   │   ├── ui/             # Components dùng chung (Button, Input,…)
│   │   │   ├── budget/         # Components quản lý ngân sách
│   │   │   ├── dashboard/      # Components dashboard tổng quan
│   │   │   ├── itinerary/      # Components lịch trình du lịch
│   │   │   └── packing/        # Components danh sách đồ đóng gói
│   │   │
│   │   ├── hooks/              # Custom React hooks
│   │   ├── layout/             # Layout components (Navbar, Sidebar)
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── mock_data/          # Dữ liệu giả lập cho development
│   │   ├── pages/              # Page-level components
│   │   │   ├── HomePage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   │
│   │   ├── providers/          # React Context providers
│   │   │   └── AppProvider.jsx
│   │   │
│   │   ├── router/             # Cấu hình React Router
│   │   │   └── index.jsx
│   │   │
│   │   ├── stores/             # State management (Zustand stores)
│   │   │   └── history.jsx
│   │   │
│   │   ├── utils/              # Hàm tiện ích dùng chung
│   │   ├── App.jsx             # Root component
│   │   └── main.jsx            # Entry point
│   │
│   ├── index.html           
│   ├── vite.config.js          # Cấu hình Vite 
│   ├── eslint.config.js        
│   ├── .prettierrc             
│   └── package.json          
│
└── README.md                  
```

### Path Aliases (cấu hình trong `vite.config.js`)

| Alias                    | Trỏ đến                            |
| ------------------------ | ----------------------------------- |
| `@`                      | `src/`                              |
| `@components/ui`         | `src/components/ui/`                |
| `@components/budget`     | `src/components/budget/`            |
| `@components/dashboard`  | `src/components/dashboard/`         |
| `@components/itinerary`  | `src/components/itinerary/`         |
| `@components/packing`    | `src/components/packing/`           |
| `@assets`                | `src/assets/`                       |
| `@pages`                 | `src/pages/`                        |
| `@layouts`               | `src/layouts/`                      |
| `@utils`                 | `src/utils/`                        |
| `@hooks`                 | `src/hooks/`                        |
| `@store`                 | `src/stores/`                       |
| `@router`                | `src/routers/`                      |
| `@providers`             | `src/providers/`                    |
| `@mock_data`             | `src/mock_data/`                    |

---

## Dependencies

| Package                        | Mô tả                                                        | Tài liệu                                                                         |
| ------------------------------ | ------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `react`                        | Framework chính để xây dựng giao diện                        | [react.dev](https://react.dev/)                                                   |
| `zustand`                      | State management nhẹ, đơn giản                               | [zustand](https://github.com/pmndrs/zustand)                                      |
| `react-hook-form`              | Quản lý form hiệu quả, ít re-render                         | [react-hook-form.com](https://react-hook-form.com/)                               |
| `@hookform/resolvers`          | Tích hợp validation schema (Zod, Yup,…) với React Hook Form | [hookform/resolvers](https://github.com/react-hook-form/resolvers)                |
| `zod`                          | Schema validation & type inference                           | [zod.dev](https://zod.dev/)                                                       |
| `lucide-react`                 | Bộ icon SVG đẹp, nhẹ cho React                              | [lucide.dev](https://lucide.dev/)                                                 |
| `clsx`                         | Utility gộp className có điều kiện                           | [clsx](https://github.com/lukeed/clsx)                                            |
| `date-fns`                     | Thư viện xử lý ngày tháng (format, parse, diff,…)           | [date-fns.org](https://date-fns.org/)                                             |
| `uuid`                         | Tạo UUID duy nhất                                            | [uuid](https://github.com/uuidjs/uuid)                                            |
| `tailwindcss`                  | Utility-first CSS framework                                  | [tailwindcss.com](https://tailwindcss.com/)                                       |
| `eslint`                       | Linting JavaScript/JSX                                       | [eslint.org](https://eslint.org/)                                                 |
| `globals`                      | Danh sách global variables cho ESLint                        | [globals](https://github.com/sindresorhus/globals)                                |
| `prettier`                     | Code formatter tự động                                       | [prettier.io](https://prettier.io/)                                               |
| `prettier-plugin-tailwindcss`  | Tự động sắp xếp Tailwind class names (clean code)           | [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) |
---

## Đóng góp

1. Fork repository
2. Tạo branch mới: `git checkout -b feature/ten-tinh-nang`
3. Commit thay đổi: `git commit -m "feat: mô tả thay đổi"`
4. Push lên branch: `git push origin feature/ten-tinh-nang`
5. Tạo Pull Request


