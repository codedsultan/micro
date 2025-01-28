import sgMail from "@sendgrid/mail";
import optGenerator from "otp-generator";
import models from "../models/index.js";
import dates from "./dateFunc.js";
import ResponseMessages from "../constants/responseMessages.js";
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';




const utility = {};

// Check Username Availability
utility.checkUsernameAvailable = async (uname) => {
  let user = await models.User.findOne({ uname });

  if (user) {
    return false;
  }

  return true;
};

// Delete All expired OTPs
utility.deleteExpiredOTPs = async () => {
  const otps = await models.OTP.find();

  for (let i = 0; i < otps.length; i++) {
    if (dates.compare(otps[i].expiresAt, new Date()) === -1) {
      await otps[i].remove();
    }
  }

  console.log("[cron] task has deleted expired OTPs.");
};

/// Send Email
utility.sendEmail = async (options) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: options.email, // Change to your recipient
    from: process.env.SMTP_FROM, // Change to your verified sender
    subject: options.subject,
    text: options.message,
    html: options.htmlMessage,
  };

  await sgMail
    .send(msg)
    .then(() => {
      console.log(`Email sent to ${options.email}.`);
    })
    .catch((error) => {
      console.log(error.message);
      console.error(error);
    });
};

/// Generate OTP
utility.generateOTP = async (size = 6, expireTimeInMin = 15) => {
  const options = {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  };

  // Generating Token
  const otp = optGenerator.generate(size, options);

  // Valid for 15 minutes
  const expiresAt = Date.now() + expireTimeInMin * 60 * 1000;

  return { otp, expiresAt };
};

/// Check Account Status
utility.checkUserAccountStatus = async (status) => {
  if (status === "deleted") {
    return ResponseMessages.ACCOUNT_DELETED;
  }

  if (status === "suspended") {
    return ResponseMessages.ACCOUNT_SUSPENDED;
  }

  if (status === "deactivated") {
    return ResponseMessages.ACCOUNT_DEACTIVATED;
  }
};

utility.checkUserAccountType = async (type) => {
  if (type === "superadmin") {
    return ResponseMessages.ACCOUNT_SUPERADMIN;
  }
  if (type === "admin") {
    return ResponseMessages.ACCOUNT_ADMIN;
  }

  if (type === "user") {
    return ResponseMessages.ACCOUNT_USER;
  }
};


utility.checkIfSameUser = async (user, userId) => {
  if (user._id.toString() === userId.toString()) {
    return true;
  }

  return false;
};



utility.getOwnerData = async (ownerId, reqUser) => {
  const owner = await models.User.findById(ownerId)
    .select([
      "_id", "fname", "lname", "email", "uname", "avatar",
       "accountStatus", "isVerified", "createdAt",
    ]);
  const ownerData = {};


  ownerData._id = owner._id;
  ownerData.fname = owner.fname;
  ownerData.lname = owner.lname;
  ownerData.email = owner.email;
  ownerData.uname = owner.uname;
  ownerData.avatar = owner.avatar;
  ownerData.accountStatus = owner.accountStatus;
  ownerData.isVerified = owner.isVerified;
  ownerData.createdAt = owner.createdAt;

  return ownerData;
};


utility.sendMailWithMailtrap = async function (to, subject, data) {
  // Load environment variables
    dotenv.config();

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    fs.readFile('./email-templates/emailTemplate.hbs', 'utf8', (err, templateSource) => {
      if (err) {
        console.log('Error reading template file:', err);
        return;
      }

      // Compile the Handlebars template
      const template = handlebars.compile(templateSource);

      // Prepare dynamic data
      // const content = {
      //   name: 'John Doe',  // Dynamic value to replace in the template
      // };

      content = data || {};

      // Render the email content
      const htmlContent = template(data);

      // Email details
      const mailOptions = {
        from: 'noreply@microurl.com',       // sender address
        to: to,
        subject: subject, // Subject line
        html: htmlContent, // Using the rendered Handlebars template
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    });
};


 utility.generateRandomString = function(length = 10){
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let result = "";

  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

/**
 * Generate Slug from Text
 */
 utility.generateSlugFromText = function(text){
  if (!text) throw new Error("Text is not defined");

  const slug = text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

  const random = this.generateRandomString(10);

  return `${slug}-${random}`;
}

export default utility;