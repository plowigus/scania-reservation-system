import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const guestList = [
  { name: "Anna", surname: "Kowalska", city: "Warszawa" },
  { name: "Piotr", surname: "Nowak", city: "Kraków" },
  { name: "Katarzyna", surname: "Wiśniewska", city: "Gdańsk" },
  { name: "Marcin", surname: "Wójcik", city: "Poznań" },
  { name: "Agnieszka", surname: "Kowalczyk", city: "Wrocław" },
  { name: "Tomasz", surname: "Zieliński", city: "Łódź" },
  { name: "Małgorzata", surname: "Szymańska", city: "Szczecin" },
  { name: "Krzysztof", surname: "Dąbrowski", city: "Bydgoszcz" },
  { name: "Barbara", surname: "Lewandowska", city: "Lublin" },
  { name: "Andrzej", surname: "Woźniak", city: "Katowice" },
  { name: "Janina", surname: "Kamińska", city: "Białystok" },
  { name: "Marek", surname: "Kozłowski", city: "Gdynia" },
  { name: "Zofia", surname: "Jankowska", city: "Częstochowa" },
  { name: "Adam", surname: "Mazur", city: "Radom" },
  { name: "Ewa", surname: "Wojciechowska", city: "Sosnowiec" },
  { name: "Grzegorz", surname: "Kwiatkowski", city: "Toruń" },
  { name: "Elżbieta", surname: "Krawczyk", city: "Kielce" },
  { name: "Paweł", surname: "Kaczmarek", city: "Rzeszów" },
  { name: "Teresa", surname: "Piotrowska", city: "Gliwice" },
  { name: "Józef", surname: "Grabowska", city: "Zabrze" },
  { name: "Helena", surname: "Zając", city: "Olsztyn" },
  { name: "Robert", surname: "Król", city: "Bielsko-Biała" },
  { name: "Danuta", surname: "Wieczorek", city: "Ruda Śląska" },
  { name: "Ryszard", surname: "Jabłońska", city: "Rybnik" },
  { name: "Irena", surname: "Nowicka", city: "Tychy" },
  { name: "Dariusz", surname: "Majewska", city: "Gorzów Wielkopolski" },
  { name: "Jadwiga", surname: "Olszewska", city: "Dąbrowa Górnicza" },
  { name: "Czesław", surname: "Stępień", city: "Płock" },
  { name: "Wanda", surname: "Malinowska", city: "Elbląg" },
  { name: "Kazimierz", surname: "Jaworska", city: "Opole" },
  { name: "Alicja", surname: "Wróbel", city: "Wałbrzych" },
  { name: "Wojciech", surname: "Gajewska", city: "Zielona Góra" },
  { name: "Natalia", surname: "Sikora", city: "Włocławek" },
  { name: "Michał", surname: "Walczak", city: "Tarnów" },
  { name: "Monika", surname: "Michalak", city: "Chorzów" },
  { name: "Stefan", surname: "Baran", city: "Kalisz" },
  { name: "Regina", surname: "Rutkowska", city: "Koszalin" },
  { name: "Jerzy", surname: "Michalska", city: "Legnica" },
  { name: "Grażyna", surname: "Ostrowska", city: "Grudziądz" },
  { name: "Tadeusz", surname: "Tomaszewska", city: "Słupsk" },
  { name: "Patrycja", surname: "Pietrzak", city: "Jaworzno" },
  { name: "Henryk", surname: "Marciniak", city: "Jastrzębie-Zdrój" },
  { name: "Sylwia", surname: "Wróblewska", city: "Nowy Sącz" },
  { name: "Artur", surname: "Jasińska", city: "Jelenia Góra" },
  { name: "Karolina", surname: "Zawadzka", city: "Siedlce" },
  { name: "Zbigniew", surname: "Bąk", city: "Mysłowice" },
  { name: "Beata", surname: "Chmielewska", city: "Piła" },
  { name: "Piotr", surname: "Włodarczyk", city: "Inowrocław" },
  { name: "Justyna", surname: "Jakubowska", city: "Lubin" },
  { name: "Łukasz", surname: "Kopeć", city: "Ostrów Wielkopolski" },
];

async function main() {
  console.log(`Rozpoczynam tranzakcję czyszczenia i zasiewania bazy...`);

  await prisma.$transaction(async (tx) => {
    console.log("   - Usuwam stare dane i resetuję liczniki ID...");
    await tx.$executeRawUnsafe(
      `TRUNCATE "Guest", "Seat", "Table" RESTART IDENTITY CASCADE;`
    );
    console.log(`✅ Baza danych wyczyszczona i liczniki ID zresetowane.`);

    // 2. Dodawanie nowych danych
    console.log(`\n   - Dodaję ${guestList.length} gości...`);
    await tx.guest.createMany({
      data: guestList,
    });
    console.log("   ✅ Goście dodani.");

    console.log("   - Dodaję stoły i miejsca...");
    const tablesToCreate = 11;
    const seatsPerTable = 10;

    for (let i = 1; i <= tablesToCreate; i++) {
      await tx.table.create({
        data: {
          name: `Stół ${i}`,
          capacity: seatsPerTable,
          seats: {
            create: Array.from({ length: seatsPerTable }, (_, j) => ({
              seatNumber: j + 1,
            })),
          },
        },
      });
    }
    console.log(
      `   ✅ Stworzono ${tablesToCreate} stołów z ${seatsPerTable} miejscami każdy.`
    );
  });

  console.log(`\n🎉 Transakcja zakończona sukcesem!`);
}

// Uruchomienie skryptu
main()
  .catch((e) => {
    console.error("❌ Wystąpił błąd podczas transakcji:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Połączenie z bazą danych rozłączone.");
  });
