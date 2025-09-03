-- CreateTable
CREATE TABLE "public"."Guest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "seatId" INTEGER,
    "seatConfirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Table" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Seat" (
    "id" SERIAL NOT NULL,
    "seatNumber" INTEGER NOT NULL,
    "isReserved" BOOLEAN NOT NULL DEFAULT false,
    "tableId" INTEGER NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guest_seatId_key" ON "public"."Guest"("seatId");

-- CreateIndex
CREATE UNIQUE INDEX "Seat_tableId_seatNumber_key" ON "public"."Seat"("tableId", "seatNumber");

-- AddForeignKey
ALTER TABLE "public"."Guest" ADD CONSTRAINT "Guest_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "public"."Seat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Seat" ADD CONSTRAINT "Seat_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "public"."Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
