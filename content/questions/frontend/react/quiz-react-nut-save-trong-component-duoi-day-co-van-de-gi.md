---
id: quiz-react-nut-save-trong-component-duoi-day-co-van-de-gi
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nút Save trong component dưới đây có vấn đề gì?

## Đáp án trắc nghiệm
- [x] onClick={handleClick()} GỌI hàm ngay lúc render và truyền kết quả (undefined) vào onClick
- [ ] Phải truyền chuỗi "handleClick()" giống thuộc tính HTML: onClick="handleClick()"
- [ ] Không có vấn đề — React tự nhận biết và chờ đến khi user click mới thực thi handleClick()
- [ ] Phải viết onclick chữ thường như HTML thì React mới nhận diện được sự kiện

## Giải thích (VI)
Lỗi ở onClick={handleClick()}: cặp ngoặc () khiến hàm chạy ngay lúc render, và giá trị trả về (undefined) mới là thứ được gán vào onClick — click nút không có gì xảy ra. Cách đúng là truyền function reference: onClick={handleClick}. Muốn truyền tham số thì bọc arrow function: onClick={() => handleClick(id)}.

### Giải thích các phương án:
- **onClick={handleClick()} GỌI hàm ngay lúc render và truyền kết quả (undefined) vào onClick** (Đúng): Click nút không chạy gì; phải truyền function reference: onClick={handleClick}. Đúng: cặp ngoặc () thực thi hàm ngay khi JSX được đánh giá; onClick cần nhận chính function để React gọi khi sự kiện xảy ra.
- **Phải truyền chuỗi "handleClick()" giống thuộc tính HTML: onClick="handleClick()"** (Sai): JSX truyền function reference chứ không truyền string — cú pháp chuỗi là của HTML attribute, không hoạt động trong React.
- **Không có vấn đề — React tự nhận biết và chờ đến khi user click mới thực thi handleClick()** (Sai): React không can thiệp được: handleClick() là biểu thức JavaScript, được đánh giá ngay lúc render trước khi React nhìn thấy kết quả.
- **Phải viết onclick chữ thường như HTML thì React mới nhận diện được sự kiện** (Sai): Ngược lại — React dùng camelCase (onClick, onChange); viết onclick chữ thường mới là sai trong JSX.
