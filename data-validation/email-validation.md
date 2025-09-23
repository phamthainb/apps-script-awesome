# Email Validation | Xác thực Email

Validates email format using AppSheet expressions.

*Xác thực định dạng email sử dụng biểu thức AppSheet.*

## Script | Scripts

```appsheet
REGEX([Email], "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
```

## Usage | Cách sử dụng

1. Add this expression to the `Valid_If` property of your email column
2. Replace `[Email]` with your actual column name
3. The expression returns TRUE for valid emails, FALSE for invalid ones

*1. Thêm biểu thức này vào thuộc tính `Valid_If` của cột email*
*2. Thay thế `[Email]` bằng tên cột thực tế của bạn*
*3. Biểu thức trả về TRUE cho email hợp lệ, FALSE cho email không hợp lệ*

## Advanced Version | Phiên bản nâng cao

For more strict validation:

```appsheet
AND(
  REGEX([Email], "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"),
  NOT(ISBLANK([Email])),
  LEN([Email]) <= 254
)
```

## Error Message | Thông báo lỗi

Add this to the column's description or use in a message:

```
"Please enter a valid email address | Vui lòng nhập địa chỉ email hợp lệ"
```

## Examples | Ví dụ

- ✅ Valid: `user@example.com`
- ✅ Valid: `test.email+tag@example.co.uk`
- ❌ Invalid: `invalid.email`
- ❌ Invalid: `@example.com`
- ❌ Invalid: `user@`

## Related Scripts | Scripts liên quan

- [Phone Number Validation](./phone-validation.md)
- [Required Fields Check](./required-fields.md)