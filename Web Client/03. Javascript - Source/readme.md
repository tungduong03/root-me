Challenge: http://challenge01.root-me.org/web-client/ch1/

Khi bắt đầu vào trang web đã hiện ra 1 pop-up yêu cầu đăng nhập: 
![alt text](image.png)

Đăng nhập thử với pass bất kì: `admin` nó trả về :
![alt text](image-1.png)

Ở Burp Suite ta bắt được gói tin: 
![alt text](image-2.png)

Trong này có function login và ta có được đoạn string để so sánh với pass, ta sẽ thử đăng nhập lại: 
![alt text](image-3.png)

Note: Không xử lí các logic quan trọng ở phía client