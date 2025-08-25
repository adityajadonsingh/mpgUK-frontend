import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://backend.mpgstone.co.uk/api/categories", {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch categories" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Server error fetching categories" }, { status: 500 });
  }
}
