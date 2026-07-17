# 🏫 Website Quy Trình Tổ Chức Workshop GSA Trainer

Một ứng dụng web đơn trang (SPA) tương tác cao, được thiết kế chuyên biệt nhằm quản lý, tối ưu hóa và theo dõi toàn bộ quy trình tổ chức Workshop của đội ngũ **GSA (Google Student Ambassador) Trainer**. 

Ứng dụng giúp số hóa quy trình vận hành phức tạp, đồng bộ hóa nhiệm vụ của các thành viên trong nhóm theo thời gian thực và đảm bảo tính nhất quán của chất lượng tổ chức.

👉 **Trải nghiệm trực tuyến tại**: [https://workshop-procedure-gsa-trainer.netlify.app/](https://workshop-procedure-gsa-trainer.netlify.app/)

---

## 🎨 Tính Năng Nổi Bật

### 1. Quy Trình Vận Hành 11 Bước Chuẩn Hóa
Quy trình tổ chức workshop được phân rã khoa học thành 11 bước rõ ràng tương ứng với các ngày triển khai:
*   **Bước 1**: Tìm trường & Quét thông tin (Ngày 1)
*   **Bước 2**: Gửi Email Đề xuất Phối hợp (Ngày 2 - Phân việc theo cá nhân)
*   **Bước 3**: Thủ tục Google & Thiết kế Asset (Ngày 3)
*   **Bước 4**: Cài đặt Automation Đăng ký (n8n) (Ngày 4)
*   **Bước 5**: Duyệt & Chụp hình Truyền thông (Ngày 5)
*   **Bước 6**: Vận hành & Diễn thuyết (Ngày 6)
*   **Bước 7**: Automation Check-out & Tặng quà (Ngày 6)
*   **Bước 8**: Hậu kỳ & Truyền thông Nghiệm thu (Ngày 7)
*   **Bước 9**: Báo cáo Google (Ngày 7 - Phân việc theo cá nhân)
*   **Bước 10**: Bài học & Cải tiến cho workshop (Ngày 8 - Nộp báo cáo cá nhân qua Chatbot Gemini)
*   **Bước 11**: Tìm trường mới (Ngày 9 - Ràng buộc hoàn thành đầy đủ Bước 10)

### 2. Phân Hệ Quản Lý Thành Viên GSA (Admin CRUD)
*   Dành riêng cho Quản trị viên (**Chí Thắng**). Khi đăng nhập bằng admin, một tab **👥 Quản lý Thành viên GSA** sẽ xuất hiện trên thanh điều hướng.
*   Admin có thể thêm mới, chỉnh sửa thông tin (tên, emoji, màu sắc đại diện) hoặc xóa thành viên, đồng thời cấp mật khẩu đăng nhập riêng cho từng người.
*   Tài khoản Admin Chí Thắng được cấu hình bảo vệ vĩnh viễn: không thể xóa, sửa đổi hoặc tạo tài khoản trùng lặp.

### 3. Tự Động Đồng Bộ To-do List Realtime theo Thành Viên
*   Khi admin **thêm thành viên mới**, hệ thống sẽ tự động tạo thêm to-do cá nhân tương ứng cho thành viên đó tại các bước làm việc riêng (Bước 2, Bước 9, Bước 10) trong toàn bộ các dự án hiện có và dự án tương lai.
*   Khi **sửa tên** hoặc **xóa thành viên**, các đầu việc to-do của người đó sẽ được cập nhật hoặc dọn dẹp sạch sẽ khỏi danh sách theo thời gian thực mà không làm ảnh hưởng đến tiến độ chung.
*   Cơ chế nâng cấp tiến độ thông minh (Step-Scoped Migration) giúp ánh xạ và bảo toàn trạng thái hoàn thành (`done`) của các công việc cá nhân cũ một cách chuẩn xác theo tên.

### 4. Giao Diện Chọn Nhân Vật & Đăng Nhập Bảo Mật
*   Giao diện đăng nhập đậm chất Google Material, tự động căn giữa cân đối trên mọi kích thước màn hình (Desktop & Mobile).
*   Popup xác thực mật khẩu được cá nhân hóa động (hiển thị Avatar & Tên nhân vật được chọn). Hỗ trợ đăng nhập trực tiếp đối với các tài khoản không cài đặt mật khẩu.

### 5. Email Template Previewer & Inline WYSIWYG/n8n Editor
*   **Email Client Card**: Trình xem trước email mô phỏng giao diện hộp thư thực tế, hiển thị nổi bật Tiêu đề (Subject) và Nội dung (Body) chuyên nghiệp.
*   **Cú pháp Biến n8n**: Soạn thảo và lưu trữ email trực tiếp theo cú pháp `{{ Biến n8n }}` nhằm tích hợp đồng bộ tự động với các kịch bản n8n localhost.
*   **Trình soạn thảo trơn**: Nhấn `Enter` để xuống dòng đơn trực tiếp, tự động nhận diện danh sách, liên kết tự động và in đậm nhãn trước dấu hai chấm.

### 6. Đồng Bộ Đám Mây Độc Lập & Sao Lưu Supabase
*   Tích hợp Client Supabase đồng bộ cơ sở dữ liệu thời gian thực giữa các thiết bị thông qua bảng `gsa_storage`.
*   Tự động lưu trữ ngoại tuyến qua `localStorage` làm bản sao dự phòng giúp ứng dụng hoạt động mượt mà ngay cả khi kết nối mạng chập chữa.

---

## 🛠️ Công Nghệ Sử Dụng

*   **Frontend**: HTML5, Vanilla CSS3 (Custom Variables, Flexbox, CSS Grid), Vanilla JavaScript (ES6+).
*   **Backend & Realtime**: [Supabase](https://supabase.com/) (Postgres DB, Realtime Channels).
*   **Libraries**: Flatpickr (lựa chọn ngày tháng tiếng Việt).
*   **Hosting**: [Netlify](https://www.netlify.com/).

---

## 📁 Cấu Trúc Thư Mục Chính

```text
├── Data/
│   ├── docx_full_utf8.txt              # Nội dung văn bản thô của tài liệu quy trình
│   └── Quy trình tổ chức GSA Trainer.docx  # Tài liệu quy trình gốc định dạng Word
├── index.html                           # Tập tin giao diện chính & logic vận hành ứng dụng
├── google_apps_script.js                # Kịch bản Google Apps Script phụ trợ (nếu có)
├── README.md                            # Tài liệu giới thiệu dự án
└── scratch/                             # Các script bổ trợ, kiểm tra cú pháp và backup
```

---

## 🚀 Hướng Dẫn Chạy Cục Bộ (Local Development)

1.  **Tải mã nguồn về máy**:
    ```bash
    git clone https://github.com/CThawngs/Workshop-Procedure-GSA-Trainer.git
    cd Workshop-Procedure-GSA-Trainer
    ```

2.  **Khởi động ứng dụng**:
    Do dự án được viết hoàn toàn bằng HTML/CSS/JS thuần, bạn có thể khởi chạy trực tiếp bằng cách:
    *   Click đúp chuột vào file `index.html`.
    *   Hoặc sử dụng extension **Live Server** trên VS Code để tạo localhost chạy thử nghiệm.

---

## 🔒 Bản Quyền & Bảo Mật

*   Hệ thống sử dụng khóa Supabase ẩn danh (`anon key`) để trao đổi dữ liệu an toàn.
*   Mọi thông tin chỉnh sửa cấu trúc thành viên, mật khẩu hoặc cập nhật email template sẽ tự động được broadcast đến tất cả các clients đang mở ứng dụng theo thời gian thực.
