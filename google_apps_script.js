// MÃ NGUỒN GOOGLE APPS SCRIPT GỬI EMAIL OTP THẬT
// Copy toàn bộ đoạn code này dán vào trang: https://script.google.com/
// Triển khai dưới dạng Web App với cấu hình: 
// - Execute as: Me
// - Who has access: Anyone

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var email = data.email;
    var otp = data.otp;
    
    if (!email || !otp) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Thiếu Email hoặc mã OTP"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var subject = "🔑 Mã OTP xác minh đặt lại mật khẩu - GSA Workshop Manager";
    var htmlBody = 
      "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e4e8; border-radius: 12px; background-color: #ffffff; color: #333333;'>" +
        "<div style='text-align: center; margin-bottom: 20px;'>" +
          "<h2 style='color: #4285F4; margin: 0;'>GSA Workshop Manager</h2>" +
          "<p style='font-size: 0.9rem; color: #666666; margin: 5px 0 0 0;'>Google Student Ambassador</p>" +
        "</div>" +
        "<hr style='border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;'>" +
        "<p>Xin chào <b>Chí Thắng</b>,</p>" +
        "<p>Hệ thống nhận được yêu cầu đặt lại mật khẩu của bạn. Dưới đây là mã xác minh OTP của bạn:</p>" +
        "<div style='text-align: center; margin: 30px 0;'>" +
          "<span style='font-size: 2rem; font-weight: 800; letter-spacing: 5px; color: #4285F4; background-color: #f1f3f4; padding: 12px 30px; border-radius: 8px; border: 1px dashed #4285F4;'>" + otp + "</span>" +
        "</div>" +
        "<p style='color: #d93025; font-size: 0.85rem;'>* Lưu ý: Mã này chỉ có hiệu lực trong vòng 5 phút. Vui lòng tuyệt đối không chia sẻ mã này cho bất kỳ ai khác.</p>" +
        "<hr style='border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;'>" +
        "<p style='font-size: 0.8rem; color: #999999; text-align: center;'>Thư này được gửi tự động từ hệ thống quản lý quy trình GSA.</p>" +
      "</div>";

    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
