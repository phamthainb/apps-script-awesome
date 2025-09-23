# Vietnamese Business Formulas | Công thức Kinh doanh Việt Nam

Specialized formulas for Vietnamese business contexts and requirements.

*Các công thức chuyên biệt cho bối cảnh và yêu cầu kinh doanh Việt Nam.*

## Tax Calculations | Tính toán Thuế

### VAT Calculation | Tính thuế VAT

```appsheet
[Amount] * 0.1
```

### Total with VAT | Tổng có VAT

```appsheet
[Amount] * 1.1
```

### Amount before VAT | Số tiền trước VAT

```appsheet
[Total_Amount] / 1.1
```

## Vietnamese Currency | Tiền tệ Việt Nam

### Format Currency VND | Định dạng tiền VND

```appsheet
CONCATENATE(TEXT([Amount], "#,##0"), " VND")
```

### Currency in Words (simplified) | Tiền bằng chữ (đơn giản)

```appsheet
SWITCH(
  [Amount],
  1000, "Một nghìn",
  2000, "Hai nghìn", 
  5000, "Năm nghìn",
  10000, "Mười nghìn",
  20000, "Hai mười nghìn",
  50000, "Năm mười nghìn",
  100000, "Một trăm nghìn",
  200000, "Hai trăm nghìn",
  500000, "Năm trăm nghìn",
  1000000, "Một triệu",
  TEXT([Amount], "#,##0") & " VND"
)
```

## Vietnamese Address | Địa chỉ Việt Nam

### Full Address Format | Định dạng Địa chỉ đầy đủ

```appsheet
CONCATENATE(
  [House_Number], " ",
  [Street], ", ",
  [Ward], ", ",
  [District], ", ",
  [City]
)
```

### Standardized Address | Địa chỉ chuẩn hóa

```appsheet
CONCATENATE(
  [House_Number], " ",
  PROPER([Street]), ", ",
  "Phường ", PROPER([Ward]), ", ",
  "Quận ", PROPER([District]), ", ",
  "TP. ", PROPER([City])
)
```

## Vietnamese Names | Tên Việt Nam

### Name Formatting | Định dạng Tên

```appsheet
PROPER(TRIM([Full_Name]))
```

### Extract Family Name | Trích xuất Họ

```appsheet
LEFT([Full_Name], FIND(" ", [Full_Name]) - 1)
```

### Extract Given Name | Trích xuất Tên

```appsheet
RIGHT([Full_Name], LEN([Full_Name]) - FINDLAST(" ", [Full_Name]))
```

### Extract Middle Name | Trích xuất Tên đệm

```appsheet
IF(
  LEN([Full_Name]) - LEN(SUBSTITUTE([Full_Name], " ", "")) > 1,
  MID([Full_Name], 
      FIND(" ", [Full_Name]) + 1,
      FINDLAST(" ", [Full_Name]) - FIND(" ", [Full_Name]) - 1
  ),
  ""
)
```

## Business Hours | Giờ làm việc

### Vietnam Business Hours Check | Kiểm tra Giờ làm việc VN

```appsheet
AND(
  WEEKDAY(NOW()) >= 2,  // Monday
  WEEKDAY(NOW()) <= 6,  // Friday
  HOUR(NOW()) >= 8,     // 8 AM
  HOUR(NOW()) <= 17     // 5 PM
)
```

### Extended Business Hours | Giờ làm việc mở rộng

```appsheet
OR(
  // Weekdays 8 AM - 8 PM
  AND(
    WEEKDAY(NOW()) >= 2, WEEKDAY(NOW()) <= 6,
    HOUR(NOW()) >= 8, HOUR(NOW()) <= 20
  ),
  // Saturday 8 AM - 12 PM
  AND(
    WEEKDAY(NOW()) = 7,
    HOUR(NOW()) >= 8, HOUR(NOW()) <= 12
  )
)
```

## Vietnamese Calendar | Lịch Việt Nam

### Vietnam Timezone | Múi giờ Việt Nam

```appsheet
NOW() + TIME(7, 0, 0)  // GMT+7
```

### Major Vietnamese Holidays | Ngày lễ lớn Việt Nam

```appsheet
OR(
  // New Year's Day
  AND(MONTH([Date]) = 1, DAY([Date]) = 1),
  // Liberation Day  
  AND(MONTH([Date]) = 4, DAY([Date]) = 30),
  // Labor Day
  AND(MONTH([Date]) = 5, DAY([Date]) = 1),
  // National Day
  AND(MONTH([Date]) = 9, DAY([Date]) = 2)
  // Note: Tet holidays vary by lunar calendar
)
```

## Document Numbers | Số chứng từ

### Invoice Number Format | Định dạng số hóa đơn

```appsheet
CONCATENATE("HD", TEXT(YEAR(TODAY()), "0000"), TEXT(MONTH(TODAY()), "00"), TEXT([Invoice_Sequence], "000000"))
```

### Contract Number Format | Định dạng số hợp đồng

```appsheet
CONCATENATE("HD-", TEXT(YEAR(TODAY()), "0000"), "-", TEXT([Contract_Sequence], "0000"))
```

### Receipt Number Format | Định dạng số phiếu thu

```appsheet
CONCATENATE("PT", TEXT(TODAY(), "yyyyMMdd"), "-", TEXT([Receipt_Sequence], "000"))
```

## Business Calculations | Tính toán Kinh doanh

### Working Days Calculation | Tính ngày làm việc

```appsheet
// Approximate working days between two dates
INT(([End_Date] - [Start_Date]) * 5/7)
```

### Age in Years | Tuổi theo năm

```appsheet
INT((TODAY() - [Birth_Date]) / 365.25)
```

### Years of Service | Số năm công tác

```appsheet
INT((TODAY() - [Hire_Date]) / 365.25)
```

## Data Classification | Phân loại Dữ liệu

### Priority Levels | Mức độ Ưu tiên

```appsheet
SWITCH(
  [Priority_Number],
  1, "Rất cao",
  2, "Cao", 
  3, "Trung bình",
  4, "Thấp",
  5, "Rất thấp",
  "Không xác định"
)
```

### Department Codes | Mã phòng ban

```appsheet
SWITCH(
  [Department],
  "Kế toán", "KT",
  "Nhân sự", "NS", 
  "Kinh doanh", "KD",
  "Kỹ thuật", "KT",
  "Marketing", "MKT",
  "Hành chính", "HC",
  "UNKNOWN"
)
```

## Validation Helpers | Hỗ trợ Xác thực

### Vietnamese ID Card Check | Kiểm tra CMND/CCCD

```appsheet
OR(
  // Old ID format (9 digits)
  REGEX([ID_Number], "^[0-9]{9}$"),
  // New ID format (12 digits)  
  REGEX([ID_Number], "^[0-9]{12}$")
)
```

### Tax Code Check | Kiểm tra mã số thuế

```appsheet
REGEX([Tax_Code], "^[0-9]{10}(-[0-9]{3})?$")
```

### Bank Account Check | Kiểm tra số tài khoản

```appsheet
AND(
  LEN([Bank_Account]) >= 8,
  LEN([Bank_Account]) <= 19,
  ISNUMBER(VALUE([Bank_Account]))
)
```

## Related Scripts | Scripts liên quan

- [Phone Number Validation](../data-validation/phone-validation.md)
- [Text Manipulation](./text-manipulation.md)
- [Date Calculations](./date-calculations.md)