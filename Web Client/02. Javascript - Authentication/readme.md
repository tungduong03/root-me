Challenge: http://challenge01.root-me.org/web-client/ch9/

![alt text](image.png)

Thử đăng nhập với username và password bất kì `admin:admin`: 
![alt text](image-1.png)

Thông báo sẽ trả về là wrong: 
![alt text](image-2.png)

Kiểm tra source code của web: 
![alt text](image-3.png)

Ta thấy có 1 file `login.js` và bên trong có thông tin xử lí khi đăng nhập: 
![alt text](image-4.png)

Note: không để các file xử lý logic quan trọng trả về phía client
