# GraphQL - Injection

http://challenge01.root-me.org:59078/

Check introspection:

![alt text](image.png)

![alt text](image-1.png)

Introspection đưa ra 2 request query và không có field nào đặc biệt.

Thử intruder brute-force `id` và không đưa ra được kết quả nào đặc biệt

Ở trường `id` ta thấy nó kiểu string không phải int nên sẽ thử tiêm SQL:

![alt text](image-2.png)

Kết quả phản hồi lâu hơi có khả năng nó đang có tác dụng

Tiếp tục với SQL ta thấy được kiểu db và câu query lỗi hiện tại

![alt text](image-3.png)

Thử với `UNION` ta được

![alt text](image-4.png)

Vậy từ đây ta sẽ khai thác theo `UNION`

Lấy version:

![alt text](image-5.png)

Lấy tất cả các table trong tất cả db: `0 UNION Select 1,2, GROUP_CONCAT(table_name SEPARATOR '|'), 3 FROM information_schema.tables`

![alt text](image-6.png)

Ở đây ta chú ý đến table `flag`

![alt text](image-7.png)

Lấy các cột trong `flag`

![alt text](image-8.png)

Nhưng `flag` lại không nằm trong db hiện tại

![alt text](image-9.png)

Ta sẽ tìm `flag` nằm trong db nào:

![alt text](image-10.png)

Lấy flag:

![alt text](image-11.png)








