import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, roll, email, phone } = await request.json();
    
    const apiResponse = await fetch("http://localhost:5000/generate-pass", {
      method: "POST",
      body: JSON.stringify({ name, roll, email, phone }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!apiResponse.ok) {
      throw new Error(`HTTP error! Status: ${apiResponse.status}`);
    }

    const responseData = await apiResponse.json();

    // Log the parsed response data
    console.log(responseData);

    return NextResponse.json({
      response: responseData,
      message: "Email Sent Successfully",
    });
  } catch (error:any) {
    console.error("Error in sending email:", error);
    return NextResponse.json({
      message: "Failed to Send Email",
      error: error.message || error.toString(),
    }, { status: 500 });
  }
}