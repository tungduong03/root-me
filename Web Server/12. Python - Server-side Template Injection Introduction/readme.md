Challenge: http://challenge01.root-me.org:59074/

Tìm hiểu về Server-side Template Injection: [SSTI](SSTI.md)

Khai thác với jinja<chưa hiểu hết>: https://podalirius.net/en/publications/grehack-2021-optimizing-ssti-payloads-for-jinja2/
 
Quay lại challenge, đầu tiên thử 1 trường hợp bình thường: 
![alt text](image-1.png)
Đầu ra: 

![alt text](image-2.png)

Tiếp theo ta cần detect xem nó bị SSTI ở title hay content: 
![alt text](image-3.png)
Kết quả: 

![alt text](image-4.png)

Vậy ở đây `content` đang bị SSTI

![alt text](image-5.png)

![alt text](image-6.png)

![alt text](image-7.png)

![alt text](image-8.png)

![alt text](image-9.png)

![alt text](image-10.png)