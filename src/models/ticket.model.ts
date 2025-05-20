export interface Ticket {
  id?: number;
  raffleId: number;
  ticketNumber: string;
  ticketPrice: number;
  ticketStatus: "available" | "sold";
  ticketDate: string;
}
