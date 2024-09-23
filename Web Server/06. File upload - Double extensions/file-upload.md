File upload thường gồm 2 việc: cho người dùng upload file và hiển thị file cho người dùng. Cả 2 công việc này đều có thể bị tấn công.

### Đầu tiên với đoạn mã upload file đơn giản: 
```
<form name="upload" action="upload1.php" method="POST" ENCTYPE="multipart/formdata">
Select the file to upload: <input type="file" name="userfile">
<input type="submit" name="upload" value="upload">
</form>
```

Đoạn mã này cho người dùng upload lên mọi file mà ko có sự ngăn chặn nào. 

### Content-type verification
```
<?php
if($_FILES['userfile']['type'] != "image/gif") {
    echo "Sorry, we only allow uploading GIF images";
    exit;
}
$uploaddir = 'uploads/';
$uploadfile = $uploaddir . basename($_FILES['userfile']['name']);
if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
    echo "File is valid, and was successfully uploaded.\n";
} else {
    echo "File uploading failed.\n";
}
?>
```
Trong trường hợp này, nếu kẻ tấn công chỉ cố tải shell.php lên, ứng dụng sẽ kiểm tra loại MIME trong yêu cầu tải lên và từ chối tệp:
#### Request
POST /upload2.php HTTP/1.1 \
TE: deflate,gzip;q=0.3 \
Connection: TE, close \
Host: localhost \
User-Agent: libwww-perl/5.803 \
Content-Type: multipart/form-data; boundary=xYzZY \
Content-Length: 156 \
--xYzZY \
Content-Disposition: form-data; name="userfile"; filename="shell.php" \
<mark>Content-Type: text/plain</mark>
```
<?php 
system($_GET['command']);
?>
```
--xYzZY--

#### Response:

HTTP/1.1 200 OK  \
Date: Thu, 31 May 2007 13:54:01 GMT \
Server: Apache \
X-Powered-By: PHP/4.4.4-pl6-gentoo \
Content-Length: 41 \
Connection: close \
Content-Type: text/html 

Sorry, we only allow uploading GIF images

Tuy nhiên với cách này, chỉ cần chỉnh sửa gói tin, sửa phần Content-Type: text/plain thành "image/gif" và sau đó gửi gói tin thì code sẽ nhận diện file upload là image/gif và cho vượt qua. 

### Image file content verification
Thay vì tin tưởng vào `Content-Type`, dev PHP có thể quyết định xác thực nội dung thực tế của tệp đã tải lên để đảm bảo rằng đó thực sự là một hình ảnh. Hàm getimagesize() của PHP thường được sử dụng cho việc đó. getimagesize() lấy tên tệp làm đối số và trả về kích thước cũng như loại hình ảnh. 

```
<?php
$imageinfo = getimagesize($_FILES['userfile']['tmp_name']);
if($imageinfo['mime'] != 'image/gif' && $imageinfo['mime'] != 'image/jpeg') {
    echo "Sorry, we only accept GIF and JPEG images\n";
    exit;
}
$uploaddir = 'uploads/';
$uploadfile = $uploaddir . basename($_FILES['userfile']['name']);
if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
    echo "File is valid, and was successfully uploaded.\n";
} else {
    echo "File uploading failed.\n";
}
?>
```

Bây giờ, nếu kẻ tấn công tải lên shell.php ngay cả khi đặt Content-type thành "image/gif", upload3.php sẽ không chấp nhận nó nữa.

Nhưng nó vẫn chưa an toàn. Với 1 file GIF hay JPEG thì có thể thêm thông tin vào phần Comment của ảnh, phần này khi chèn mã PHP thì nó sẽ không phát hiện được vẫn nhận diện là 1 file image nhưng khi PHP engine đọc file thì nó sẽ bỏ qua những đoạn nhị phân của ảnh mà đọc được mã code PHP nên sẽ thực thi nó. 1 GIF hay JPEG như vậy có thể sửa đổi phần comment bằng Gimp.

### File name extension verification
```
<?php
$blacklist = array(".php", ".phtml", ".php3", ".php4");
foreach ($blacklist as $item) {
    if(preg_match("/$item\$/i", $_FILES['userfile']['name'])) {
        echo "We do not allow uploading PHP files\n";
        exit;
    }
}
$uploaddir = 'uploads/';
$uploadfile = $uploaddir . basename($_FILES['userfile']['name']);
if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
    echo "File is valid, and was successfully uploaded.\n";
} else {
    echo "File uploading failed.\n";
}
?>
```
Đoạn `preg_match("/$item\$/i", $_FILES['userfile']['name'])` để kiểm tra tên tệp upload với black list. Công cụ "i" làm cho biểu thức chính quy không phân biệt chữ hoa chữ thường. Nếu tên tệp khớp với một trong các mục trong black list thì tệp sẽ không được tải lên.

Đối với cách này, cần chú ý đến các extension được PHP dịch và cập nhật thường xuyên các extension mới mà PHP có thể thực thi. 

### Indirect access to the uploaded files
Để người dùng có thể xem file tải lên, cần tạo ra chức năng view. Để an toàn, có thể lưu file upload ở ngoài root của web để không có engine nào thực thi nhưng nó lại dẫn đến 1 lỗ hổng khác là directory traversal.
```
<?php
$uploaddir = '/var/spool/uploads/';
$name = $_GET['name'];
readfile($uploaddir.$name);
?>
```
Code trên gặp phải lỗ hổng directory traversal. Người dùng độc hại có thể sử dụng tập lệnh này để đọc bất kỳ tệp nào có thể đọc được trong quá trình máy chủ web. Ví dụ: truy cập view5.php dưới dạng http://www.example.com/view5.php?name=../../../etc/passwd rất có thể sẽ trả về nội dung của /etc/passwd

### Local file inclusion attacks
```
<?php
# ... some code here
if(isset($_COOKIE['lang'])) {
 $lang = $_COOKIE['lang'];
} elseif (isset($_GET['lang'])) {
 $lang = $_GET['lang'];
} else {
 $lang = 'english';
}
include("language/$lang.php");
# ... some more code here
?>
```

Code này có lỗ hổng Local file inclusion. Kẻ tấn công có thể làm cho trang này include bất kỳ tệp nào trên hệ thống tệp có phần mở rộng .php

Nếu kẻ tấn công có thể tải tệp lên, ngay cả bên ngoài web root và hắn biết tên cũng như vị trí của tệp đã tải lên, bằng cách đưa vào tệp đã tải lên của mình, hắn có thể chạy mã tùy ý trên máy chủ.

### Reference implementation
Giải pháp cho vấn đề trên là ngăn chặn kẻ tấn công biết tên của tệp. Điều này có thể được thực hiện bằng cách tạo ngẫu nhiên tên tệp và theo dõi chúng trong cơ sở dữ liệu. 

***File upload (upload6.php)***
```
<?php
require_once 'DB.php'; # We are using PEAR::DB module
$uploaddir = '/var/spool/uploads/'; # Outside of web root
$uploadfile = tempnam($uploaddir, "upload_");
if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
    # Saving information about this file in the DB
    $db =& DB::connect("mysql://username:password@localhost/database");
    if(PEAR::isError($db)) {
        unlink($uploadfile);
        die "Error connecting to the database";
    }
    $res = $db->query("INSERT INTO uploads SET name=?, original_name=?, mime_type=?",
                array(basename($uploadfile, basename($_FILES['userfile']['name']),
                    $_FILES['userfile']['type']));
    if(PEAR::isError($res)) {
        unlink($uploadfile);
        die "Error saving data to the database. The file was not uploaded";
    }
    $id = $db->getOne('SELECT LAST_INSERT_ID() FROM uploads'); # MySQL specific
    echo "File is valid, and was successfully uploaded. You can view it <a href=\"view6.php?id=$id\">here</a>\n";
} else {
    echo "File uploading failed.\n";
}
?>
```

***Viewing uploaded file (view6.php)***
```
<?php
require_once 'DB.php';
$uploaddir = '/var/spool/uploads/';
$id = $_GET['id'];
if(!is_numeric($id)) {
    die("File id must be numeric");
}
$db =& DB::connect("mysql://root@localhost/db");
if(PEAR::isError($db)) {
    die("Error connecting to the database");
}
$file = $db->getRow('SELECT name, mime_type FROM uploads WHERE id=?',
array($id), DB_FETCHMODE_ASSOC);
if(PEAR::isError($file)) {
    die("Error fetching data from the database");
}
if(is_null($file) || count($file)==0) {
    die("File not found");
}
header("Content-Type: " . $file['mime_type']);
readfile($uploaddir.$file['name']);
?>
``` 

Bây giờ các tệp đã tải lên không thể được yêu cầu và thực thi trực tiếp (vì chúng được lưu trữ bên ngoài thư mục gốc web). Chúng không thể được sử dụng trong các cuộc tấn công bao gồm tệp cục bộ, vì kẻ tấn công không có cách nào để biết tên tệp được sử dụng trên hệ thống tệp. Phần xem tệp khắc phục vấn đề directory traversal, vì các tệp được tham chiếu bằng chỉ số số trong cơ sở dữ liệu, không phải bất kỳ phần nào của tên tệp. 

### Các vấn đề khác

Kiểm soát truy cập (Access Control): Trong tất cả các ví dụ trên, giả định rằng bất kỳ ai cũng có thể xem bất kỳ tệp tải lên nào. Một số ứng dụng có thể yêu cầu chỉ người dùng đã tải lên tệp mới có thể xem nó. Trong trường hợp này, bảng tải lên nên chứa thông tin về quyền sở hữu của tệp và kịch bản xem cần kiểm tra xem người dùng yêu cầu tệp có phải là chủ sở hữu của nó hay không.

### Kết Luận

Biện pháp bảo vệ quan trọng nhất là giữ các tệp đã tải lên ở nơi chúng không thể được truy cập trực tiếp bởi người dùng thông qua một URL trực tiếp. Điều này có thể được thực hiện bằng cách lưu trữ các tệp đã tải lên bên ngoài thư mục gốc web hoặc cấu hình máy chủ web để từ chối truy cập vào thư mục tải lên.

Một biện pháp bảo mật quan trọng khác là sử dụng tên tệp được hệ thống tạo ra thay vì các tên do người dùng cung cấp khi lưu trữ tệp trên hệ thống tệp. Điều này sẽ ngăn chặn các cuộc tấn công bao gồm tệp cục bộ và cũng làm cho bất kỳ loại thao tác tên tệp nào bởi người dùng trở nên không thể thực hiện.

Kiểm tra xem tệp có phải là một hình ảnh hay không là không đủ để đảm bảo rằng nó không phải là một tập lệnh PHP. Như tôi đã chỉ ra, có thể tạo ra các tệp vừa là hình ảnh vừa là tập lệnh PHP cùng một lúc.

Kiểm tra phần mở rộng tên tệp của các tệp đã tải lên không cung cấp bảo mật tuyệt đối, đặc biệt đối với các ứng dụng có thể triển khai trên nhiều nền tảng và cấu hình máy chủ khác nhau.

