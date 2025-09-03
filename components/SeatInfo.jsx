"use client";
import { useState } from "react";

export default function SeatConfirmation() {
  // statyczne dane gościa i miejsca
  const guest = { name: "Jan", surname: "Kowalski" };
  const seat = { number: 5, table: "Stół 3" };
  const tableGuests = [
    { name: "Anna", surname: "Nowak" },
    { name: "Piotr", surname: "Wiśniewski" },
  ];

  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    alert("Miejsce zostało zaakceptowane!");
    setAccepted(true);
  };

  const handleChange = () => {
    alert("Przechodzimy do wyboru nowego miejsca...");
    // tutaj później przekierowanie do /checkin/change lub otwarcie modal
  };

  if (accepted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-green-100">
        <h2 className="text-2xl font-bold">
          Dziękujemy! Twoje miejsce zostało zapisane ✅
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          Witaj {guest.name} {guest.surname}!
        </h1>
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-lg">
            Twoje miejsce: <strong>{seat.number}</strong>
          </p>
          <p className="text-lg">
            Przy stole: <strong>{seat.table}</strong>
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Przy stole siedzą:</h3>
          <ul className="list-disc list-inside">
            {tableGuests.map((g, i) => (
              <li key={i}>
                {g.name} {g.surname}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleChange}
            className="flex-1 bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
          >
            Zmień miejsce
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
          >
            Akceptuję miejsce
          </button>
        </div>
      </div>
    </div>
  );
}
