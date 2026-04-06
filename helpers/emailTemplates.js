const OTPMailTemp = (otp, fullName) => {
  return `<div style="margin:0; padding:0; background-color:#eef2f7; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="420" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(90deg,#4facfe,#00f2fe); padding:25px; text-align:center;">
              <h2 style="margin:0; color:#ffffff; letter-spacing:1px;">
                🔐 OTP Verification
              </h2>
              <p style="margin:5px 0 0; color:#eafcff; font-size:13px;">
                Secure your account
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:25px; color:#444; font-size:14px; line-height:1.6;">
              
              Hello, <b>${fullName || "User"}</b>,<br><br>
              Use the following One-Time Password (OTP) to complete your verification:

              <!-- OTP Box -->
              <div style="text-align:center; margin:25px 0;">
                <span style="display:inline-block; padding:15px 30px; font-size:26px; font-weight:bold; color:#ffffff; background:#4facfe; border-radius:8px; letter-spacing:5px;">
                ${otp}
                </span>
              </div>

              <p style="margin:0;">
                ⏱️ This OTP will expire in <b>5 minutes</b>.<br>
                🔒 Never share this code with anyone.
              </p>

              <!-- Button (Optional) -->
              <div style="text-align:center; margin-top:25px;">
                <a href="#" style="text-decoration:none; background:#4facfe; color:#fff; padding:12px 25px; border-radius:6px; font-size:14px; display:inline-block;">
                  Verify Now
                </a>
              </div>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="border-top:1px solid #eee;"></td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:15px 25px; font-size:12px; color:#888; text-align:center;">
              If you didn’t request this, you can safely ignore this email.<br><br>
              © 2026 Your Company. All rights reserved.
            </td>
          <  /tr>

        </table>

      </td>
    </tr>
  </table>

</div>`;
};


module.exports = {OTPMailTemp}