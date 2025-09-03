"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { confirmSeat } from "@/app/lib/action";

export default function SeatInfo({ guest, tables }) {
  const router = useRouter();
  // useTransition pozwala na płynne przejścia stanu podczas wywoływania akcji serwerowej
  const [isPending, startTransition] = useTransition();

  const assignedSeat = guest.seat;
  const assignedTable = guest.seat?.table;

  // Funkcja, która zostanie wywołana po kliknięciu "Akceptuję"
  const handleAccept = () => {
    // Używamy startTransition, aby Next.js wiedział, że rozpoczynamy operację,
    // która może chwilę potrwać (np. aktualizacja bazy danych).
    startTransition(async () => {
      await confirmSeat(guest.id);
    });
  };

  const handleChange = () => {
    router.push(`/change-seat/${guest.id}`);
  };

  // --- GŁÓWNA ZMIANA LOGICZNA ---
  // Jeśli gość ma już potwierdzone miejsce, pokazujemy mu tylko finalny komunikat.
  if (guest.seatConfirmed) {
    return (
      <div className="text-center bg-white text-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          Witaj ponownie, {guest.name}!
        </h1>
        <div className="mb-4 p-4 bg-green-100 rounded-lg border border-green-300">
          <p className="text-lg text-gray-700">
            Twoje potwierdzone miejsce to:
          </p>
          <p className="text-3xl font-bold text-green-800 mt-2">
            {assignedTable?.name}, Miejsce {assignedSeat?.seatNumber}
          </p>
        </div>
        <p className="mt-6 text-xl text-gray-800">Życzymy miłej zabawy! 🎉</p>
      </div>
    );
  }

  // Jeśli miejsce nie jest jeszcze potwierdzone, pokazujemy opcje
  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Witaj {guest.name} {guest.surname}!
        </h1>

        <div className="text-center mb-4 p-4 bg-blue-100 rounded-lg border border-blue-300">
          <p className="text-lg text-gray-700">
            Twoje przydzielone miejsce to:
          </p>
          <p className="text-3xl font-bold text-blue-800 mt-2">
            {assignedTable?.name}, Miejsce {assignedSeat?.seatNumber}
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={handleAccept}
            disabled={isPending} // Przycisk jest nieaktywny podczas zapisu do bazy
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 font-bold text-lg disabled:opacity-50"
          >
            {isPending ? "Zapisywanie..." : "Akceptuję to miejsce"}
          </button>
          <button
            onClick={handleChange}
            disabled={isPending}
            className="w-full bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 font-semibold disabled:opacity-50"
          >
            Chcę wybrać inne miejsce
          </button>
        </div>
      </div>
    </div>
  );
}
