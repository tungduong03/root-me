Challenge: http://challenge01.root-me.org/web-serveur/ch15/ch15.php

Directory traversal là lỗi tận dụng kí tự `../` để di chuyển trong các thư mục và đọc được nội dung của các mục đó. 

![alt text](image.png)

![alt text](image-1.png)

Với gợi ý là: tìm section ẩn trong galery, và chức năng chính của web là hiển thị các section trong galery.

Bằng cách thay các giá trị trong parameter để truy cập vào các folder trong galery. 

Thay giá trị "/" để xem các section trong galery:

![alt text](image-2.png)

Ta thấy có 1 giá trị ẩn ở đây là `86hwnX2r`

![alt text](image-3.png)

Vào URL: `http://challenge01.root-me.org/web-serveur/ch15/ch15.php?galerie=86hwnX2r`
![alt text](image-4.png)

Với tiêu đề `password.txt` khả nghi nhất: 
![alt text](image-5.png)





