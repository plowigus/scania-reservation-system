import Link from "next/link";

export default function CheckinForm() {
  return (
    <form className="space-y-4 pt-6 w-full">
      <div>
        <label className="block text-sm font-medium text-[#deddde] mb-1">
          Imię
        </label>
        <input
          type="text"
          name="name"
          placeholder="Jan"
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ce103e]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#deddde] mb-1">
          Nazwisko
        </label>
        <input
          type="text"
          name="surname"
          placeholder="Kowalski"
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ce103e]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#deddde] mb-1">
          Miasto
        </label>
        <input
          type="text"
          name="city"
          placeholder="Warszawa"
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ce103e]"
        />
      </div>
      <Link href="/checkin">
        <button
          type="submit"
          className="w-full bg-[#ce103e] text-white font-medium py-4 mt-5 rounded-lg disabled:opacity-50"
        >
          Wyślij
        </button>
      </Link>
    </form>
  );
}
