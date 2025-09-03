"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function authenticateGuest(prevState, formData) {
  try {
    const name = formData.get("name");
    const surname = formData.get("surname");
    const city = formData.get("city");

    console.log(`Serwer: Szukam gościa: ${name} ${surname} z ${city}`);

    const guest = await prisma.guest.findFirst({
      where: {
        name: { equals: name, mode: "insensitive" },
        surname: { equals: surname, mode: "insensitive" },
        city: { equals: city, mode: "insensitive" },
      },
    });

    if (!guest) {
      return "Nie znaleziono gościa o podanych danych. Spróbuj ponownie.";
    }

    console.log(`Serwer: Znaleziono gościa! ID: ${guest.id}`);

    // --- NOWA LOGIKA PRZYDZIELANIA MIEJSCA ---
    // Sprawdzamy, czy gość ma już przypisane miejsce.
    if (!guest.seatId) {
      console.log("Serwer: Gość nie ma miejsca, szukam wolnego...");

      // Używamy transakcji, aby zapewnić spójność danych
      await prisma.$transaction(async (tx) => {
        // 1. Znajdź pierwsze wolne miejsce
        const availableSeat = await tx.seat.findFirst({
          where: { isReserved: false },
          orderBy: { id: "asc" }, // Bierzemy pierwsze z brzegu, aby było przewidywalne
        });

        if (!availableSeat) {
          // To się nie powinno zdarzyć przy 50 gościach i 110 miejscach, ale to dobre zabezpieczenie
          throw new Error("Brak wolnych miejsc!");
        }

        console.log(
          `Serwer: Znaleziono wolne miejsce ID: ${availableSeat.id}. Rezerwuję...`
        );

        // 2. Zarezerwuj to miejsce
        await tx.seat.update({
          where: { id: availableSeat.id },
          data: { isReserved: true },
        });

        // 3. Przypisz to miejsce do gościa
        await tx.guest.update({
          where: { id: guest.id },
          data: { seatId: availableSeat.id },
        });

        console.log(
          `Serwer: Pomyślnie przypisano miejsce ${availableSeat.id} do gościa ${guest.id}.`
        );
      });
    } else {
      console.log(`Serwer: Gość ma już przypisane miejsce ID: ${guest.seatId}`);
    }

    // Odświeżamy dane na stronie, na którą zaraz trafimy
    revalidatePath(`/checkin/${guest.id}`);
    // Przekierowujemy na stronę gościa
    redirect(`/checkin/${guest.id}`);
  } catch (error) {
    if (error.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Błąd serwera podczas autentykacji:", error);
    return "Wystąpił błąd serwera. Proszę spróbować później.";
  }
}

export async function confirmSeat(guestId) {
  try {
    await prisma.guest.update({
      where: { id: guestId },
      data: { seatConfirmed: true },
    });
    console.log(`Serwer: Gość ${guestId} potwierdził swoje miejsce.`);

    // Odświeżamy dane na stronie, aby zmiana była od razu widoczna
    revalidatePath(`/checkin/${guestId}`);
    return { success: true };
  } catch (error) {
    console.error("Błąd serwera podczas potwierdzania miejsca:", error);
    return { success: false, message: "Wystąpił błąd serwera." };
  }
}
