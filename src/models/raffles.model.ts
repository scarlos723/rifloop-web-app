export interface Raffle {
  id?: number; // Será generado automáticamente
  userId: string; // ID del usuario que creó la sorteo
  title: string;
  description: string;
  price: number;
  finishDate?: Date;
  ticketsNumber: number;
  images?: string[];
  digit: number;
}
