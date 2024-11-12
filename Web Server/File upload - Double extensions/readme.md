# FILE UPLOAD - DOUBLE EXTENSIONS

Challenge: http://challenge01.root-me.org/web-serveur/ch20/

Tìm hiểu về [File-Upload](file-upload.md)

![alt text](image.png)

Chọn vào phần Upload và upload thử 1 file hợp lệ lên (image)
![alt text](image-1.png)

Bây giờ nhiệm vụ như bài ra là ta cần upload file PHP và chạy nó để đọc được flag. Vào BurpSuite và xem phần vừa upload và gửi nó sang Repeater:
![alt text](image-2.png)

Sửa phần nội dung file thành code PHP và tên file thành a.php ta nhận được phản hồi là Wrong file extension! Từ đây ta biết được là server đang dùng extension để đánh giá 1 file.
![alt text](image-3.png)

Ta sửa lại để extension hợp lệ thì sẽ upload thành công:
![alt text](image-4.png)

Ở đây code php là 1 shell đơn giản lệnh xử lí qua biến cmd:
![alt text](image-5.png)

Đưa đường dẫn về root bằng Path traversal và đọc file .passwd:
![alt text](image-6.png)


Note: Ở đây server chỉ đánh giá 1 file dựa trên extension cuối cùng, nên chỉ cần thêm 1 extension cuối cùng hợp lệ là có thể đánh lừa máy chủ và server vẫn cho phép PHP engine thực thi file nên có thể chạy file PHP.

Cách khắc phục: tắt PHP engine và đánh giá tất cả các extension bằng 1 white list: jpeg, png, gif,... ngoài các extension này ra thì không hợp lệ. 

(Vì jpeg vẫn có thể chèn code PHP vào phần comment ảnh nên vẫn nên tắt PHP engine ở folder đó)