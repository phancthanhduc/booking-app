import { NextResponse } from "next/server";
import prisma from "@app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        category,
        imageSrc,
        roomCount,
        bathroomCount,
        price,
        guestCount,
        location,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const listing = await prisma.listing.create({
        data: {
            title,
            bathroomCount: bathroomCount.toString(),
            description,
            guestCount: guestCount.toString(),
            category,
            imageSrc,
            locationValue: location.value,
            price: parseInt(price, 10),
            roomCount: roomCount.toString(),
            userId: currentUser.id,
        },
    });

    return NextResponse.json(listing);
}
