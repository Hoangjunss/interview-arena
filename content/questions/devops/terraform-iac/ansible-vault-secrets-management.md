---
id: ansible-vault-secrets-management
position: devops
technology: terraform-iac
level: mid
tags: [ansible, secrets, vault, security]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ansible Vault dùng để làm gì? Trình bày quy trình mã hóa/giải mã một file biến chứa secret và cách tích hợp vào CI/CD.

## Question (EN)
What is Ansible Vault used for? Walk through encrypting/decrypting a secrets variable file and how to integrate it into CI/CD.

## Đáp án chi tiết (VI)
**Ansible Vault** là công cụ built-in của Ansible để **mã hóa** các file (thường là file biến YAML chứa password, API key, private key) ngay trong repo, cho phép commit an toàn vào Git mà không lộ plaintext.

**Mã hóa một file biến:**
```bash
ansible-vault encrypt group_vars/prod/secrets.yml
```
Sau khi mã hóa, nội dung file trông như sau (không đọc được nếu không có password):
```
$ANSIBLE_VAULT;1.1;AES256
66386439653236336462626566653063336164663966303231363934653561363864363633656...
```

**Tạo file mới đã mã hóa sẵn:**
```bash
ansible-vault create group_vars/prod/secrets.yml
```

**Sửa file đã mã hóa (không cần giải mã thủ công ra ngoài):**
```bash
ansible-vault edit group_vars/prod/secrets.yml
```

**Xem nội dung (không sửa):**
```bash
ansible-vault view group_vars/prod/secrets.yml
```

**Chạy playbook có dùng file đã mã hóa:**
```bash
ansible-playbook site.yml --ask-vault-pass
# hoặc dùng file chứa password (không commit file này vào Git!)
ansible-playbook site.yml --vault-password-file ~/.vault_pass.txt
```

**Mã hóa từng biến riêng lẻ (thay vì cả file) — hữu ích khi chỉ 1-2 biến nhạy cảm trong file có nhiều biến khác không cần mã hóa:**
```bash
ansible-vault encrypt_string 'S3cr3tP@ss' --name 'db_password'
```
Kết quả dán trực tiếp vào file YAML thường:
```yaml
db_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  353936336439...
```

**Tích hợp vào CI/CD (ví dụ GitLab CI/Jenkins):**
- Lưu **vault password** dưới dạng CI secret variable (không hardcode trong pipeline file).
- Pipeline ghi password ra file tạm hoặc dùng biến môi trường:
```yaml
# .gitlab-ci.yml (rút gọn)
deploy:
  script:
    - echo "$ANSIBLE_VAULT_PASSWORD" > /tmp/vault_pass.txt
    - ansible-playbook site.yml --vault-password-file /tmp/vault_pass.txt
    - rm -f /tmp/vault_pass.txt
```
- Tốt hơn nữa: dùng script `vault-password-file` là một **executable** gọi tới secret manager thật (Vault, AWS Secrets Manager) để lấy password động, tránh lưu password Vault cố định ở bất kỳ đâu.

**Nhiều vault ID cho nhiều môi trường (từ Ansible 2.4+):**
```bash
ansible-vault encrypt --vault-id prod@prompt group_vars/prod/secrets.yml
ansible-vault encrypt --vault-id dev@prompt group_vars/dev/secrets.yml
```
Cho phép mỗi môi trường dùng password vault khác nhau, người chỉ có quyền dev sẽ không giải mã được secret prod dù cùng repo.

**Hạn chế cần lưu ý khi phỏng vấn:**
- Ansible Vault chỉ mã hóa **nội dung file**, không quản lý vòng đời secret (rotation, audit log truy cập) như Vault (HashiCorp) hay AWS Secrets Manager thật sự — với hạ tầng lớn, xu hướng hiện đại là **không lưu secret trong repo dù đã mã hóa**, mà lookup động qua plugin (`community.hashi_vault`, `amazon.aws.aws_secret`) tại runtime.
- Vault password chia sẻ theo nhóm (không phải per-user), nên khi một người rời team, về lý thuyết cần **đổi lại toàn bộ vault password và mã hóa lại mọi file** — khá cồng kềnh so với hệ thống secret manager có audit + revoke theo từng identity.

## Detailed Answer (EN)
**Ansible Vault** is Ansible's built-in tool for **encrypting** files (typically YAML variable files holding passwords, API keys, private keys) directly in the repo, so they can be safely committed to Git without exposing plaintext.

**Encrypting a variables file:**
```bash
ansible-vault encrypt group_vars/prod/secrets.yml
```
After encryption, the file contents look like this (unreadable without the password):
```
$ANSIBLE_VAULT;1.1;AES256
66386439653236336462626566653063336164663966303231363934653561363864363633656...
```

**Creating a new pre-encrypted file:**
```bash
ansible-vault create group_vars/prod/secrets.yml
```

**Editing an encrypted file (no manual decryption to an external file needed):**
```bash
ansible-vault edit group_vars/prod/secrets.yml
```

**Viewing content (without editing):**
```bash
ansible-vault view group_vars/prod/secrets.yml
```

**Running a playbook that uses an encrypted file:**
```bash
ansible-playbook site.yml --ask-vault-pass
# or use a file holding the password (never commit this file to Git!)
ansible-playbook site.yml --vault-password-file ~/.vault_pass.txt
```

**Encrypting a single variable (instead of the whole file) — useful when only 1-2 variables in a file need to be sensitive:**
```bash
ansible-vault encrypt_string 'S3cr3tP@ss' --name 'db_password'
```
The result is pasted directly into a normal YAML file:
```yaml
db_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  353936336439...
```

**Integrating into CI/CD (e.g., GitLab CI/Jenkins):**
- Store the **vault password** as a CI secret variable (never hardcoded in the pipeline file).
- The pipeline writes the password to a temp file or uses an environment variable:
```yaml
# .gitlab-ci.yml (abridged)
deploy:
  script:
    - echo "$ANSIBLE_VAULT_PASSWORD" > /tmp/vault_pass.txt
    - ansible-playbook site.yml --vault-password-file /tmp/vault_pass.txt
    - rm -f /tmp/vault_pass.txt
```
- Even better: make the `vault-password-file` an **executable script** that calls a real secret manager (Vault, AWS Secrets Manager) to fetch the password dynamically, avoiding storing a fixed vault password anywhere.

**Multiple vault IDs for multiple environments (Ansible 2.4+):**
```bash
ansible-vault encrypt --vault-id prod@prompt group_vars/prod/secrets.yml
ansible-vault encrypt --vault-id dev@prompt group_vars/dev/secrets.yml
```
Lets each environment use a different vault password, so someone with only dev access cannot decrypt prod secrets even in the same repo.

**Limitations worth mentioning in an interview:**
- Ansible Vault only encrypts **file content**; it doesn't manage secret lifecycle (rotation, per-access audit logs) the way a real secret manager like HashiCorp Vault or AWS Secrets Manager does — for large infrastructures, the modern trend is to **not store secrets in the repo at all, even encrypted**, but to look them up dynamically at runtime via a plugin (`community.hashi_vault`, `amazon.aws.aws_secret`).
- The vault password is shared per group, not per user, so when someone leaves the team, in theory you should **rotate the vault password and re-encrypt every file** — quite cumbersome compared to a secret manager system with per-identity audit + revoke.
