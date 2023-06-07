import prisma from "@app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { IReservationApiProps } from "@/commons/typescripts";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: IReservationApiProps }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== "string") {
        throw new Error("Invalid ID!");
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } },
            ],
        },
    });
    return NextResponse.json(reservation);
}
