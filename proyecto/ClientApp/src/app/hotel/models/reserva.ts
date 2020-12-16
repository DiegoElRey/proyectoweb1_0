import { Habitacion } from "./habitacion";

export class Reserva extends Habitacion {
    idReserva: string;
    FechaReserva: Date;
    Cedula: string;
    Iva: number;
    Total: number;
    FechaEntrada: Date;
    FechaSalida: Date;
    IdHabitacion: string;
    tipo: string;
    nPersonas: number;
    estado: string;
    precio: number;
    dias: number;
    subTotal: number;
    habitacion: Habitacion;
}