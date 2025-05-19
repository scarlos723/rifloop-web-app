export type formSchema = {
  id: number;
  title: string;
  description: string;
  imags: File[];
  ticketsQuantity: number;
  ticketPrice: number;
  startDate: Date;
  endDate: Date;
  digit: {
    value: number;
    label: string;
  };
};
