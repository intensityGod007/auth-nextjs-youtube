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
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "3a37c77ba29f6b",
            pass: "6c80d6d8396b3d"
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