Challenge: https://www.root-me.org/en/Challenges/Web-Server/JWT-Introduction

Đầu tiên về bài này ta sẽ tìm hiểu về JWT trước.

JWT (JSON Web Token) là một chuẩn mở (RFC 7519) định nghĩa một cách nhỏ gọn và khép kín để truyền một cách an toàn thông tin giữa các bên dưới dạng đối tượng JSON.

Ví dụ về JWT: ```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEzODY4OTkxMzEsImlzcyI6ImppcmE6MTU0ODk1OTUiLCJxc2giOiI4MDYzZmY0Y2ExZTQxZGY3YmM5MGM4YWI2ZDBmNjIwN2Q0OTFjZjZkYWQ3YzY2ZWE3OTdiNDYxNGI3MTkyMmU5IiwiaWF0IjoxMzg2ODk4OTUxfQ.uKqU9dTB6gKwG6jQCuXYAiMNdfNRw98Hw_IWuA5MaMo```

JWT được tách thành 3 phần bởi 2 dấu ```.``` 3 phần lần lượt là:
<base64-encoded(header)>.<base64-encoded(payload)>.<base64-encoded(signature)>

Truy cập trang jwt.io ta có thể có cái nhìn rõ ràng hơn:
![alt text](image.png)

Ở phần header: thường có 2 key:value là typ và alg. Với typ là JWT và alg là thuật toán mã hóa phần signature bên dưới, có rất nhiều thuật toán để mã hóa.

Ở phần payload: là các thông tin ở dạng JSON.

Ở phần signature: là phần hash với đầu vào là (base64encode<header>+"."+base64encode<payload>, key), phần signature đóng vai trò kiểm tra tính toàn vẹn của dữ liệu.

Quay lại challenge: http://challenge01.root-me.org/web-serveur/ch58/
![alt text](image-2.png)

Đầu tiên ta sẽ test thử với guest. Sau khi đăng nhập với guest ta thấy BurpSuite có:
![alt text](image-3.png)

Với jwt: ```eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imd1ZXN0In0.OnuZnYMdetcg7AWGV6WURn8CFSfas6AQej4V9M13nsk``` 
ném vào jwt.io ta có: ![alt text](image-4.png)
Nó decode ra cho ta phần header và payload nhưng nó báo invalid signature, ở đây là do có secret key nhưng ta không biết nên không xác thực được. 
Vậy nên bước 1 thử đoán key là gì, dùng hashcat:
![alt text](image-5.png)

Với wordlist khá nhiều key nhưng mà không thể tìm ra key. Với tiêu đề là introduce thì chắc cũng khó như này. Sau mấy tiếng đi dò lung tung thì thay alg thành none và không thêm phần signature nữa lại ra kết quả. 


Note: Không được để alg:none thì sẽ không check key, và không để key quá dễ đoán. 
