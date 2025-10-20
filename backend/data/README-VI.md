# Dữ liệu PWDB cho PassCheck

## Tổng quan
Thư mục này chứa dữ liệu từ [PWDB-Public](https://github.com/ignis-sec/Pwdb-Public) - cơ sở dữ liệu phân tích mật khẩu lớn nhất với hơn 1 tỷ credentials từ các vụ rò rỉ dữ liệu thực tế.

## Cấu trúc dữ liệu

### 📁 wordlists/
Danh sách mật khẩu phổ biến nhất được sắp xếp theo tần suất xuất hiện:

| File | Kích thước | Mô tả | Sử dụng |
|------|-----------|-------|---------|
| `ignis-1K.txt` | 7.9KB | Top 1,000 mật khẩu | Demo, testing |
| `ignis-10K.txt` | 79KB | Top 10,000 mật khẩu | **Đang sử dụng** |
| `ignis-100K.txt` | 810KB | Top 100,000 mật khẩu | Kiểm tra nâng cao |
| `ignis-1M.txt` | 8.4MB | Top 1M mật khẩu | Phân tích sâu |
| `ignis-10M.txt` | 91MB | Top 10M mật khẩu | Research |

### 📁 statistical-lists/
Thống kê số lần xuất hiện của mật khẩu:

| File | Định dạng | Mô tả |
|------|-----------|-------|
| `occurrence.1K.txt` | value\|occurrence | Top 1K + số lần xuất hiện |
| `occurrence.10K.txt` | value\|occurrence | Top 10K + số lần xuất hiện |
| `occurrence.100K.txt` | value\|occurrence | Top 100K + số lần xuất hiện |

Ví dụ:
```
value|occurrence
123456|5365167
123456789|1962603
password|1155715
```

### 📄 mystery-list.txt
Danh sách 763,852 mật khẩu có entropy cao (10 ký tự, bao gồm chữ hoa, chữ thường và số) nhưng vẫn bị lặp lại. Đặc điểm:
- Bắt đầu và kết thúc bằng chữ HOA
- Không có ký tự đặc biệt
- Độ dài: 10 ký tự
- Xuất hiện ít nhưng lặp lại bất thường (nghi ngờ do password manager tạo ra)

Ví dụ:
```
00000001wQ
00000007Vv
00000008nZ
```

### 📁 language-specifics/
Mật khẩu phổ biến theo từng ngôn ngữ/quốc gia (top 150 cho mỗi ngôn ngữ):
- Tiếng Đức (German)
- Tiếng Pháp (French)
- Tiếng Tây Ban Nha (Spanish)
- Tiếng Nga (Russian)
- Tiếng Nhật (Japanese)
- v.v. (28+ ngôn ngữ)

## PassCheck sử dụng như thế nào?

### 1. Wordlist chính (ignis-10K.txt)
- Tải khi người dùng nhấn "Kiểm tra rò rỉ" lần đầu
- Cache trong browser để tăng tốc độ
- Kiểm tra xem mật khẩu có nằm trong top 10,000 hay không
- Độ phủ: ~36% các mật khẩu thực tế (từ nghiên cứu PWDB)

### 2. Hardcoded top 30
- Lưu trực tiếp trong JavaScript
- Kiểm tra ngay lập tức không cần tải file
- Bao gồm các mật khẩu nguy hiểm nhất: 123456, password, qwerty, v.v.

### 3. Pattern matching
- Kiểm tra các biến thể phổ biến
- Phát hiện leetspeak (p@ssw0rd)
- Nhận diện keyboard patterns (qwerty, asdfgh)
- Sequential patterns (abc123, 123abc)

## Thống kê PWDB

Từ phân tích 1+ tỷ mật khẩu:

### Phủ sóng
- Top 1,000: **6.6%** tổng số mật khẩu
- Top 10,000: **15-20%** (ước tính)
- Top 1,000,000: **36.28%** tổng số mật khẩu
- Top 10,000,000: **54.00%** tổng số mật khẩu

### Đặc điểm
- Độ dài trung bình: **9.48 ký tự**
- Chứa ký tự đặc biệt: **12.04%**
- Chỉ chữ cái: **28.79%**
- Chỉ chữ thường: **26.16%**
- Chỉ số: **13.37%**
- Mật khẩu duy nhất (xuất hiện 1 lần): **8.83%**

### Top 5 mật khẩu
1. **123456** - 5,365,167 lần
2. **123456789** - 1,962,603 lần
3. **password** - 1,155,715 lần
4. **qwerty** - 869,933 lần
5. **12345678** - 702,094 lần

## Tối ưu hóa hiệu suất

### Lazy loading
```javascript
// Chỉ tải khi cần
await breachChecker.loadWordlist();
```

### Caching
```javascript
// Lưu trong Set để tra cứu O(1)
this.wordlistCache = new Set(passwords);
```

### Progressive checking
1. Kiểm tra top 30 hardcoded (tức thì)
2. Kiểm tra pattern matching (nhanh)
3. Kiểm tra wordlist 10K (cần tải file)

## Credits

Dữ liệu từ **PWDB-Public** project:
- Repository: https://github.com/ignis-sec/Pwdb-Public
- Tác giả: [@FlameOfIgnis](https://github.com/FlameOfIgnis)
- License: Xem trong repository gốc

### Nguồn dữ liệu gốc
- Collection #1 (773M credentials)
- Yahoo breach (3B accounts)
- Facebook data leak (533M accounts)
- Marriott breach (500M accounts)
- Adobe breach (153M accounts)
- LinkedIn breach (117M accounts)
- RockYou breach (32.6M accounts)
- Và nhiều nguồn khác...

## Sử dụng

### Để kiểm tra mật khẩu
PassCheck tự động:
1. Tải wordlist khi cần
2. Cache để sử dụng lại
3. So sánh mật khẩu với database
4. Hiển thị kết quả chi tiết

### Để nghiên cứu
Bạn có thể sử dụng các file này để:
- Phân tích xu hướng mật khẩu
- Huấn luyện ML models
- Nghiên cứu bảo mật
- Tạo password policies

## Lưu ý bảo mật

⚠️ **Quan trọng:**
- Dữ liệu này là CÔNG KHAI từ các vụ rò rỉ
- KHÔNG BAO GIỜ sử dụng mật khẩu từ wordlist này
- Chỉ dùng cho mục đích nghiên cứu và kiểm tra
- Tuân thủ luật pháp địa phương khi sử dụng

## Cập nhật

Để cập nhật dữ liệu mới nhất:
1. Truy cập https://github.com/ignis-sec/Pwdb-Public
2. Tải version mới nhất
3. Thay thế file trong thư mục `data/`
4. Cập nhật thống kê trong `script.js` nếu cần

---

**PassCheck** - Sử dụng dữ liệu thực để bảo vệ bạn! 🛡️
