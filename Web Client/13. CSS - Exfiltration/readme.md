Challenge: http://challenge01.root-me.org:58005/

Truy cập trang web ta thấy web có 2 chức năng chính là thay đổi màu sắc page và 1 chức năng để report cho admin:
![alt text](image.png)

Với chức năng thay đổi màu sắc, nó sẽ được thay dổi qua url với parameter `style`: 
![alt text](image-1.png)

Xem mã nguồn ta thấy css được import theo tên file và có 1 loạt màu ở đây:
![alt text](image-2.png)

Thử với 1 giá trị ko có trong danh sách, nó sẽ bị lỗi: 
![alt text](image-3.png)

Và nó vẫn được truyền trực tiếp vào và thêm đuôi `.css`
![alt text](image-4.png)

Thử bắn ra gói tin webhook, dùng dấu `/` cuối để biến `.css` thành 1 path:
![alt text](image-5.png)

Và ta nhận được gói tin: 
![alt text](image-6.png)


Bây giờ ta sẽ xây dựng 1 file css sao cho nó sẽ lấy được `csrf token` của admin, vì csrf ở client có `name=csrf` nên ta cũng sẽ lấy `input` `name=csrf` ở phía admin: 
![alt text](image-7.png)

Ta tạo file css với input name=csrf và giá trị bắt đầu bằng các kí tự nào đó thì sẽ request đến webhook path `token=` kí tự đó: ^= để lấy các kí tự bắt đầu, $= lấy các kí tự cuối 

![alt text](image-8.png)

Đẩy file lên server:
![alt text](image-9.png)

Test phía client: 
![alt text](image-10.png)

Nhận gói tin: 
![alt text](image-11.png)

Khớp với chữ cái đầu của csrf token bên client.




