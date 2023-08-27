import { connect } from "@/dbConfig/dbConfig.js";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export const POST = async (NextRequest) => {
  try {
    const reqBody = await NextRequest.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    //check if user already exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // send Verification email
     await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});

    return NextResponse.json({
        message: "User is created Successfully",
        success: true,
        savedUser
    });

    

  } catch (error) {
    console.log("error in signup=>", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
