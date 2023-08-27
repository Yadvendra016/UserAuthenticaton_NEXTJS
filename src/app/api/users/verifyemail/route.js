import { connect } from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";



connect();

export async function POST(request){
    try {

        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);
        

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});
        console.log(user);
        if(!user) return NextResponse.json({error: "Invalid Token"},{status: 401});

        console.log(user);
        //const updatedUser = await User.updateOne({_id: user._id},{$set:{isVerified: true}}));
        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        
        await user.save();

        return NextResponse.redirect.json({message: "Email Verified successfully", success: true});
        
    } catch (error) {
        return NextResponse.json({error: error.messate}, {status: 500})
    }
}