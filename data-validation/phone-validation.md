# Phone Number Validation | Xác thực Số điện thoại

Validates phone numbers for Vietnamese and international formats.

*Xác thực số điện thoại cho định dạng Việt Nam và quốc tế.*

## Vietnamese Phone Number | Số điện thoại Việt Nam

```appsheet
REGEX([Phone], "^(\+84|84|0)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$")
```

## International Phone Number | Số điện thoại quốc tế

```appsheet
REGEX([Phone], "^\+?[1-9]\d{1,14}$")
```

## Usage | Cách sử dụng

1. Choose the appropriate script based on your needs
2. Add to the `Valid_If` property of your phone column
3. Replace `[Phone]` with your column name

*1. Chọn script phù hợp dựa trên nhu cầu của bạn*
*2. Thêm vào thuộc tính `Valid_If` của cột điện thoại*
*3. Thay thế `[Phone]` bằng tên cột của bạn*

## Enhanced Version with Formatting | Phiên bản nâng cao với định dạng

```appsheet
AND(
  NOT(ISBLANK([Phone])),
  OR(
    REGEX([Phone], "^(\+84|84|0)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$"),
    REGEX([Phone], "^\+?[1-9]\d{1,14}$")
  )
)
```

## Auto-formatting Expression | Biểu thức tự động định dạng

For Initial Value to format Vietnamese numbers:

```appsheet
IF(
  REGEX([Phone], "^0(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$"),
  CONCATENATE("+84", RIGHT([Phone], 9)),
  [Phone]
)
```

## Examples | Ví dụ

### Vietnamese Numbers | Số Việt Nam
- ✅ Valid: `0987654321`
- ✅ Valid: `+84987654321`
- ✅ Valid: `84987654321`
- ❌ Invalid: `0123456789` (old format)
- ❌ Invalid: `987654321` (missing prefix)

### International Numbers | Số quốc tế
- ✅ Valid: `+1234567890`
- ✅ Valid: `+447911123456`
- ❌ Invalid: `+12345678901234567` (too long)

## Error Messages | Thông báo lỗi

```
"Please enter a valid phone number | Vui lòng nhập số điện thoại hợp lệ"
```

## Related Scripts | Scripts liên quan

- [Email Validation](./email-validation.md)
- [Required Fields Check](./required-fields.md)