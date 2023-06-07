import { NextResponse } from "next/server";
import prisma from "@app/libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    const reqBody = await req.json();
    const { email, name, password } = reqBody;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword,
        },
    });

    return NextResponse.json(user);
}
