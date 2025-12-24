import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter
transporter.verify(function (error, success) {
  if (error) {
    console.log('Email transporter error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

export async function sendBookingInvoice(booking, userEmail, userName) {
  try {
    const mailOptions = {
      from: `"Care.xyz" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Booking Confirmation - ${booking.serviceName} | Care.xyz`,
      html: generateInvoiceHTML(booking, userName),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Invoice email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending invoice email:', error);
    return { success: false, error: error.message };
  }
}

function generateInvoiceHTML(booking, userName) {
  const bookingDate = new Date(booking.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Invoice</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
        }
        .content {
          background: #f9fafb;
          padding: 30px;
          border: 1px solid #e5e7eb;
        }
        .invoice-box {
          background: white;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .invoice-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .invoice-row:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: 600;
          color: #6b7280;
        }
        .value {
          color: #111827;
          text-align: right;
        }
        .total-row {
          background: #eff6ff;
          padding: 15px;
          border-radius: 8px;
          margin-top: 10px;
        }
        .total-row .label {
          color: #1e40af;
          font-size: 18px;
        }
        .total-row .value {
          color: #1e40af;
          font-size: 24px;
          font-weight: bold;
        }
        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          background: #fef3c7;
          color: #92400e;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
        }
        .footer {
          background: #f3f4f6;
          padding: 20px;
          text-align: center;
          border-radius: 0 0 10px 10px;
          border: 1px solid #e5e7eb;
          border-top: none;
        }
        .footer p {
          margin: 5px 0;
          font-size: 14px;
          color: #6b7280;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background: #2563eb;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          margin: 20px 0;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="https://i.ibb.co.com/8gs1VMjc/Screenshot-2025-12-24-142240.png" alt="Care.xyz Logo" style="height: 50px; margin-bottom: 10px;" />
        <h1 style="margin: 10px 0;">Care.xyz</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px;">Booking Confirmation & Invoice</p>
      </div>

      <div class="content">
        <h2 style="color: #111827; margin-top: 0;">Dear ${userName},</h2>
        <p style="font-size: 16px;">
          Thank you for booking with Care.xyz! Your booking has been confirmed and our team will contact you shortly.
        </p>

        <div class="invoice-box">
          <h3 style="margin-top: 0; color: #1f2937;">Booking Details</h3>
          
          <div class="invoice-row">
            <span class="label">Booking ID:</span>
            <span class="value">${booking._id}</span>
          </div>
          
          <div class="invoice-row">
            <span class="label">Service:</span>
            <span class="value">${booking.serviceName}</span>
          </div>
          
          <div class="invoice-row">
            <span class="label">Duration:</span>
            <span class="value">${booking.duration} ${booking.durationType === 'days' ? 'Day(s)' : 'Hour(s)'}</span>
          </div>
          
          <div class="invoice-row">
            <span class="label">Rate:</span>
            <span class="value">৳${booking.pricePerUnit.toLocaleString()}/${booking.durationType === 'days' ? 'day' : 'hour'}</span>
          </div>
          
          <div class="invoice-row">
            <span class="label">Booking Date:</span>
            <span class="value">${bookingDate}</span>
          </div>
          
          <div class="invoice-row">
            <span class="label">Status:</span>
            <span class="value"><span class="status-badge">Pending</span></span>
          </div>
        </div>

        <div class="invoice-box">
          <h3 style="margin-top: 0; color: #1f2937;">Service Location</h3>
          
          <div class="invoice-row">
            <span class="label">Division:</span>
            <span class="value">${booking.location.division}</span>
          </div>
          
          <div class="invoice-row">
            <span class="label">District:</span>
            <span class="value">${booking.location.district}</span>
          </div>
          
          <div class="invoice-row">
            <span class="label">City:</span>
            <span class="value">${booking.location.city}</span>
          </div>
          
          <div class="invoice-row">
            <span class="label">Area:</span>
            <span class="value">${booking.location.area}</span>
          </div>
          
          <div class="invoice-row">
            <span class="label">Address:</span>
            <span class="value">${booking.address}</span>
          </div>
        </div>

        <div class="total-row">
          <div class="invoice-row" style="border: none;">
            <span class="label">Total Amount:</span>
            <span class="value">৳${booking.totalCost.toLocaleString()}</span>
          </div>
        </div>

        <div style="text-align: center;">
          <a href="${process.env.NEXTAUTH_URL}/my-bookings" class="button">View My Bookings</a>
        </div>

        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 20px;">
          <p style="margin: 0; color: #92400e; font-size: 14px;">
            <strong>⚠️ Important:</strong> Payment will be collected upon service delivery. Our team will contact you within 24 hours to confirm the schedule.
          </p>
        </div>
      </div>

      <div class="footer">
        <p><strong>Care.xyz</strong> - Professional Care Services</p>
        <p>📧 Email: ${process.env.EMAIL_USER}</p>
        <p>🌐 Website: ${process.env.NEXTAUTH_URL}</p>
        <p style="margin-top: 15px; font-size: 12px;">
          This is an automated email. Please do not reply to this message.
        </p>
      </div>
    </body>
    </html>
  `;
}

export default transporter;
