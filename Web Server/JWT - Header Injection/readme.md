## JWT - Header Injection

Challenge: http://challenge01.root-me.org:59082/

![alt text](image.png)

Nhập theo key mẫu ta được: 

![alt text](image-1.png)

![alt text](image-2.png)

Ở đây ta thấy nó bảo rằng chỉ cho `Neo` thôi, nên ta sẽ chuyển `user` thành `Neo`:

![alt text](image-3.png)

Ta nhận được thông báo `Invalid token` khả năng là do khóa sai, với đề bài là `Header Injection` ta tìm kiếm và tìm ra rằng header của jwt có thể dùng `jwk` hoặc `jku` để tạo khóa hoặc lấy khóa từ 1 url, ở đây ta sẽ tạo khóa `jwk`:

![alt text](image-8.png)

![alt text](image-4.png)

![alt text](image-5.png)

![alt text](image-6.png)

![alt text](image-7.png)