# Getting Started with AppSheet Scripts | Bắt đầu với AppSheet Scripts

Welcome to the AppSheet Scripts collection! This guide will help you understand how to use and implement the scripts in this repository.

*Chào mừng đến với bộ sưu tập AppSheet Scripts! Hướng dẫn này sẽ giúp bạn hiểu cách sử dụng và triển khai các scripts trong repository này.*

## What are AppSheet Scripts? | AppSheet Scripts là gì?

AppSheet scripts are expressions and formulas that automate tasks, validate data, and enhance functionality in your AppSheet applications. They are written using AppSheet's expression language.

*AppSheet scripts là các biểu thức và công thức tự động hóa các tác vụ, xác thực dữ liệu và nâng cao chức năng trong ứng dụng AppSheet của bạn. Chúng được viết bằng ngôn ngữ biểu thức của AppSheet.*

## Repository Structure | Cấu trúc Repository

```
appsheet-scripts/
├── data-validation/     # Scripts for validating user input
├── automation/          # Workflow automation scripts
├── formulas/           # Common calculation formulas
├── integrations/       # Third-party service connections
├── ui-ux/             # User interface enhancements
├── security/          # Access control and security
├── docs/              # Documentation and guides
└── templates/         # Templates for contributors
```

## How to Use Scripts | Cách sử dụng Scripts

### 1. Choose the Right Script | Chọn Script phù hợp

Browse the categories to find scripts that match your needs:

- **Data Validation**: When you need to check user input
- **Automation**: For automated workflows and triggers
- **Formulas**: For calculations and data transformations
- **Integrations**: To connect with external services
- **UI/UX**: To improve user experience
- **Security**: For access control and data protection

*Duyệt qua các danh mục để tìm scripts phù hợp với nhu cầu của bạn:*

### 2. Understand the Script | Hiểu Script

Each script includes:

- **Purpose**: What the script does
- **Usage Instructions**: How to implement it
- **Examples**: Working examples with expected results
- **Parameters**: Configurable parts you can customize

*Mỗi script bao gồm:*

### 3. Implementation Steps | Các bước Triển khai

1. **Copy the Script**: Copy the AppSheet expression
2. **Identify the Context**: Determine where to use it (Initial Value, Valid_If, App Formula, etc.)
3. **Customize Parameters**: Replace placeholder values with your column names
4. **Test**: Verify the script works in your application
5. **Deploy**: Implement in your production app

*1. **Sao chép Script**: Sao chép biểu thức AppSheet*
*2. **Xác định Ngữ cảnh**: Xác định nơi sử dụng (Initial Value, Valid_If, App Formula, v.v.)*
*3. **Tùy chỉnh Tham số**: Thay thế giá trị placeholder bằng tên cột của bạn*
*4. **Kiểm tra**: Xác minh script hoạt động trong ứng dụng của bạn*
*5. **Triển khai**: Triển khai trong ứng dụng sản xuất*

## Common Implementation Contexts | Ngữ cảnh Triển khai Thông dụng

### Column Properties | Thuộc tính Cột

- **Initial Value**: Sets default values when creating records
- **App Formula**: Automatically calculates values
- **Valid_If**: Validates user input
- **Show_If**: Controls when columns are visible
- **Editable_If**: Controls when columns can be edited

*- **Initial Value**: Đặt giá trị mặc định khi tạo bản ghi*
*- **App Formula**: Tự động tính toán giá trị*
*- **Valid_If**: Xác thực đầu vào của người dùng*
*- **Show_If**: Kiểm soát khi cột hiển thị*
*- **Editable_If**: Kiểm soát khi cột có thể chỉnh sửa*

### Actions and Automation | Hành động và Tự động hóa

- **Workflows**: Automated processes triggered by events
- **Bots**: Background automation
- **Actions**: User-triggered operations

*- **Workflows**: Quy trình tự động được kích hoạt bởi sự kiện*
*- **Bots**: Tự động hóa nền*
*- **Actions**: Hoạt động được kích hoạt bởi người dùng*

## Best Practices | Thực hành Tốt nhất

### Testing | Kiểm tra

1. **Development Environment**: Always test in a development app first
2. **Edge Cases**: Test with various input scenarios
3. **Performance**: Monitor performance with large datasets
4. **User Experience**: Ensure scripts don't negatively impact usability

*1. **Môi trường Phát triển**: Luôn kiểm tra trong ứng dụng phát triển trước*
*2. **Trường hợp Đặc biệt**: Kiểm tra với các tình huống đầu vào khác nhau*
*3. **Hiệu suất**: Giám sát hiệu suất với tập dữ liệu lớn*
*4. **Trải nghiệm Người dùng**: Đảm bảo scripts không ảnh hưởng tiêu cực đến khả năng sử dụng*

### Documentation | Tài liệu

1. **Comment Complex Scripts**: Add comments to explain complex logic
2. **Document Customizations**: Keep track of modifications you make
3. **Version Control**: Track changes to your implementations

*1. **Chú thích Scripts Phức tạp**: Thêm chú thích để giải thích logic phức tạp*
*2. **Ghi chép Tùy chỉnh**: Theo dõi các sửa đổi bạn thực hiện*
*3. **Kiểm soát Phiên bản**: Theo dõi thay đổi đối với việc triển khai của bạn*

### Performance | Hiệu suất

1. **Avoid Unnecessary Calculations**: Only calculate when needed
2. **Use Appropriate Data Types**: Choose the right column types
3. **Optimize Complex Expressions**: Break down complex formulas

*1. **Tránh Tính toán Không cần thiết**: Chỉ tính toán khi cần*
*2. **Sử dụng Kiểu Dữ liệu Phù hợp**: Chọn kiểu cột phù hợp*
*3. **Tối ưu Biểu thức Phức tạp**: Chia nhỏ công thức phức tạp*

## Common Issues and Solutions | Vấn đề Thường gặp và Giải pháp

### Expression Errors | Lỗi Biểu thức

- **Syntax Errors**: Check parentheses and quotes
- **Column References**: Ensure column names are correct
- **Data Type Mismatches**: Verify data types match expectations

*- **Lỗi Cú pháp**: Kiểm tra dấu ngoặc và dấu nháy*
*- **Tham chiếu Cột**: Đảm bảo tên cột chính xác*
*- **Không khớp Kiểu Dữ liệu**: Xác minh kiểu dữ liệu khớp với mong đợi*

### Performance Issues | Vấn đề Hiệu suất

- **Slow Expressions**: Simplify complex calculations
- **Large Datasets**: Use appropriate filtering and indexing
- **Frequent Updates**: Minimize unnecessary recalculations

*- **Biểu thức Chậm**: Đơn giản hóa tính toán phức tạp*
*- **Tập Dữ liệu Lớn**: Sử dụng lọc và lập chỉ mục phù hợp*
*- **Cập nhật Thường xuyên**: Giảm thiểu tính toán lại không cần thiết*

## Getting Help | Nhận Trợ giúp

- **Check Examples**: Review the examples in each script
- **AppSheet Documentation**: Refer to official AppSheet docs
- **Community**: Ask questions in AppSheet forums
- **Issues**: Report problems or suggestions in this repository

*- **Kiểm tra Ví dụ**: Xem lại các ví dụ trong mỗi script*
*- **Tài liệu AppSheet**: Tham khảo tài liệu chính thức của AppSheet*
*- **Cộng đồng**: Đặt câu hỏi trong diễn đàn AppSheet*
*- **Issues**: Báo cáo vấn đề hoặc đề xuất trong repository này*

## Next Steps | Bước tiếp theo

1. **Explore Categories**: Browse the script categories
2. **Try Simple Scripts**: Start with basic validation or automation scripts
3. **Customize for Your Needs**: Adapt scripts to your specific requirements
4. **Contribute**: Share your own useful scripts with the community

*1. **Khám phá Danh mục**: Duyệt qua các danh mục script*
*2. **Thử Scripts Đơn giản**: Bắt đầu với scripts xác thực hoặc tự động hóa cơ bản*
*3. **Tùy chỉnh cho Nhu cầu**: Điều chỉnh scripts cho yêu cầu cụ thể của bạn*
*4. **Đóng góp**: Chia sẻ scripts hữu ích của riêng bạn với cộng đồng*