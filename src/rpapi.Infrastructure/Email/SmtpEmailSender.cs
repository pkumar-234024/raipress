using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using rpapi.Core.Interfaces;
using rpapi.Core.viewModal;

namespace rpapi.Infrastructure.Email;

public class SmtpEmailSender(ILogger<SmtpEmailSender> _logger) : IEmailSender
{
  public async Task SendEmailAsync(string to, string from, string subject, string body, string name)
  {
    try
    {
      using (var emailClient = new SmtpClient("smtp.gmail.com", 587))
      {
        // Use environment variable for security
        //string appPassword = Environment.GetEnvironmentVariable("SMTP_APP_PASSWORD");
        string appPassword = "dcfb eetp byce zfow";
        if (string.IsNullOrEmpty(appPassword))
        {
          _logger.LogError("SMTP app password is not set.");
          throw new InvalidOperationException("SMTP app password is missing.");
        }

        emailClient.UseDefaultCredentials = false;
        emailClient.Credentials = new NetworkCredential("pravmobo@gmail.com", appPassword);
        emailClient.EnableSsl = true;
        emailClient.DeliveryMethod = SmtpDeliveryMethod.Network;
        string htmlBody = GenerateHtmlEmailBody(name, body);
        using (var message = new MailMessage(from, "pravmobo@gmail.com", subject, htmlBody))
        {
          message.IsBodyHtml = true; // Set to true for HTML emails

          await emailClient.SendMailAsync(message);
        }
      }

      _logger.LogInformation("Email sent to {to} from {from} with subject {subject}.", to, from, subject);
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "Failed to send email to {to}.", to);
      throw;
    }
  }


  private string GenerateHtmlEmailBody(string name, string body)
  {
    return $@"
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <style>
            body {{
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }}
            .header {{
                background-color: #f8f9fa;
                padding: 15px;
                border-bottom: 1px solid #e9ecef;
                margin-bottom: 20px;
            }}
            .content {{
                padding: 20px 0;
            }}
            .footer {{
                background-color: #f8f9fa;
                padding: 15px;
                border-top: 1px solid #e9ecef;
                margin-top: 20px;
                font-size: 12px;
                color: #6c757d;
                text-align: center;
            }}
        </style>
    </head>
    <body>
        <div class='header'>
            <h2>I am {(string.IsNullOrEmpty(name) ? "there" : name)}!</h2>
        </div>
        <div class='content'>
            {body}
        </div>
        <div class='footer'>
            <p>This is an automated email. Please do not reply.</p>
            <p>&copy; {DateTime.Now.Year} Your Company. All rights reserved.</p>
        </div>
    </body>
    </html>";
  }

}
