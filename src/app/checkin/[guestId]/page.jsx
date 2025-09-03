import { PrismaClient } from "@prisma/client";
import SeatInfo from "../../../../components/SeatInfo";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

// Osobna funkcja do pobierania danych - dobra praktyka
async function getData(guestId) {
  const guest = await prisma.guest.findUnique({
    where: { id: guestId },
    include: {
      seat: {
        include: {
          table: true,
        },
      },
    },
  });

  // Jeśli nie znajdziemy gościa, zwrócimy błąd 404
  if (!guest) {
    notFound();
  }

  // Pobieramy też wszystkie stoły do wyświetlenia mapy miejsc
  const allTables = await prisma.table.findMany({
    orderBy: { id: "asc" },
    include: {
      seats: {
        orderBy: { seatNumber: "asc" },
        include: {
          guest: true,
        },
      },
    },
  });

  return { guest, allTables };
}

// Komponent strony jest teraz czystszy
export default async function CheckinGuestPage({ params }) {
  const guestId = await parseInt(params.guestId, 10);
  const { guest, allTables } = await getData(guestId);

  return (
    <div className="w-screen min-h-screen flex justify-center items-center flex-col mx-auto p-4 bg-[var(--background)]">
      <img
        className="w-1/3 max-w-xs pt-10"
        src="/Scania-Logo2.png"
        alt="Scania Logo"
      />
      <div className="w-full pt-5 flex flex-col justify-center items-center">
        <SeatInfo guest={guest} tables={allTables} />
      </div>
    </div>
  );
}
