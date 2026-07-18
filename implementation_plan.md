# Kế hoạch Căn giữa Giao diện Chọn Nhân vật & Thêm chức năng CRUD Thành viên cho Admin

Kế hoạch này giải quyết việc giao diện chọn nhân vật bị lệch trái và bổ sung giao diện Quản lý Thành viên (CRUD) dành riêng cho quản trị viên (Chí Thắng).

---

## Giao diện Chọn Nhân vật (Căn giữa)

### Hiện trạng
* `.char-grid` sử dụng CSS grid với `repeat(4, 1fr)`. Khi chỉ có 3 nhân vật (đã xóa Phương Linh), cột thứ 4 bị trống và làm các thẻ bị lệch về bên trái.

### Đề xuất Thay đổi
* Chuyển `.char-grid` sang layout `display: flex; justify-content: center; flex-wrap: wrap; gap: 20px;`.
* Định nghĩa chiều rộng cố định cho `.char-card` (`width: 210px`) trên desktop và responsive (`width: 145px`) trên thiết bị di động (màn hình nhỏ hơn 480px) để tự động căn giữa đều mọi số lượng nhân vật.

---

## Quản lý Thành viên (Member CRUD) dành cho Admin

### 1. Phân quyền và Bảo mật
* Chỉ tài khoản có ID là `chi-thang` (Chí Thắng) mới hiển thị tab **👥 Quản lý Thành viên** trên thanh điều hướng chính.
* Bảo vệ các route/hành động CRUD trên code Javascript: kiểm tra `currentUser && currentUser.id === 'chi-thang'`.

### 2. Lưu trữ dữ liệu và Đồng bộ
* Chuyển `const CHARACTERS` thành biến động `let CHARACTERS` được nạp từ `localStorage` dưới khóa `gsa_characters_v2`.
* Đồng bộ danh sách thành viên lên bảng Supabase `gsa_storage` với khóa `characters`.
* Thêm kênh đăng ký Realtime Supabase cho khóa `characters` để cập nhật lập tức giữa các thiết bị khi có thay đổi thành viên.

### 3. Quy trình Động và Ràng buộc Nghiệp vụ
* Chuyển `const TODO_STEPS` thành biến động `let TODO_STEPS` được khởi tạo bằng hàm `getDynamicTodoSteps()`.
* Khi Thêm/Sửa/Xóa thành viên:
  * Tạo lại `TODO_STEPS` dựa trên danh sách thành viên mới.
  * Tự động nâng cấp các dự án workshop hiện tại (`upgradeWorkshops`) để đồng bộ subtasks của Bước 2, Bước 9, Bước 10.
  * Đảm bảo ánh xạ chính xác trạng thái đã làm (done state) của thành viên cũ sang mới bằng cách tìm tên nhân vật trong nội dung công việc thay vì cắt chuỗi cố định.
  * Ràng buộc kiểm tra Bước 11 sẽ tự động so sánh dựa trên độ dài `step10.subs.length` tương ứng với số lượng thành viên thực tế tại thời điểm đó.

### 4. Thành phần Giao diện CRUD (Sử dụng CSS Variables Sleek Dark)
* **Tab mới**: `<button class="tab-btn" id="mainTabMembers" onclick="switchMainTab('members')" style="display: none;">👥 Quản lý Thành viên</button>`
* **Section mới**: `#sectionMembers` chứa bảng danh sách thành viên (Avatar, Tên, Màu sắc đại diện, Thao tác sửa/xóa) và nút "Thêm thành viên".
* **Modal mới**: `#memberModal` cung cấp form thêm/sửa thành viên:
  * Tên thành viên (Input text)
  * Biểu tượng cảm xúc đại diện (Input text emoji hoặc danh sách lựa chọn nhanh)
  * Màu sắc chủ đạo (Color Picker)

---

## Proposed Changes

### [MODIFY] [index.html](file:///c:/Users/nguye/OneDrive/Documents/Projects/Website%20Quy%20tr%C3%ACnh%20t%E1%BB%95%20ch%E1%BB%A9c%20Workshop%20GSA/index.html)
* **CSS**:
  * Thay đổi `.char-grid` từ grid sang flex để căn giữa.
  * Cấu hình chiều rộng cho `.char-card`.
  * Thêm các style cho bảng thành viên và form quản lý đồng nhất với theme tối (sleek dark).
* **HTML**:
  * Bổ sung nút chuyển tab `mainTabMembers` và section `sectionMembers`.
  * Thêm modal `#memberModal` để nhập thông tin thành viên mới hoặc chỉnh sửa thành viên cũ.
* **JS**:
  * Định nghĩa lại `CHARACTERS` dạng `let`, nạp từ `localStorage` và đồng bộ qua Supabase.
  * Đổi `TODO_STEPS` sang dạng động thông qua `getDynamicTodoSteps()`.
  * Viết các hàm nghiệp vụ CRUD: `renderMembers()`, `openAddMemberModal()`, `openEditMemberModal(id)`, `saveMember()`, `deleteMember(id)`.
  * Viết hàm `saveCharactersData()` thực hiện ghi dữ liệu cục bộ và đẩy lên Supabase.
  * Tối ưu logic `upgradeWorkshops()` và kiểm tra ràng buộc hoàn thành Bước 10.

---

## Verification Plan

### Manual Verification
1. Đăng nhập bằng Xuân Thi hoặc Thảo: Xác nhận giao diện chọn nhân vật được căn giữa hoàn hảo. Kiểm tra không thấy tab "Quản lý Thành viên".
2. Đăng nhập bằng Chí Thắng (Admin): Xác nhận nút tab "Quản lý Thành viên" xuất hiện.
3. Nhấp vào tab "Quản lý Thành viên":
   - Thêm một thành viên mới (ví dụ: "Anh Tuấn", 👨‍💻, màu `#FF9900`).
   - Kiểm tra màn hình chọn nhân vật có xuất hiện thành viên mới.
   - Tạo một dự án workshop mới, xác nhận Bước 2, Bước 9, Bước 10 tự động có 4 subtasks tương ứng với 4 thành viên.
   - Thử sửa thông tin thành viên vừa tạo.
   - Xóa thành viên vừa tạo, kiểm tra danh sách quay về 3 thành viên và các workshop tự động cập nhật lại còn 3 subtasks.
