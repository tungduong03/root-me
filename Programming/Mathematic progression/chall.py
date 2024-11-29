import requests
import re
import time

# URL chứa bài toán
url = "http://challenge01.root-me.org/programmation/ch1/"

# Hàm để xử lý và gửi yêu cầu GET
def process_request():

    start_time = time.time()
    # Gửi yêu cầu GET để lấy nội dung HTML
    response = requests.get(url)
    html_content = response.text
    
    print(html_content)
    # Trích xuất công thức U<sub>n+1</sub> = [ 28 + U<sub>n</sub> ] [+-] [ n * -16 ]
    pattern_formula = r"U<sub>n[+-]1</sub> = \[ (-?\d+) \+ U<sub>n</sub> \] ([+-]) \[ n \* (-?\d+) \]"
    match_formula = re.search(pattern_formula, html_content)

    if match_formula:
        # Trích xuất các giá trị từ công thức
        first_number = int(match_formula.group(1))  # Giá trị đầu tiên (28 hoặc số khác)
        operator = match_formula.group(2)          # Dấu (+ hoặc -)
        second_number = int(match_formula.group(3)) # Giá trị thứ hai (-16 hoặc số khác)
    else:
        print("Không tìm thấy công thức trong nội dung.")
        return

    # Trích xuất giá trị U<sub>0</sub> = 972
    pattern_U0 = r"U<sub>0</sub> = (-?\d+)"
    match_U0 = re.search(pattern_U0, html_content)

    if match_U0:
        # Trích xuất giá trị U<sub>0</sub>
        U0_value = int(match_U0.group(1))  # Giá trị U0
    else:
        print("Không tìm thấy giá trị U<sub>0</sub> trong nội dung.")
        return

    # Trích xuất giá trị "You must find U<sub>973973</sub>"
    pattern_U_find = r"You must find U<sub>(\d+)</sub>"
    match_U_find = re.search(pattern_U_find, html_content)

    if match_U_find:
        # Trích xuất giá trị U<sub>973973</sub>
        value_to_find = int(match_U_find.group(1))  # Giá trị 973973
    else:
        print("Không tìm thấy giá trị 'You must find U<sub>...</sub>' trong nội dung.")
        return

    # Tính toán công thức
    if operator == '+':
        result = (first_number * value_to_find) + ((second_number * value_to_find) * (value_to_find - 1) / 2) + U0_value
    elif operator == '-':
        result = (first_number * value_to_find) - ((second_number * value_to_find) * (value_to_find - 1) / 2) + U0_value

    result = int(result)
    
    # Gửi yêu cầu GET với tham số result
    request_url = f"http://challenge01.root-me.org/programmation/ch1/ep1_v.php?result={result}"
    
    # Gửi yêu cầu GET và in phản hồi
    response = requests.get(request_url)
    print(time.time()-start_time)
    # In nội dung phản hồi từ yêu cầu GET
    print(f"Request URL: {request_url}")
    print(f"Response: {response.text}")

while True:
    process_request()  # Gọi hàm xử lý yêu cầu
