---
id: file-permission-trong-linux-doc-the-nao-chmod-755-nghia-la-gi
position: backend
technology: linux
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
File permission trong Linux đọc thế nào? `chmod 755` nghĩa là gì?

## Question (EN)
How do you read Linux file permissions, and what does `chmod 755` mean?

## Đáp án chi tiết (VI)
Mỗi file có quyền cho **3 nhóm**: **owner (u)**, **group (g)**, **others (o)**; mỗi nhóm có 3 bit **r (read=4), w (write=2), x (execute=1)**.\
\
- Chuỗi `ls -l`: `-rwxr-xr-x` → owner `rwx`, group `r-x`, others `r-x`.\
- **Octal**: cộng giá trị mỗi nhóm. `755` = owner 7 (`rwx`=4+2+1), group 5 (`r-x`=4+1), others 5 (`r-x`). `644` = owner `rw-`, group/others `r--`.\
- **`x` trên thư mục** = quyền **đi vào (cd)**, không phải chạy.\
\
Lệnh: `chmod 755 file` (đặt octal), `chmod u+x file` (thêm quyền chạy cho owner), `chown user:group file` (đổi chủ sở hữu). Ngoài ra còn special bit: **setuid, setgid, sticky bit**.

## Detailed Answer (EN)
Each file has permissions for **3 classes**: **owner (u)**, **group (g)**, **others (o)**; each with 3 bits **r (read=4), w (write=2), x (execute=1)**.\
\
- The `ls -l` string `-rwxr-xr-x` → owner `rwx`, group `r-x`, others `r-x`.\
- **Octal**: sum each class. `755` = owner 7 (`rwx`=4+2+1), group 5 (`r-x`=4+1), others 5 (`r-x`). `644` = owner `rw-`, group/others `r--`.\
- **`x` on a directory** means **enter (cd) permission**, not execute.\
\
Commands: `chmod 755 file` (set octal), `chmod u+x file` (add execute for owner), `chown user:group file` (change ownership). There are also special bits: **setuid, setgid, sticky bit**.
