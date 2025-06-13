import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        const urlPart = emailType === "VERIFY" ? "verifyemail" : "reset-password";

        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }, // 1 hour expiry
            )
        } else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordExpiry: Date.now() + 3600000 }, // 1 hour expiry
            )
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false, // set to true if using port 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        });

        const mailOptions = {
            from: process.env.SMTP_FROM_EMAIL,
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${urlPart}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${urlPart}?token=${hashedToken}
            </p>`
        };

        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error: any) {
        throw new Error(error.message);
    }
}