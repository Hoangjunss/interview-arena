---
id: quiz-nodejs-processnexttick-va-setimmediate-khac-nhau-the-nao-ve-thoi-diem-chay-callback
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
process.nextTick() và setImmediate() khác nhau thế nào về thời điểm chạy callback?

## Đáp án trắc nghiệm
- [ ] setImmediate chạy ngay lập tức trong cùng tick, còn process.nextTick đợi tới vòng lặp kế tiếp
- [ ] process.nextTick chạy callback trên một thread khác để không chặn luồng chính
- [x] Callback của process.nextTick chạy ngay sau thao tác hiện tại, trước khi event loop tiếp tục
- [ ] Hai hàm tương đương nhau, chỉ khác cú pháp

## Giải thích (VI)
process.nextTick(cb) đưa callback vào hàng đợi được xả ngay sau thao tác hiện tại, TRƯỚC khi event loop chuyển sang phase kế — chen trước cả Promise microtask theo thứ tự xử lý của Node. setImmediate(cb) chạy ở check phase, sau poll phase. Vì nextTick chen trước mọi phase, gọi đệ quy nextTick có thể chặn I/O; docs khuyên ưu tiên setImmediate khi có thể.

### Giải thích các phương án:
- **setImmediate chạy ngay lập tức trong cùng tick, còn process.nextTick đợi tới vòng lặp kế tiếp** (Sai): Ngược lại. Docs Node thừa nhận hai cái tên gây nhầm: về hành vi, nextTick mới là "immediate" hơn (chạy trước khi event loop tiếp tục), còn setImmediate chạy ở vòng kế của check phase.
- **process.nextTick chạy callback trên một thread khác để không chặn luồng chính** (Sai): Cả hai đều chạy callback trên luồng JS duy nhất; chúng chỉ khác vị trí xếp hàng, không liên quan tới đa luồng.
- **Callback của process.nextTick chạy ngay sau thao tác hiện tại, trước khi event loop tiếp tục** (Đúng): setImmediate chạy ở check phase của vòng lặp. Hàng đợi nextTick được xả ngay sau khi operation hiện tại kết thúc, chen trước mọi phase của event loop. setImmediate được lên lịch vào check phase, sau poll phase của vòng lặp hiện tại.
- **Hai hàm tương đương nhau, chỉ khác cú pháp** (Sai): Không tương đương: nextTick chen trước mọi phase (nên lạm dụng có thể "bỏ đói" I/O), setImmediate xếp vào check phase và không chặn I/O.
