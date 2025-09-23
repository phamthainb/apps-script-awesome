# Date Range Validation | Xác thực Phạm vi Ngày

Validates that dates fall within acceptable ranges and meet business requirements.

*Xác thực rằng ngày nằm trong phạm vi chấp nhận được và đáp ứng yêu cầu kinh doanh.*

## Basic Date Range | Phạm vi Ngày cơ bản

Check if date is within a specific range:

```appsheet
AND([Date] >= DATE(2024, 1, 1), [Date] <= DATE(2024, 12, 31))
```

## Future Date Only | Chỉ Ngày tương lai

Ensure date is in the future:

```appsheet
[Date] > TODAY()
```

## Business Days Only | Chỉ Ngày làm việc

Validate weekdays only (Monday-Friday):

```appsheet
AND(WEEKDAY([Date]) >= 2, WEEKDAY([Date]) <= 6)
```

## Age Validation | Xác thực Tuổi

Validate minimum age (18+ years):

```appsheet
[Birth_Date] <= (TODAY() - 365.25 * 18)
```

## Advanced Examples | Ví dụ Nâng cao

### Working Hours Validation | Xác thực Giờ làm việc

For appointments during business hours:

```appsheet
AND(
  WEEKDAY([Appointment_Date]) >= 2,
  WEEKDAY([Appointment_Date]) <= 6,
  HOUR([Appointment_Time]) >= 8,
  HOUR([Appointment_Time]) <= 17
)
```

### Vietnamese Holiday Check | Kiểm tra Ngày lễ Việt Nam

Exclude common Vietnamese holidays:

```appsheet
NOT(
  OR(
    AND(MONTH([Date]) = 1, DAY([Date]) = 1),  // New Year
    AND(MONTH([Date]) = 4, DAY([Date]) = 30), // Liberation Day
    AND(MONTH([Date]) = 5, DAY([Date]) = 1),  // Labor Day
    AND(MONTH([Date]) = 9, DAY([Date]) = 2),  // National Day
    // Add Tet and other lunar calendar holidays as needed
  )
)
```

### Date Range with Buffer | Phạm vi Ngày có vùng đệm

Allow booking 7-90 days in advance:

```appsheet
AND(
  [Booking_Date] >= (TODAY() + 7),
  [Booking_Date] <= (TODAY() + 90)
)
```

### Project Timeline Validation | Xác thực Timeline Dự án

Ensure end date is after start date:

```appsheet
[End_Date] > [Start_Date]
```

Enhanced version with minimum duration:

```appsheet
AND(
  [End_Date] > [Start_Date],
  [End_Date] >= ([Start_Date] + 1)  // Minimum 1 day duration
)
```

## Conditional Date Validation | Xác thực Ngày có Điều kiện

### Different Rules by Category | Quy tắc khác nhau theo Danh mục

```appsheet
SWITCH(
  [Event_Type],
  "Meeting", AND([Date] >= TODAY(), WEEKDAY([Date]) >= 2, WEEKDAY([Date]) <= 6),
  "Training", AND([Date] >= (TODAY() + 7), WEEKDAY([Date]) >= 2, WEEKDAY([Date]) <= 6),
  "Conference", AND([Date] >= (TODAY() + 30), [Date] <= (TODAY() + 365)),
  TRUE  // Default: any date allowed
)
```

### User Role Based Validation | Xác thực dựa trên Vai trò Người dùng

```appsheet
IF(
  USEREMAIL() = "admin@company.com",
  TRUE,  // Admin can select any date
  AND([Date] >= TODAY(), [Date] <= (TODAY() + 30))  // Regular users: next 30 days only
)
```

## Error Messages | Thông báo Lỗi

### English Messages | Thông báo tiếng Anh
```
"Please select a date between " & TEXT(DATE(2024,1,1), "MM/dd/yyyy") & " and " & TEXT(DATE(2024,12,31), "MM/dd/yyyy")
```

### Vietnamese Messages | Thông báo tiếng Việt
```
"Vui lòng chọn ngày từ " & TEXT(DATE(2024,1,1), "dd/MM/yyyy") & " đến " & TEXT(DATE(2024,12,31), "dd/MM/yyyy")
```

### Dynamic Error Messages | Thông báo Lỗi động

```appsheet
IF(
  [Date] < TODAY(),
  "Date cannot be in the past | Ngày không thể ở quá khứ",
  IF(
    WEEKDAY([Date]) = 1 OR WEEKDAY([Date]) = 7,
    "Please select a weekday | Vui lòng chọn ngày trong tuần",
    "Invalid date | Ngày không hợp lệ"
  )
)
```

## Usage Examples | Ví dụ Sử dụng

### Implementation Context | Ngữ cảnh Triển khai

1. **Valid_If Expression**: Add to date column properties
2. **Show_If Expression**: Control when date fields appear
3. **Editable_If Expression**: Control when dates can be modified

*1. **Biểu thức Valid_If**: Thêm vào thuộc tính cột ngày*
*2. **Biểu thức Show_If**: Kiểm soát khi trường ngày xuất hiện*
*3. **Biểu thức Editable_If**: Kiểm soát khi ngày có thể sửa đổi*

### Real-world Scenarios | Tình huống Thực tế

- **Appointment Booking**: Prevent past dates and non-business hours
- **Event Planning**: Ensure adequate planning time
- **Employee Leave**: Validate leave request dates
- **Project Management**: Ensure logical timeline sequences

*- **Đặt lịch hẹn**: Ngăn ngày quá khứ và ngoài giờ làm việc*
*- **Lập kế hoạch Sự kiện**: Đảm bảo thời gian lập kế hoạch đầy đủ*
*- **Nghỉ phép Nhân viên**: Xác thực ngày yêu cầu nghỉ phép*
*- **Quản lý Dự án**: Đảm bảo trình tự timeline hợp lý*

## Related Scripts | Scripts liên quan

- [Auto Timestamp](../automation/auto-timestamp.md)
- [Required Fields Check](./required-fields.md)
- [Email Validation](./email-validation.md)