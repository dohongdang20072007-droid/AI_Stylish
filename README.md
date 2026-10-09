# Gấm Vóc Phồn Hoa (AI Stylish)

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-green.svg)]()

## 1. Tổng quan dự án (Overview)

Gấm Vóc Phồn Hoa là một nền tảng ứng dụng trí tuệ nhân tạo (AI) được thiết kế nhằm số hóa và tối ưu hóa trải nghiệm thử, phối trang phục truyền thống Việt Nam. 

Dự án giải quyết bài toán thiếu hụt công cụ hỗ trợ người dùng trẻ trong việc tiếp cận và kết hợp Việt phục (Áo dài, Áo ngũ thân, Áo tấc...) đúng chuẩn mực văn hóa. Ứng dụng đóng vai trò như một hệ thống tư vấn phong cách (virtual stylist), đảm bảo tính hiện đại trong cá nhân hóa người dùng nhưng vẫn duy trì các giá trị cốt lõi của trang phục truyền thống.

Dự án được phát triển và tham gia tranh tài tại cuộc thi **AI ARENA**.

## 2. Tính năng hệ thống (Core Features)

- **Context-based Suggestion:** Hệ thống phân loại và đề xuất trang phục dựa trên các trường dữ kiện đầu vào (loại sự kiện, bối cảnh không gian). Tích hợp xử lý âm thanh môi trường (contextual audio background) nhằm nâng cao trải nghiệm UI/UX.
- **Customization Engine:** Module cho phép người dùng tùy chỉnh các layer trang phục, bao gồm màu sắc, form dáng và phụ kiện đi kèm.
- **Cultural Database:** Tích hợp cơ sở dữ liệu tra cứu nhanh về lịch sử, ý nghĩa và quy chuẩn của từng loại trang phục và phụ kiện.

## 3. Lộ trình phát triển (Roadmap)

- **Phase 1 :** Hoàn thiện logic phối đồ cơ bản và UI/UX hiển thị thông tin văn hóa.
- **Phase 2 :** Triển khai module Virtual Fitting Room (Phòng thử đồ ảo) sử dụng mô hình AI sinh tạo (Generative AI) để ốp trang phục lên ảnh người dùng thực.
- **Phase 3 :** Xây dựng tính năng "Cultural Compliance Checker" - hệ thống cảnh báo tự động khi phát hiện các thao tác phối đồ vi phạm quy chuẩn lịch sử.

## 4. Yêu cầu hệ thống (Prerequisites)

Để triển khai dự án ở môi trường local, máy tính của bạn cần cài đặt:
- Git
- Node.js (phiên bản 16.x trở lên) hoặc Python (phiên bản 3.9 trở lên) - *tùy thuộc vào service đang khởi chạy*
- Package manager: npm, yarn hoặc pip

## 5. Hướng dẫn cài đặt (Installation & Setup)

**Bước 1: Clone repository**
```bash
git clone [https://github.com/your-username/ai_stylish.git](https://github.com/your-username/ai_stylish.git)
cd ai_stylish/AI_STYLISH
```

**Bước 2: Cấu hình biến môi trường (Environment Variables)**
Hệ thống yêu cầu các cấu hình bảo mật được khai báo trong file `.env`. Tiến hành nhân bản file mẫu và thiết lập các thông số cần thiết cho database, API keys:
```bash
cp .env.example .env
```

**Bước 3: Khởi tạo thư mục tài nguyên (Assets)**
Đảm bảo cấu trúc tài nguyên tĩnh (như âm thanh, hình ảnh) đã được nạp đúng vị trí theo kiến trúc thư mục:
```bash
# Verify audio assets
ls assets/audio/
```

**Bước 4: Cài đặt dependencies và khởi chạy**
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```
## 6. Kiến trúc thư mục cơ bản (Project Structure)

```text
AI_STYLISH/
├── assets/
│   ├── audio/              # File âm thanh tĩnh cho các bối cảnh
│   └── images/             # Dữ liệu hình ảnh trang phục/phụ kiện
├── src/                    # Source code chính của ứng dụng
├── .env.example            # Template biến môi trường
├── README.md               # Tài liệu dự án
└── package.json            # Cấu hình dependencies
```

## 7. Đội ngũ phát triển (Contributors)

- **Đỗ Hồng Đăng**
- **Nguyễn Hà My** 
- **Đỗ Ngọc Minh**

---
*Mã nguồn được phân phối dưới giấy phép MIT License.*
