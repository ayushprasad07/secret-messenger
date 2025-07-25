import { 
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
 } from "@react-email/components";

 interface VerificationEmailProps {
    username : string;
    otp : string;
 }

 export default function verificationEmail({username,otp} : VerificationEmailProps){
    return(
        <Html lang="en" dir="ltr">
            <Head>
                <title>Verification Email</title>
                <Font
                fallbackFontFamily="Verdana"
                fontFamily="Roboto"
                fontWeight={400}
                fontStyle="normal"
                webFont = {{
                    url : "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
                    format : "woff2",
                }}/>
            </Head>
            <Preview>Verify your account</Preview>
            <Section>
                <Row>
                    <Heading>
                        Hello {username},
                    </Heading>
                </Row>
                <Row>
                    <Text>
                        Thanks for regestering with us. Please use the following verification code to verify your account
                    </Text>
                </Row>
                <Row>
                    <Text>
                        Your verification code is : {otp}
                    </Text>
                </Row>
                <Row>
                    <Text>
                        If you did not request this, please ignore this email.
                    </Text>
                </Row>
            </Section>
        </Html>
    )
 }