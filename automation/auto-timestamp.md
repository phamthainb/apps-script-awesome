# Auto Timestamp | Tự động Timestamp

Automatically generate timestamps for record creation and updates.

*Tự động tạo timestamp cho việc tạo và cập nhật bản ghi.*

## Created Timestamp | Timestamp tạo

For automatically setting creation time:

```appsheet
NOW()
```

**Usage | Cách sử dụng:**
- Set as Initial Value for a DateTime column
- Column should be set to "Read-only" to prevent user modification

*- Đặt làm Initial Value cho cột DateTime*
*- Cột nên được đặt thành "Read-only" để ngăn người dùng sửa đổi*

## Updated Timestamp | Timestamp cập nhật

For automatically updating timestamp on any record change:

```appsheet
NOW()
```

**Usage | Cách sử dụng:**
- Set as App Formula for a DateTime column
- This will update every time the record is modified

*- Đặt làm App Formula cho cột DateTime*
*- Điều này sẽ cập nhật mỗi khi bản ghi được sửa đổi*

## Conditional Update Timestamp | Timestamp cập nhật có điều kiện

Only update timestamp when specific fields change:

```appsheet
IF(
  OR(
    [Status] <> [_THISROW_BEFORE].[Status],
    [Priority] <> [_THISROW_BEFORE].[Priority]
  ),
  NOW(),
  [Last_Modified]
)
```

## User-Specific Timestamps | Timestamp theo người dùng

Include user information with timestamp:

```appsheet
CONCATENATE(USEREMAIL(), " at ", TEXT(NOW(), "MM/dd/yyyy hh:mm AM/PM"))
```

## Timezone-Aware Timestamps | Timestamp có múi giờ

For Vietnam timezone (GMT+7):

```appsheet
NOW() + TIME(7, 0, 0)
```

For custom timezone offset:

```appsheet
NOW() + TIME([Timezone_Offset_Hours], 0, 0)
```

## Advanced Examples | Ví dụ nâng cao

### Business Hours Only | Chỉ giờ làm việc

```appsheet
IF(
  AND(
    WEEKDAY(TODAY()) >= 2,
    WEEKDAY(TODAY()) <= 6,
    HOUR(NOW()) >= 8,
    HOUR(NOW()) <= 17
  ),
  NOW(),
  ""
)
```

### Audit Trail | Theo dõi kiểm toán

```appsheet
CONCATENATE(
  [Audit_Trail],
  IF(ISBLANK([Audit_Trail]), "", " | "),
  TEXT(NOW(), "MM/dd/yyyy hh:mm"),
  " - ",
  USEREMAIL(),
  " - ",
  [Action_Type]
)
```

## Implementation Tips | Mẹo triển khai

1. **Creation Time**: Use Initial Value with NOW()
2. **Update Time**: Use App Formula with NOW()
3. **Conditional Updates**: Use App Formula with IF conditions
4. **Read-only Fields**: Set appropriate column properties

*1. **Thời gian tạo**: Sử dụng Initial Value với NOW()*
*2. **Thời gian cập nhật**: Sử dụng App Formula với NOW()*
*3. **Cập nhật có điều kiện**: Sử dụng App Formula với điều kiện IF*
*4. **Trường chỉ đọc**: Đặt thuộc tính cột thích hợp*

## Related Scripts | Scripts liên quan

- [Status Updates](./status-updates.md)
- [Notification Triggers](./notification-triggers.md)