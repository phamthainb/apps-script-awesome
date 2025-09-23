# Text Manipulation | Thao tác Văn bản

Common text manipulation formulas for AppSheet applications.

*Các công thức thao tác văn bản thông dụng cho ứng dụng AppSheet.*

## String Concatenation | Nối chuỗi

### Basic Concatenation | Nối cơ bản

```appsheet
CONCATENATE([First_Name], " ", [Last_Name])
```

### Multiple Fields | Nhiều trường

```appsheet
CONCATENATE([First_Name], " ", [Last_Name], " - ", [Department])
```

### With Conditional Parts | Với phần điều kiện

```appsheet
CONCATENATE(
  [First_Name],
  " ",
  [Last_Name],
  IF(ISBLANK([Middle_Name]), "", CONCATENATE(" ", [Middle_Name]))
)
```

## Text Formatting | Định dạng văn bản

### Proper Case | Viết hoa đầu từ

```appsheet
PROPER(LOWER([Name]))
```

### Clean Text | Làm sạch văn bản

```appsheet
TRIM(SUBSTITUTE([Text], "  ", " "))
```

### Remove Special Characters | Xóa ký tự đặc biệt

```appsheet
REGEX([Text], "[^a-zA-Z0-9\s]", "", "g")
```

## Text Extraction | Trích xuất văn bản

### First Name from Full Name | Tên từ họ tên đầy đủ

```appsheet
LEFT([Full_Name], FIND(" ", [Full_Name]) - 1)
```

### Last Name from Full Name | Họ từ họ tên đầy đủ

```appsheet
RIGHT([Full_Name], LEN([Full_Name]) - FIND(" ", [Full_Name]))
```

### Extract Domain from Email | Trích xuất tên miền từ email

```appsheet
RIGHT([Email], LEN([Email]) - FIND("@", [Email]))
```

### Extract Phone Area Code | Trích xuất mã vùng điện thoại

```appsheet
IF(
  REGEX([Phone], "^\+84"),
  "+84",
  IF(
    REGEX([Phone], "^0"),
    LEFT([Phone], 4),
    ""
  )
)
```

## Text Replacement | Thay thế văn bản

### Replace Characters | Thay thế ký tự

```appsheet
SUBSTITUTE([Text], "old_text", "new_text")
```

### Multiple Replacements | Thay thế nhiều

```appsheet
SUBSTITUTE(
  SUBSTITUTE(
    SUBSTITUTE([Text], "á", "a"),
    "à", "a"
  ),
  "ả", "a"
)
```

### Remove Vietnamese Accents | Xóa dấu tiếng Việt

```appsheet
SUBSTITUTE(
  SUBSTITUTE(
    SUBSTITUTE(
      SUBSTITUTE(
        SUBSTITUTE([Text], "á", "a"),
        "à", "a"
      ),
      "ả", "a"
    ),
    "ã", "a"
  ),
  "ạ", "a"
)
```

## Text Validation | Xác thực văn bản

### Check if Text Contains | Kiểm tra văn bản chứa

```appsheet
FIND("search_text", UPPER([Text])) > 0
```

### Word Count | Đếm từ

```appsheet
LEN([Text]) - LEN(SUBSTITUTE([Text], " ", "")) + 1
```

### Character Count without Spaces | Đếm ký tự không có khoảng trắng

```appsheet
LEN(SUBSTITUTE([Text], " ", ""))
```

## Advanced Text Operations | Thao tác văn bản nâng cao

### Generate Initials | Tạo chữ cái đầu

```appsheet
CONCATENATE(
  LEFT([First_Name], 1),
  LEFT([Last_Name], 1)
)
```

### Format Phone Number | Định dạng số điện thoại

```appsheet
IF(
  LEN([Phone]) = 10,
  CONCATENATE(
    "(",
    LEFT([Phone], 3),
    ") ",
    MID([Phone], 4, 3),
    "-",
    RIGHT([Phone], 4)
  ),
  [Phone]
)
```

### Create Slug from Text | Tạo slug từ văn bản

```appsheet
LOWER(
  SUBSTITUTE(
    SUBSTITUTE(
      TRIM([Title]),
      " ", "-"
    ),
    "--", "-"
  )
)
```

## Vietnamese-Specific Functions | Hàm đặc thù tiếng Việt

### Vietnamese Name Formatting | Định dạng tên tiếng Việt

```appsheet
PROPER(
  SUBSTITUTE(
    SUBSTITUTE(
      SUBSTITUTE([Name], "  ", " "),
      " Và ", " và "
    ),
    " Của ", " của "
  )
)
```

### Vietnamese Address Formatting | Định dạng địa chỉ tiếng Việt

```appsheet
CONCATENATE(
  [Street_Address],
  ", ",
  [Ward],
  ", ",
  [District],
  ", ",
  [City]
)
```

## Related Scripts | Scripts liên quan

- [Date Calculations](./date-calculations.md)
- [Conditional Logic](./conditional-logic.md)
- [Data Validation](../data-validation/README.md)