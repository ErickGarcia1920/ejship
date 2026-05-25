-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Envio" (
    "id" SERIAL NOT NULL,
    "tracking" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'REGISTRADO',
    "clienteId" INTEGER NOT NULL,
    "repartidorId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Envio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstadoEnvio" (
    "id" SERIAL NOT NULL,
    "envioId" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    "nota" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EstadoEnvio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacion" (
    "id" SERIAL NOT NULL,
    "envioId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "enviado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Envio_tracking_key" ON "Envio"("tracking");

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_repartidorId_fkey" FOREIGN KEY ("repartidorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstadoEnvio" ADD CONSTRAINT "EstadoEnvio_envioId_fkey" FOREIGN KEY ("envioId") REFERENCES "Envio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_envioId_fkey" FOREIGN KEY ("envioId") REFERENCES "Envio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
