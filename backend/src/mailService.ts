import nodemailer from "nodemailer";
import { loadEnvFile } from "process";
loadEnvFile();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASSKEY,
  },
});

const sendEmail = async (email: string, token: string, url: string) => {
  const info = await transporter.sendMail({
    from: '"From e-comm" <ayushdnfd1679@gmail.com>',
    to: email,
    subject: "User verifaction email", // Subject line
    text: "This is one time verification link and expire in 1hr", // plain text body
    html: `<h2>Click the link below, link expires in 1hr</h2><br> <a href='http://localhost:5173/${url}token=${token}'>Enter Link</a>`, // html body
  });
};

const sendFeedback = async (
  subject: string,
  feedBack: string,
  id: string,
  email: string
): Promise<void> => {
  const info = await transporter.sendMail({
    from: '"From e-comm" <ayushdnfd1679@gmail.com>',
    to: "ayushdnfd1679@gmail.com",
    subject: subject, // Subject line
    text: `User feedback from from Userid ${id}`, // plain text body
    html: `
    <h2>User with userId: ${id} & email: ${email}</h2>
    <p>${feedBack}</p>
    `,
  });
};

export { sendEmail, sendFeedback };
