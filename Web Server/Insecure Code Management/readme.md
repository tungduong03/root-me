Challenge: http://challenge01.root-me.org/web-serveur/ch61/

![alt text](image.png)

Với thông tin là về Code Manager và document hướng dẫn dẫn đến trang GIT, ta sẽ thử tìm thêm directory:
![alt text](image-1.png)

Truy cập vào: http://challenge01.root-me.org/web-serveur/ch61/.git/

![alt text](image-2.png)

![alt text](image-3.png)

![alt text](image-4.png)

![alt text](image-5.png)

Ta chú ý đến message: `changed password` và `blue team want sha256!!!!!!!!!` :
![alt text](image-6.png)

Ở lần commit này dev đã thay đổi password từ `admin` sang `s3cureP@ssw0rd`

![alt text](image-7.png)

Ở lần commit này dev đã thay đổi password sang 1 đoạn hash và thay đổi cách xác thực password từ hàm md5 thành hash, ta sẽ thử check hash của `s3cureP@ssw0rd`: 
![alt text](image-8.png)

Note: Không đưa folder .git vào folder web, khi commit nên có file .gitignore để tránh những file không mong muốn bị tải lên và bị lộ 1 số URL nhạy cảm. 






