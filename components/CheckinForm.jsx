"use client";

// ZMIANA TUTAJ: importujemy useActionState z 'react'
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { authenticateGuest } from "../src/app/lib/action";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-[#ce103e] text-white font-medium py-4 mt-5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Sprawdzam..." : "Znajdź miejsce"}
    </button>
  );
}

export default function CheckinForm() {
  // ZMIANA TUTAJ: zmieniamy nazwę hooka na useActionState
  const [errorMessage, dispatch] = useActionState(authenticateGuest, undefined);

  return (
    <form action={dispatch} className="space-y-4 pt-6 w-full max-w-sm">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[#deddde] mb-1"
        >
          Imię
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Jan"
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ce103e] text-[#deddde]"
        />
      </div>
      <div>
        <label
          htmlFor="surname"
          className="block text-sm font-medium text-[#deddde] mb-1"
        >
          Nazwisko
        </label>
        <input
          id="surname"
          type="text"
          name="surname"
          placeholder="Kowalski"
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ce103e] text-[#deddde]"
        />
      </div>
      <div>
        <label
          htmlFor="city"
          className="block text-sm font-medium text-[#deddde] mb-1"
        >
          Miasto
        </label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="Warszawa"
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ce103e] text-[#deddde]"
        />
      </div>

      <SubmitButton />

      {errorMessage && (
        <div className="mt-4 text-center text-red-500">
          <p>{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
