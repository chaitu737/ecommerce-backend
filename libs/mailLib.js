const nodemailer = require('nodemailer');

let signupmail = (email,fullName)=>{
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'dummymail6674@gmail.com', // generated ethereal user
            pass: 'santhu@51' // generated ethereal password
        }
    });
    let mailOptions = {
        from:'"Creud"<sahal737@gmail.com>',
        to:email,
        subject:'Verify Email Address',
        text:`Hello ${fullName}`,
        html:`<html>
        <head>
        <title>Shopping Cart</title>
        <meta name="viewport" content="width=device-width, inital-scale=1">
        <style>
        * {
            letter-spacing: 1px;
            font-family: 'Montserrat', arial;
        }

        .cart-wrapper {
            color: #323232;
            background: #DCDCDC;
            padding: 1.3rem 1.3rem 0.5rem 1.3rem;
        }

        .body-child {
            margin-left: 5% !important;
            width: 90%;
            text-align: center;
            background: #fff;
            border-radius: 2px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
        }

        .date-text {
            text-align: right
        }

        @media screen and (max-width: 768px) {

            .body-child {
                margin-left: 5% !important;
                width: 90%;
                text-align: center;
            }

        }
    </style>
    </head>
    <body style="margin: 0;">
                <!-- template header -->
                <div style="display:block; background: #3F51B5; width: 100%; height: 20%; text-align: center;">
                    <div style="width: 100%; height: 100%; display: table;">
                        <!-- <img width="145" height="36" src="data:image/png;base64,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"
                                alt="logo"> -->
                        <div style="display:table-cell; vertical-align: middle;">
                            <h1 style="color: #fff; display:inline; vertical-align: middle;">Issue Tracking Tool</h1>
                        </div>
                    </div>
                </div>
                <!-- end -->
            
                <!-- template body -->
                <div style="width: 100%; height: auto; margin: 5% 0;">
                    <div class="body-child">
                 
            
                        <div>
                            <h1 style="color: #262626; font-size: 3rem; font-weight: 700 !important; text-transform: uppercase; letter-spacing: 2px; font-family: 'Montserrat',arial;">Welcome</h1>
            
                            <div style="color: #C7C7C7; font-size: 0.9rem; text-transform: uppercase;letter-spacing: 1px; padding-right: 6px;">
                                Hello <b style="text-transform:capitalize">${fullName}</b> nice to see you here!
                            </div>

                            <br>
                           
                        </div>
            
                        <br><br>
                    </div>
                </div>
                <hr>
                <!-- ENd -->
            
                <!-- Template footer -->
                <div style="display:block;  width: 100%; height: 20%; text-align: center;">
            
                    <div style=" padding: 4%;">
                        <p style=" margin: 0px;font-size: 0.6em;margin-left: 25%; width: 50%; text-align: center; line-height: 134%;">
                            If you did not create this account on Issue Tracking Tool and you think someone else has used your Email ID to create
                            an account, please remove your Email ID from this account by clicking Contacting us.
                        </p>
                    </div>
            
                    <div style="background: #3F51B5; color: #666666; padding: 2% ">
                        <div style="margin-left: 25%; width: 50%; text-align: center;">
                            <a style=" color: white " data-logo-light="/assets/img/logo/logo-light.png" data-logo-dark="/assets/img/logo/logo-dark.png">
                                Facebook |
                            </a>
                            <a style=" color: white " data-logo-light="/assets/img/logo/logo-light.png" data-logo-dark="/assets/img/logo/logo-dark.png">
                                Twitter
                            </a>
                        </div>
                    </div>
                </div>
                <!-- end -->
            
            </body>
            
            </html>`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}




module.exports={
    signupmail:signupmail
}