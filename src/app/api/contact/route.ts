import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone_number, message } = body;

    const response = await fetch(`${process.env.API_URL!}/contact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone_number, message }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Response:", errorData);
      return NextResponse.json(
        { message: "Failed to send data", error: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    console.error("Error sending data:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
