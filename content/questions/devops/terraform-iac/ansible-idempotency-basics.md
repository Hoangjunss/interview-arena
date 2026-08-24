---
id: ansible-idempotency-basics
position: devops
technology: terraform-iac
level: junior
tags: [ansible, idempotency, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Idempotency trong Ansible nghĩa là gì? Làm sao Ansible module biết được có cần thực hiện thay đổi hay không mỗi lần chạy?

## Question (EN)
What does idempotency mean in Ansible? How does an Ansible module know whether a change actually needs to be made each run?

## Đáp án chi tiết (VI)
**Idempotency** nghĩa là chạy cùng một playbook **nhiều lần** trên cùng một máy sẽ luôn cho ra **cùng một kết quả cuối cùng**, và nếu hệ thống đã ở đúng trạng thái mong muốn thì lần chạy sau **không làm gì thêm** (không tạo thay đổi thừa, không lỗi).

**Cơ chế hoạt động:** mỗi module Ansible chuẩn (không phải `command`/`shell`) đều tự **kiểm tra trạng thái hiện tại trước khi hành động**:
```yaml
- name: Ensure nginx is installed
  apt:
    name: nginx
    state: present
```
- Lần chạy đầu: nginx chưa cài → module cài đặt → báo `changed: true`.
- Lần chạy thứ hai: nginx đã cài rồi → module kiểm tra thấy đã đúng trạng thái `present` → **không làm gì** → báo `ok` (không phải `changed`).

**Ví dụ output thực tế:**
```
TASK [Ensure nginx is installed] **********************************
ok: [web01]   # lần 2 trở đi, không có "changed"
```

**Ba trạng thái output của một task:**
| Trạng thái | Ý nghĩa |
|---|---|
| `ok` | Đã đúng trạng thái mong muốn từ trước, không cần làm gì |
| `changed` | Đã thực hiện thay đổi để đạt trạng thái mong muốn |
| `failed` | Không thể đạt trạng thái mong muốn (lỗi) |

**Idempotency giúp gì trong thực tế:**
- Có thể chạy lại playbook an toàn sau khi bị gián đoạn giữa chừng (mất kết nối SSH, server restart) mà không lo tạo trùng lặp hay hỏng hệ thống.
- Dùng `--check` (dry-run) để xem trước những gì **sẽ** thay đổi mà không thực thi thật: `ansible-playbook site.yml --check`.
- Kết hợp `--diff` để xem chi tiết nội dung file sẽ thay đổi.

**Cạm bẫy phá vỡ idempotency:**
- Dùng `command`/`shell` cho các thao tác có side-effect (ví dụ `shell: mysql -e "CREATE TABLE..."`) — chạy lại sẽ lỗi "table already exists" hoặc tạo trùng dữ liệu.
- Cách xử lý: dùng `creates`/`removes` argument để tự kiểm tra điều kiện, hoặc `changed_when: false` khi task chỉ đọc dữ liệu, hoặc tốt nhất là tìm module chuyên dụng (`mysql_db`, `postgresql_table`...) thay vì raw shell.

## Detailed Answer (EN)
**Idempotency** means running the same playbook **multiple times** against the same machine always produces the **same end result**, and if the system is already in the desired state, a later run **does nothing extra** (no redundant changes, no errors).

**How it works:** every standard Ansible module (as opposed to `command`/`shell`) **checks the current state before acting**:
```yaml
- name: Ensure nginx is installed
  apt:
    name: nginx
    state: present
```
- First run: nginx isn't installed → the module installs it → reports `changed: true`.
- Second run: nginx is already installed → the module sees the state already matches `present` → **does nothing** → reports `ok` (not `changed`).

**Example real output:**
```
TASK [Ensure nginx is installed] **********************************
ok: [web01]   # from the second run onward, no "changed"
```

**Three task outcome states:**
| State | Meaning |
|---|---|
| `ok` | Already in the desired state, nothing needed |
| `changed` | A change was made to reach the desired state |
| `failed` | Could not reach the desired state (error) |

**How idempotency helps in practice:**
- You can safely re-run a playbook after an interruption (SSH dropped, server rebooted) without worrying about duplication or breaking the system.
- `--check` (dry-run) previews what **would** change without executing it: `ansible-playbook site.yml --check`.
- Combine with `--diff` to see the exact content that would change.

**Pitfalls that break idempotency:**
- Using `command`/`shell` for operations with side effects (e.g., `shell: mysql -e "CREATE TABLE..."`) — rerunning fails with "table already exists" or duplicates data.
- Fixes: use the `creates`/`removes` argument to self-check the precondition, use `changed_when: false` when the task only reads data, or, best of all, use a dedicated module (`mysql_db`, `postgresql_table`, etc.) instead of raw shell commands.
