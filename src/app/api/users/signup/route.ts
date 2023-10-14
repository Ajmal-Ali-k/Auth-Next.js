import { connect } from "@/dbConfig/db.Config";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password, email } = reqBody;

    //check user already exist
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({ username, password: hashedPassword, email })
    const savedUser = await newUser.save();
    console.log(savedUser ,"this is saved user");

      // send verification email 
      await  sendEmail({email,emailType:"VERIFY", userId:savedUser._id})
    return NextResponse.json({ newUser ,success: true,message:"User created successfully"});

  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
