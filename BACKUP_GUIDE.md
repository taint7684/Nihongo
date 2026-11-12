# Sao lưu và khôi phục

1. Tiến độ: Cài đặt → Xuất bản sao lưu. Gồm bài/câu/ôn/từ/ghi chú/nét vẽ/bản viết/ý định/lịch sử. Chọn file → kiểm → xác nhận mới thay dữ liệu hiện tại. Giữ file gốc.
2. Ghi âm: Công cụ học → Kaiwa → kho ghi âm → chọn nhóm và Xuất kho riêng (tối đa 5 bản/file). Xuất hết các nhóm cần giữ hoặc tải từng file âm thanh. Import kho không ghi đè ID đã có. Không phải đồng bộ cloud.
3. Cùng trình duyệt/origin: localhost, 127.0.0.1 và cổng khác là vùng dữ liệu khác. Xóa dữ liệu website mất localStorage/IndexedDB nếu chưa xuất.
4. Bản ghi chưa bấm Lưu qua buổi chỉ là nháp; rời bài/tải lại mất nháp. Bản đã lưu ở kho giữ qua buổi.

Checkpoint mã ở .tmp-ui/checkpoint-* không chứa dữ liệu profile học thật. Trước rollback mã: xuất tiến độ mới nhất và toàn bộ kho âm, giữ phiên bản ứng dụng hiện tại; thử rollback bằng hồ sơ QA trước. Không mở profile thật trên mã cũ chưa hiểu field/schema mới vì nó có thể không giữ các field mới. Không khôi phục source rồi tự coi đã khôi phục dữ liệu người dùng. Bản study-room không thay đổi.
