import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (session.user) {
      return NextResponse.json({ user: session.user });
    }

    return NextResponse.json(
      { message: "you are not logged in" },
      { status: 403 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: "you are not logged in" },
      { status: 403 }
    );
  }
};
