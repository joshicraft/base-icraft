/* eslint-disable no-console */
const sgMail = require('@sendgrid/mail')
exports.handler = function (event, context, callback) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    let body = JSON.parse(event.body)

    let msg = {
        to: process.env.CONTACT_MAIL_TO,
        from: process.env.CONTACT_MAIL_FROM,
        subject: 'Website Contact Form',
        text: 'Someone has filled out a form on your website, check out the message they left and get in touch with them :)',
        html: ''
    }
    let template = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
  <!--[if (gte mso 9)|(IE)]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <!--[if (gte mso 9)|(IE)]>
  <style type="text/css">
    body {width: 600px;margin: 0 auto;}
    table {border-collapse: collapse;}
    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
    img {-ms-interpolation-mode: bicubic;}
  </style>
  <![endif]-->

  <style type="text/css">
    body, p, div {
      font-family: arial;
      font-size: 14px;
    }
    body {
      color: #626262;
    }
    body a {
      color: #0088cd;
      text-decoration: none;
    }
    p { margin: 0; padding: 0; }
    table.wrapper {
      width:100% !important;
      table-layout: fixed;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    img.max-width {
      max-width: 100% !important;
    }
    .column.of-2 {
      width: 50%;
    }
    .column.of-3 {
      width: 33.333%;
    }
    .column.of-4 {
      width: 25%;
    }
    @media screen and (max-width:480px) {
      .preheader .rightColumnContent,
      .footer .rightColumnContent {
        text-align: left !important;
      }
      .preheader .rightColumnContent div,
      .preheader .rightColumnContent span,
      .footer .rightColumnContent div,
      .footer .rightColumnContent span {
        text-align: left !important;
      }
      .preheader .rightColumnContent,
      .preheader .leftColumnContent {
        font-size: 80% !important;
        padding: 5px 0;
      }
      table.wrapper-mobile {
        width: 100% !important;
        table-layout: fixed;
      }
      img.max-width {
        height: auto !important;
        max-width: 480px !important;
      }
      a.bulletproof-button {
        display: block !important;
        width: auto !important;
        font-size: 80%;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .columns {
        width: 100% !important;
      }
      .column {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
    }
  </style>
  <!--user entered Head Start-->

  <!--End Head user entered-->
</head>
<body>
<center class="wrapper" data-link-color="#0088cd" data-body-style="font-size: 14px; font-family: arial; color: #626262; background-color: #F4F4F4;">
  <div class="webkit">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#F4F4F4">
      <tr>
        <td valign="top" bgcolor="#F4F4F4" width="100%">
          <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="100%">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td>
                      <!--[if mso]>
                      <center>
                        <table><tr><td width="600">
                      <![endif]-->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center">
                        <tr>
                          <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #626262; text-align: left;" bgcolor="#F4F4F4" width="100%" align="left">

                            <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%"
                                   style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                              <tr>
                                <td role="module-content">
                                  <p>Your website has got a message via the ICRAFT mail service</p>
                                </td>
                              </tr>
                            </table>

                            <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                              <tr>
                                <td style="padding:0px 0px 0px 0px;"
                                    height="100%"
                                    valign="top"
                                    bgcolor="">
                                  <div style="text-align: right;"><span style="font-family:verdana,geneva,sans-serif;"><span style="font-size:10px;">Email not displaying correctly? <a href="[weblink]">View it</a> in your browser.</span></span>
                                  </div>
                                </td>
                              </tr>
                            </table>

                            <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                              <tr>
                                <td style="font-size:6px;line-height:10px;background-color:#F4F4F4;padding:34px 0px 34px 0px;" valign="top" align="left">
                                  <a href="https://www.icraft.co.nz"><img class="max-width" width="60" src="https://marketing-image-production.s3.amazonaws.com/uploads/665b4c998e61fc86e5412e6befd3cc94a109841f259767341dcf9b515ad20321c5b3e0bf873f7e79b126621d8b9585dcbdd03d3a5659756bd198d1a3c3a0a93b.png" alt="" border="0" style="display:block;color:#000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:10% !important;width:10%;height:auto !important;"></a>
                                </td>
                              </tr>
                            </table>

                            <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                              <tr>
                                <td style="padding:34px 23px 34px 23px;background-color:#ffffff;"
                                    height="100%"
                                    valign="top"
                                    bgcolor="#ffffff">
                                  <h1 style="text-align: center;"><font color="#2d2d2d">It looks like someone filled out a contact form</font></h1>

                                  <div style="text-align: center;">They&#39;ve left you with their contact details and message below</div>

                                </td>
                              </tr>
                            </table>

                            <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                              <tr>
                                <td style="padding:34px 23px 34px 23px;background-color:#ffffff;"
                                    height="100%"
                                    valign="top"
                                    bgcolor="#ffffff">
                                  <h1 style="text-align: center;"><span style="color:#2D2D2D;">Contact Details</span></h1>
                                  <div style="text-align: center;">${body.name}</div>
                                  <div style="text-align: center;">${body.email}</div>
                                  <div style="text-align: center;">${body.phone || 'No Phone'}</div>
                                  <h1 style="text-align: center;"><span style="color:#2D2D2D;">Message</span></h1>
                                  <div style="text-align: center;">${body.message}</div>
                                </td>
                              </tr>
                            </table>

                            <table  border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    align="center"
                                    width="100%"
                                    role="module"
                                    data-type="columns"
                                    data-version="2"
                                    style="padding:48px 34px 17px 34px;background-color:#32a9d6;"
                                    bgcolor="#32a9d6">
                              <tr role='module-content'>
                                <td height="100%" valign="top">
                                  <!--[if (gte mso 9)|(IE)]>
                                  <center>
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing:0;border-collapse:collapse;table-layout: fixed;" >
                                      <tr>
                                  <![endif]-->

                                  <!--[if (gte mso 9)|(IE)]>
                                  <td width="266.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
                                  <![endif]-->

                                  <table  width="266.000"
                                          style="width:266.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;"
                                          cellpadding="0"
                                          cellspacing="0"
                                          align="left"
                                          border="0"
                                          bgcolor="#32a9d6"
                                          class="column column-0 of-2
                  empty"
                                  >
                                    <tr>
                                      <td style="padding:0px;margin:0px;border-spacing:0;">

                                        <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                                          <tr>
                                            <td style="padding:0px 0px 0px 0px;background-color:#32a9d6;"
                                                height="100%"
                                                valign="top"
                                                bgcolor="#32a9d6">
                                              <div style="font-size: 10px; line-height: 150%; margin: 0px;">&nbsp;</div>
                                              <div style="font-size: 10px; line-height: 150%; margin: 0px;">&nbsp;</div>
                                            </td>
                                          </tr>
                                        </table>

                                      </td>
                                    </tr>
                                  </table>

                                  <!--[if (gte mso 9)|(IE)]>
                                  </td>
                                  <![endif]-->
                                  <!--[if (gte mso 9)|(IE)]>
                                  <td width="266.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
                                  <![endif]-->

                                  <table  width="266.000"
                                          style="width:266.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;"
                                          cellpadding="0"
                                          cellspacing="0"
                                          align="left"
                                          border="0"
                                          bgcolor="#32a9d6"
                                          class="column column-1 of-2
                  empty"
                                  >
                                    <tr>
                                      <td style="padding:0px;margin:0px;border-spacing:0;">

                                        <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                                          <tr>
                                            <td style="padding:0px 0px 0px 0px;background-color:#32a9d6;"
                                                height="100%"
                                                valign="top"
                                                bgcolor="#32a9d6">
                                              <div style="font-size: 10px; line-height: 150%; margin: 0px; text-align: right;"><span style="color:#ffffff;">ICRAFT - EMAIL SERVICE</span></div>
                                              <div style="font-size: 10px; line-height: 150%; margin: 0px; text-align: right;"><span style="color:#ffffff;">Address: 116 North Road Clevedon</span></div>
                                              <div style="font-size: 10px; line-height: 150%; margin: 0px; text-align: right;"><span style="color:#ffffff;">Email: support@icraft.co.nz</span></div>
                                              <div style="font-size: 10px; line-height: 150%; margin: 0px; text-align: right;"><span style="color:#ffffff;">Website: <a href="www.icraft.co.nz">www.icraft.co.nz</a></span></div>
                                            </td>
                                          </tr>
                                        </table>

                                      </td>
                                    </tr>
                                  </table>

                                  <!--[if (gte mso 9)|(IE)]>
                                  </td>
                                  <![endif]-->
                                  <!--[if (gte mso 9)|(IE)]>
                                  <tr>
                                    </table>
                                    </center>
                                  <![endif]-->
                                </td>
                              </tr>
                            </table>

                          </td>
                        </tr>
                      </table>
                      <!--[if mso]>
                      </td></tr></table>
                      </center>
                      <![endif]-->
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</center>
</body>
</html>
  `
    console.log(body)
    msg.html = template
    console.log(`
      Contact
      form
      sent
      from: ${process.env.CONTACT_MAIL_FROM},
      to: ${process.env.CONTACT_MAIL_TO},
      with name:
      ${body.name}
    `)
    sgMail.send(msg)
    callback()
}
