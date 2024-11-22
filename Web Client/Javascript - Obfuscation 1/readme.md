Challenge: http://challenge01.root-me.org/web-client/ch4/ch4.html


Sau khi vào trang web thì hiển thị 1 bảng bắt đăng nhập: 
![alt text](image.png)

Và nếu ấn Hủy hay nhập sai mật khẩu thì sẽ hiện: 
![alt text](image-1.png)

Kiểm tra Burp Suite ta thấy: 
![alt text](image-2.png)

Ở đây password đã bị URL encode, ta chỉ cần decode nó ra: 
![alt text](image-3.png)

Thử đăng nhập lại: 
![alt text](image-4.png)

