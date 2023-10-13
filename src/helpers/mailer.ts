import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "988faa5e37c50b",
          pass: "1d387f980789db"
        }
      });
      const mailOptions = {
        from: "ajmalali749@gmail.com",
        to: email,
        subject: emailType === "VERIFY" ? "verify your email" : "Reset your password",
        text: "Click the link below to reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>to ${
            emailType === "VERIFY" ? "verify your email" : "reset your password "
        }</p>`
      }
     const mailresponse =  await transport.sendMail(mailOptions);
     return mailresponse;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
