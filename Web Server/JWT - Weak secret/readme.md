Challenge: https://www.root-me.org/en/Challenges/Web-Server/JWT-Weak-secret

Đầu tiên khi vào challenge: 
http://challenge01.root-me.org/web-serveur/ch59/hello

```Let's play a small game, I bet you cannot access to my super secret admin section. Make a GET request to /token and use the token you'll get to try to access /admin with a POST request.```

OK nó bảo vào path /token thì sẽ có token và vào /admin với POST để access admin.

Vào path /token: ![alt text](image.png)
```eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiZ3Vlc3QifQ.4kBPNf7Y6BrtP-Y3A-vQXPY9jAh_d0E6L4IUjL65CvmEjgdTZyr2ag-TM-glH6EYKGgO3dBYbhblaPQsbeClcw```

Decode nó: 
![alt text](image-1.png)

Tất nhiên là invalid signature. Thử lại cách của bài JWT - Introduction: thử alg:none và không thêm đoạn signature vào. Vì chưa biết POST vào parameter nào nên thử tạm:
![alt text](image-2.png)
Vậy ta sửa lại:
![alt text](image-3.png)

Vậy là chắc chắn phải dùng HS512 rồi. Ta sẽ thử tìm key:
![alt text](image-4.png)

Ở đây nó tìm ra key là ```lol```, vào jwt.io thử lại chính xác:
![alt text](image-5.png)

Vậy chỉ cần sửa thành ```admin``` và xiên thôi:
![alt text](image-6.png)