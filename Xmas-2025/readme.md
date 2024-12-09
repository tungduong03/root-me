## 

## WEB

Bài này có source code, bạn có thể tải về và build theo hướng dẫn trong đó

Đầu tiên ta đánh hơi thấy lỗ hổng Path Traversal, và cần phải prove nó: 

![alt text](image-2.png)

Thành công với việc dùng `../` để di chuyển qua lại, ta xem đoạn code của đoạn này: 

![alt text](image-3.png)

Vậy ta thử để đọc file `flag.txt` nhưng báo lỗi nhận lại thông báo là nó ko phải 1 module: 

![alt text](image-4.png)

Quay lại với tính năng upload file, mình đã nghĩ đến việc tải lên 1 file và dùng path traversal để add lung tung nhưng không được: 

![alt text](image-5.png)

Và bây giờ kết hợp 2 tính năng lại, mình nghĩ đến việc tải lên `tmp/`  file `js` đóng vai trò là module và để đọc file flag.txt

![alt text](image-7.png)

Và truy xuất: 

![alt text](image-8.png)

Lần này tạo hàm và xuất module: 

![alt text](image-9.png)

![alt text](image-10.png)

Vậy là nó đọc được chỉ là đang sai path

![alt text](image-11.png)

![alt text](image-12.png)

Chốt hạ :

![alt text](image-13.png)

![alt text](image-14.png)

Còn đây là với server thực: 

![alt text](image.png)

Ta có flag: 

![alt text](image-1.png)


Game : 
![alt text](image-15.png)

Crypto: 

![alt text](image-16.png)