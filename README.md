# PassCheck - Công cụ kiểm tra độ mạnh mật khẩu

Một website tĩnh hiện đại và chuyên nghiệp để kiểm tra độ mạnh mật khẩu, phát hiện rò rỉ dữ liệu và tạo mật khẩu an toàn.

## ✨ Tính năng chính

### 🔐 Kiểm tra độ mạnh mật khẩu
- **Thuật toán tiên tiến**: Hệ thống chấm điểm 0-100 với phân tích chi tiết
- **Phân tích đa chiều**: Kiểm tra độ dài, ký tự, mẫu và entropy
- **Gợi ý cải thiện**: Đưa ra các khuyến nghị cụ thể để tăng cường mật khẩu
- **Hiển thị trực quan**: Thanh độ mạnh với màu sắc và điểm số rõ ràng

### 🕵️ Kiểm tra rò rỉ dữ liệu
- **Mô phỏng API**: Kiểm tra xem mật khẩu có bị lộ trong các vụ rò rỉ không
- **Kết quả tức thì**: Hiển thị trạng thái an toàn hoặc cảnh báo rò rỉ
- **Giao diện thân thiện**: Thông báo rõ ràng với biểu tượng trực quan

### 🎯 Tạo mật khẩu mạnh
- **Mật khẩu dễ nhớ**: Tạo từ tên hoặc từ khóa với 8 chiến lược khác nhau
- **Mật khẩu ngẫu nhiên**: Tạo mật khẩu hoàn toàn ngẫu nhiên với độ dài tùy chỉnh
- **Đánh giá độ mạnh**: Hiển thị độ mạnh của từng mật khẩu được tạo
- **Sao chép dễ dàng**: Nút sao chép nhanh cho từng mật khẩu

## 🎨 Thiết kế giao diện

### ✨ Phong cách hiện đại
- **Dark theme chuyên nghiệp**: Giao diện tối với gradient xanh dương
- **Backdrop filter**: Hiệu ứng trong suốt với blur hiện đại
- **Typography Inter**: Font chữ rõ ràng, dễ đọc
- **Responsive design**: Tối ưu cho mọi thiết bị

### 🎭 Hiệu ứng tương tác
- **Hover animations**: Chuyển động mượt mà khi di chuột
- **Gradient borders**: Viền gradient xuất hiện khi hover
- **Smooth transitions**: Chuyển đổi mượt mà giữa các trạng thái
- **Toast notifications**: Thông báo nhỏ gọn và đẹp mắt

### 📱 Layout tối ưu
- **Grid system**: Bố cục lưới linh hoạt và cân đối
- **Card-based design**: Mỗi tính năng được đóng gói trong card riêng biệt
- **Spacing nhất quán**: Khoảng cách và padding đồng đều
- **Visual hierarchy**: Phân cấp thông tin rõ ràng

## 🚀 Công nghệ sử dụng

- **HTML5**: Cấu trúc semantic và accessible
- **CSS3**: Grid, Flexbox, Custom Properties, Backdrop Filter
- **JavaScript ES6+**: Modules, Arrow functions, Template literals
- **Font Awesome**: Biểu tượng vector chất lượng cao
- **Google Fonts**: Typography Inter cho giao diện chuyên nghiệp

## 📁 Cấu trúc file

```
passcheck/
├── index.html          # Cấu trúc HTML chính
├── styles.css          # Thiết kế CSS hiện đại
├── script.js           # Logic JavaScript
└── README.md           # Tài liệu dự án
```

## 🎯 Thuật toán đánh giá độ mạnh

### Hệ thống chấm điểm 0-100

#### Điểm cộng:
- **Độ dài (0-25 điểm)**: 8+ ký tự = 10 điểm, 12+ = 15 điểm, 16+ = 18 điểm, 20+ = 20 điểm, 24+ = 22 điểm, 32+ = 25 điểm
- **Ký tự đa dạng (0-30 điểm)**: Chữ hoa (6), chữ thường (6), số (6), ký tự đặc biệt (12)
- **Độ phức tạp (0-15 điểm)**: Dựa trên số ký tự duy nhất
- **Entropy (0-10 điểm)**: Tính toán entropy Shannon

#### Điểm trừ:
- **Mật khẩu phổ biến**: -50 điểm
- **Lặp ký tự quá nhiều**: -20 điểm
- **Mẫu tuần tự**: -25 điểm (abc, 123, qwe...)
- **Mẫu bàn phím**: -30 điểm (qwerty, asdfgh...)
- **Từ điển**: -15 điểm
- **Thông tin cá nhân**: -10 điểm (năm sinh, ngày tháng)

#### Cấp độ:
- **90-100**: Xuất sắc (Excellent)
- **75-89**: Mạnh (Strong)
- **60-74**: Tốt (Good)
- **40-59**: Trung bình (Fair)
- **0-39**: Yếu (Weak)

## 🧠 Chiến lược tạo mật khẩu dễ nhớ

### 8 phương pháp khác nhau:

1. **LeetSpeak**: Thay thế chữ cái bằng số (a→4, e→3, i→1...)
2. **Thêm năm**: Kết hợp năm hiện tại và ký tự đặc biệt
3. **Đảo ngược**: Đảo ngược từ và thêm ký tự đặc biệt
4. **Chèn ký tự**: Chèn ký tự đặc biệt giữa các chữ cái
5. **Từ viết tắt**: Tạo từ viết tắt từ nhiều từ
6. **Mẫu phổ biến**: Thêm "My" + viết hoa + năm + ký tự
7. **Mẫu bàn phím**: Kết hợp với mẫu bàn phím + số
8. **Câu hoàn chỉnh**: Tạo câu "I [từ] 2024!" + ký tự

## 🚀 Cách chạy

1. **Clone hoặc download** dự án về máy
2. **Mở file** `index.html` trong trình duyệt web
3. **Không cần cài đặt** - website hoạt động hoàn toàn offline

## 🔒 Bảo mật

- **Không lưu trữ**: Mật khẩu không được gửi lên server
- **Xử lý local**: Tất cả tính toán được thực hiện trên trình duyệt
- **Kiểm tra rò rỉ**: Chỉ là mô phỏng, không gửi dữ liệu thực
- **Mã nguồn mở**: Có thể kiểm tra và tùy chỉnh theo nhu cầu

## 📱 Responsive Design

- **Desktop**: Layout 2 cột với grid system
- **Tablet**: Chuyển sang 1 cột, giữ nguyên spacing
- **Mobile**: Tối ưu cho màn hình nhỏ, stack các element
- **Touch-friendly**: Kích thước button và input phù hợp mobile

## 🎨 Tùy chỉnh

### Màu sắc:
```css
:root {
    --primary-bg: #0f172a;      /* Nền chính */
    --secondary-bg: #1e293b;    /* Nền phụ */
    --accent-color: #3b82f6;    /* Màu nhấn */
    --success-color: #10b981;   /* Màu thành công */
    --danger-color: #ef4444;    /* Màu nguy hiểm */
}
```

### Typography:
- **Font chính**: Inter (300-800 weight)
- **Font mật khẩu**: Courier New (monospace)
- **Kích thước**: Responsive từ 0.75rem đến 3rem

## 🌟 Tính năng nâng cao

- **Debouncing**: Tối ưu hiệu suất khi nhập mật khẩu
- **Accessibility**: ARIA labels, keyboard navigation
- **Performance**: CSS animations với GPU acceleration
- **Cross-browser**: Tương thích với tất cả trình duyệt hiện đại

## 📈 Roadmap

- [ ] Tích hợp API kiểm tra rò rỉ thực tế
- [ ] Lưu lịch sử mật khẩu đã kiểm tra
- [ ] Export báo cáo PDF
- [ ] Dark/Light theme toggle
- [ ] Đa ngôn ngữ (EN/VI)
- [ ] PWA support

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy:
1. Fork dự án
2. Tạo feature branch
3. Commit thay đổi
4. Push lên branch
5. Tạo Pull Request

## 📄 License

Dự án này được phát hành dưới MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

**PassCheck** - Bảo vệ mật khẩu của bạn một cách thông minh và chuyên nghiệp! 🚀
