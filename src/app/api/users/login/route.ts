import { connect } from "@/dbConfig/db.Config";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, email } = reqBody;
    console.log(reqBody);

    //check user  exist

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    //password check
    const  isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    // token data
    const tokendata = {
        _id: user._id,
        username: user.username,
        email: user.email,
      
    }
    const token =  jwt.sign(tokendata,process.env.TOKEN_SECRET!,{expiresIn:"1d"})
    const response = NextResponse.json({
        message:"Login successful",
        success:true
    })
    response.cookies.set("token",token,{
        httpOnly:true,
        
    })
    return response
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
