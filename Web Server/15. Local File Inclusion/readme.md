Challenge: http://challenge01.root-me.org/web-serveur/ch16/

Với gợi ý tìm admin section.

Đầu tiên truy cập trang: 
![alt text](image.png)

Ta thấy ta có thể truy cập các section bằng parameter `files`

Nhưng ở đây không thấy có sự xuất hiện section `admin`.

Xem thử có section `admin` hay còn section nào khác trong folder hiện tại không:

![alt text](image-1.png)
![alt text](image-2.png)

Vậy là trong folder này không có admin, thử truy cập admin:
![alt text](image-3.png)

![alt text](image-4.png)

Nó sẽ bắt đăng nhập và khi ấn Hủy bỏ, ta có được path đến admin:
![alt text](image-5.png)

Vậy là nó nằm ở `http://challenge01.root-me.org/web-serveur/ch16/admin/`

Vậy thì từ path này, ta cần lùi 1 folder để vào admin:
![alt text](image-6.png)

Ta sẽ thử input: `../admin`
![alt text](image-7.png)

Vậy là ta đã vào được `admin` và xem `index.php`:
![alt text](image-8.png)

[Code](index.php) file `index.php`, code này chỉ xử lí phần đăng nhập, không xử phần hiển thị file.

Đến đây thì ta đã có thể đăng nhâp bằng admin: 
![alt text](image-10.png)

