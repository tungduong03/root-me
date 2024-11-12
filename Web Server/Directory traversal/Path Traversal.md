Bài viết: https://portswigger.net/web-security/file-path-traversal


### What is path traversal?

Directory traversal hay path traversal là lỗ hổng cho phép kẻ tấn công đọc các tệp tùy ý trên máy chủ đang chạy ứng dụng như: 
- Code và data phía back end
- Thông tin xác thực
- Các file hệ thống

Trong một số trường hợp, kẻ tấn công có thể ghi vào các tệp tùy ý trên server, cho phép sửa đổi dữ liệu hoặc hành vi của ứng dụng và cuối cùng chiếm toàn quyền kiểm soát server.

### Đọc các file tùy ý qua đường dẫn

Gỉa sử hình ảnh được hiển thị: \
```<img src="/loadImage?filename=218.png">```

URL loadImage lấy tham số `filename` và trả về nội dung của tệp được chỉ định. Các tập tin hình ảnh được lưu trữ ở vị trí ```/var/www/images/```. Để trả về một hình ảnh, ứng dụng sẽ thêm tên tệp được yêu cầu vào 1 đường dẫn có sẵn và sử dụng API hệ thống tệp để đọc nội dung của tệp. Nói cách khác, ứng dụng đọc từ đường dẫn:
`/var/www/images/218.png`

Web này không thực hiện biện pháp phòng vệ nào trước các cuộc tấn công directory traversal. Do đó, kẻ tấn công có thể yêu cầu URL sau để truy xuất tệp `/etc/passwd` từ hệ thống tệp của máy chủ bằng input: \
`https://insecure-website.com/loadImage?filename=../../../etc/passwd`

Input này khiến ứng dụng đọc từ đường dẫn tệp sau:
`/var/www/images/../../../etc/passwd`

Kí tự `../` trong đường dẫn tệp có nghĩa là tăng lên một cấp trong cấu trúc thư mục. 3 chuỗi `../` liên tiếp tăng dần từ `/var/www/images/` đến thư mục gốc của hệ thống tệp và do đó, tệp thực sự được đọc là: \
`/etc/passwd`

Trên các hệ điều hành dựa trên Unix, `/etc/passwd` là tệp tiêu chuẩn chứa thông tin chi tiết về người dùng đã đăng ký trên máy chủ, nhưng kẻ tấn công có thể truy xuất các tệp tùy ý khác bằng kỹ thuật tương tự. Trên Windows, cả `../` và `..\` đều là các chuỗi truyền tải thư mục hợp lệ. Sau đây là ví dụ về một cuộc tấn công tương đương nhằm vào máy chủ chạy Windows: \
`https://insecure-website.com/loadImage?filename=..\..\..\windows\win.ini`

### Những trở ngại chung khi khai thác các lỗ hổng truyền tải đường dẫn

Nhiều web khi cho input vào đường dẫn sẽ triển khai các biện pháp bảo vệ chống lại path traversal. \
Nếu một ứng dụng loại bỏ hoặc chặn các chuỗi di chuyển thư mục khỏi tên tệp do người dùng cung cấp, thì có thể vượt qua lớp bảo vệ bằng nhiều kỹ thuật khác nhau. \
- Có thể sử dụng đường dẫn **tuyệt đối** từ thư mục gốc của hệ thống tệp, chẳng hạn như `filename=/etc/passwd`, để tham chiếu trực tiếp đến tệp mà không cần sử dụng bất kỳ kí tự truyền tải (`../`) nào.
- Có thể sử dụng các chuỗi truyền tải lồng nhau, chẳng hạn như `....//` hoặc `....\/`. Để nếu logic web là loại bỏ chuỗi `../` thì sau khi loại bỏ nó sẽ về chuỗi mình mong muốn.

Trong một số ngữ cảnh, chẳng hạn như trong đường dẫn URL hoặc tham số tên tệp của yêu cầu nhiều phần/dữ liệu biểu mẫu, máy chủ web có thể loại bỏ mọi trình tự truyền tải thư mục trước khi chuyển dữ liệu đầu vào của bạn đến ứng dụng. Đôi khi, bạn có thể bỏ qua kiểu dọn dẹp này bằng cách mã hóa URL hoặc thậm chí mã hóa URL kép, các ký tự `../` mã hóa URL `%2e%2e%2f` và mã hóa URL kép `%252e%252e%252f`. Các mã hóa không chuẩn khác nhau, chẳng hạn như `..%c0%af` hoặc `..%ef%bc%8f`, cũng có thể hoạt động.

Một ứng dụng có thể yêu cầu tên tệp do người dùng cung cấp để bắt đầu bằng thư mục cơ sở dự kiến, chẳng hạn như `/var/www/images`. Trong trường hợp này, có thể bao gồm thư mục cơ sở cần thiết theo sau là các trình tự duyệt phù hợp. Ví dụ: `filename=/var/www/images/../../../etc/passwd`.

Ứng dụng có thể yêu cầu tên tệp do người dùng cung cấp phải kết thúc bằng phần mở rộng tệp dự kiến, chẳng hạn như `.png`. Trong trường hợp này, có thể sử dụng null byte để chấm dứt đường dẫn tệp trước phần mở rộng được yêu cầu. Ví dụ:  `filename=../../../etc/passwd%00.png` hệ thống sẽ hiểu đường dẫn là `../../../etc/passwd`

### How to prevent a path traversal attack

Cách hiệu quả nhất để ngăn chặn lỗ hổng path traversal là tránh chuyển hoàn toàn dữ liệu đầu vào do người dùng cung cấp tới API hệ thống tệp.

Dưới đây là ví dụ về một số mã Java đơn giản để xác thực đường dẫn chuẩn của tệp dựa trên đầu vào của người dùng:
```
File file = new File(BASE_DIRECTORY, userInput);
if (file.getCanonicalPath().startsWith(BASE_DIRECTORY)) {
    // process file
}
```