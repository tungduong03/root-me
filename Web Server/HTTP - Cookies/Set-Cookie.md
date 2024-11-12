## Set-Cookie

Header Set-Cookie dùng để trả về cookie cho client ở HTTP response và client có thể dùng cookie đó để tiếp tục trạng thái khi sử dụng dịch vụ.

Ví dụ: Set-Cookie: cookie-name=cookie-value

### Các thuộc tính: 
- Domain <tùy chọn>: \
Xác định máy chủ nào sẽ nhận được cookie.\
Nếu set Domain thì chỉ nhận giá trị là URL hiện tại hoặc cấp cao hơn. \
Nếu không set Domain thì chỉ URL hiện tại, không có tên miền phụ được nhận cookie. \
Nếu set 1 Domain thì tất cả tên miền phụ của nó đều nhận được cookie.

- Expires=date <tùy chọn> \
Xác định thời gian cookie tồn tại \
Nếu không có thì hiểu là cookie phiên và sẽ xóa khi đóng trình duyệt.

- HttpOnly <tùy chọn> \
Ngăn javascript đọc và can thiệp cookie.

- Max-Age=number <tùy chọn> \
Chỉ định số giây đến khi cookie hết hạn, số 0 hoặc âm làm cho cookie hết hạn ngay lập tức. \
Nếu có cả Expires và Max-Age thì Max-Age được ưu tiên.

- Path=path <tùy chọn> \
Chỉ thị path được dùng cookie.

- SameSite=same-samesite-value <tùy chọn> \
Kiểm soát việc cookie có được gửi với các yêu cầu cross-site hay không. Các value:\
-- *Strict*: chỉ các yêu cầu cùng trang web mới được sử dụng cookie. Nếu từ tên miền hoặc giao thức khác thì không được chấp nhận cookie.\
-- *Lax*: cookie không được gửi trong các yêu cầu cross-site, nhưng được khi người dùng chuyển hướng đến trang gốc từ trang bên ngoài. Đây là giá trị mặc định nếu không set SameSite. \
-- *None*: Cookie được gửi với cả yêu cầu cross-site, thuộc tính Secure cũng phải được đặt.

- Secure: <tùy chọn> Chỉ định gửi cookie bằng https

- _Secure<tên cookie>: phải có thuộc tính Secure
- _Host<tên cookie>: phải có `path="/"` và không được có `domain`