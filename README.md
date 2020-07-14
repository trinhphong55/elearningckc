###### Angular CLI v10.0.2
###### NodeJS v12.18.0
###### Yarn v1.22.4
###### NPM v6.14.4

# Hướng dẫn sử dụng

**Bước 1:** Clone source code vê và bật **Terminal** chạy lệnh sau để cài đặt các modules được sử dụng trong source code tại thư mục **root**

```
npm install
``` 

hoặc

```
yarn install
```

*Ghi chú: Để sử dụng các lệnh `yarn` bắt buộc phải cài đặt **yarn** vào máy tính của bạn. Chạy lệnh `npm i -g yarn` để cài đặt, sau đó reset lại máy tính.*

**Bước 2:** Bật **Terminal** tại thư mục `propjects/backend` và chạy lệnh sau để cài đặt các modules được sử dụng trong project Backend-API.

```
npm install
``` 

hoặc

```
yarn install
```

**Bước 3:** Bật **Terminal** tại thư mục `root` và chạy lên 1 trong các lệnh sau

Khởi tạo toàn bộ project: `npm start` hoặc `yarn start`

Khởi tạo project Backend-API và project Admin: `npm run ckc-api-admin` hoặc `yarn ckc-api-admin`

Khởi tạo project Backend-API và project CNTT: `npm run ckc-api-cntt` hoặc `yarn ckc-api-cntt`

Khởi tạo project Backend-API và project Elearning: `npm run ckc-api-elearning` hoặc `yarn ckc-api-elearning`

Khởi tạo project Backend-API: `npm run ckc-api-admin` hoặc `yarn ckc-api-admin`

Khởi tạo project Admin: `npm run ckc-admin` hoặc `yarn ckc-admin`

Khởi tạo project CNTT: `npm run ckc-cntt` hoặc `yarn ckc-cntt`

Khởi tạo project Elearning: `npm run ckc-elearning` hoặc `yarn ckc-elearning`

*Ghi chú:*

- project Backend-API chạy trên port **:4100**

- project Admin chạy trên port **:4200**

- project CNTT chạy trên port **:4300**

- project Elearning chạy trên port **:4400**


# Workflow

**Bước 1:** Clone source code (Chỉ thực hiện 1 lần)

```
git clone https://github.com/CaoThangEducation/CaoThangAngular.git
```

**Bước 2 (QUAN TRỌNG):** Chuyển về branch của nhóm các bạn

```
git checkout <tên branch>
```

**Nhóm các bạn sẽ code tại branch đó.**


**Bước 3:** Commit code của bạn lên **branch** và lưu commit đó lên GitHub

```
git add .
git commit -m 'nội dung commit, bạn sẽ nhập thông tin này'
git push
```

**Bước 4:** Đồng bộ code giữa các thành viên trong nhóm với nhau

**Bước 4.1:** Kiểm tra những thay đổi chưa được đồng bộ

```
git status
```

*Hãy thực hiện bước tiếp theo nếu kết quả trả về là **`Your branch is behind <tên branch> by <số thay đổi> commits, and can be fast-forwarded.`***

**Bước 4.2:** Commit code của bạn

```
git add .
git commit -m 'nội dung commit, bạn sẽ nhập thông tin này'
```

**Bước 4.3:** Đồng bộ code và lưu commit đó lên GitHub

```
git pull
git push
```

# Các modules được sử dụng

### Trong project Admin (đã được setup sẵn vào project)

1. @fortawesome/fontawesome-free@5.13.1
2. @mdi/font@5.3.45
3. bootstrap@4.5.0
4. jquery@3.5.1
5. select2@4.0.13
6. swiper@6.0.2
7. vanilla-lazyload@17.1.0

### Trong project CNTT (đã được setup sẵn vào project)

1. @fortawesome/fontawesome-free@5.13.1
2. @mdi/font@5.3.45
3. bootstrap@4.5.0
4. jquery@3.5.1
6. swiper@6.0.2
7. vanilla-lazyload@17.1.0

### Ttrong project Elearning (đã được setup sẵn vào project)

1. @fortawesome/fontawesome-free@5.13.1
2. @mdi/font@5.3.45
3. bootstrap@4.5.0
4. jquery@3.5.1

### Trong project Backend-API (Bắt buộc phải thực hiện **Bước 2** ở phần **Hướng dẫn sử dụng**)

1. body-parser@1.19.0
2. cors@2.8.5
3. express@4.17.1
4. mongoose@5.9.23

# Structure & Generate

Xem chi tiết tại [structure.txt](structure.txt)
