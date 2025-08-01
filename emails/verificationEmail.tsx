

 interface VerificationEmailProps {
    username : string;
    otp : string;
    email : string;
 }

 export default function verificationEmail({username,otp,email} : VerificationEmailProps){
    // return(
    //     <Html lang="en" dir="ltr">
    //         <Head>
    //             <title>Verification Email</title>
    //             <Font
    //             fallbackFontFamily="Verdana"
    //             fontFamily="Roboto"
    //             fontWeight={400}
    //             fontStyle="normal"
    //             webFont = {{
    //                 url : "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
    //                 format : "woff2",
    //             }}/>
    //         </Head>
    //         <Preview>Verify your account</Preview>
    //         <Section>
    //             <Row>
    //                 <Heading>
    //                     Hello {username},
    //                 </Heading>
    //             </Row>
    //             <Row>
    //                 <Text>
    //                     Thanks for regestering with us. Please use the following verification code to verify your account
    //                 </Text>
    //             </Row>
    //             <Row>
    //                 <Text>
    //                     Your verification code is : {otp}
    //                 </Text>
    //             </Row>
    //             <Row>
    //                 <Text>
    //                     If you did not request this, please ignore this email.
    //                 </Text>
    //             </Row>
    //         </Section>
    //     </Html>
    // )
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verification Code",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                    <h2 style="color: #6A5ACD;">Secret Messenger Verification</h2>
                    
                    <p style="font-size: 16px; color: #333;">Hi <strong>${username}</strong>,</p>
                    
                    <p style="font-size: 16px; color: #333;">
                    Thanks for signing up for <strong>Secret Messenger</strong>. To complete your registration, please use the following one-time verification code:
                    </p>
                    
                    <div style="font-size: 28px; font-weight: bold; color: #6A5ACD; text-align: center; margin: 30px 0;">
                    ${otp}
                    </div>

                    <p style="font-size: 14px; color: #555;">
                    This code will expire in 10 minutes. If you didn&apos;t request this, you can safely ignore this email.
                    </p>

                    <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 40px;">
                    &copy; ${new Date().getFullYear()} Secret Messenger by Ayush Prasad
                    </p>
                </div>
            </div>
        `
    };
 }