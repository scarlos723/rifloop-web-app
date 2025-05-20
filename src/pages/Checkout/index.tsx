import { FormFieldContainer } from "@/components/FormFieldContainer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ROUTES } from "@/config/routes";
import type { Raffle } from "@/models/raffles.model";
import type { Ticket } from "@/models/ticket.model";
import { updateStateOfTickets } from "@/services/tickets.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

export const Checkout = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(
      z.object({
        name: z.string().min(1, "Este campo es requerido"),
        email: z
          .string()
          .email("Email inválido")
          .min(1, "Este campo es requerido"),
        phone: z
          .string()
          .regex(
            /^[0-9]+$/,
            "El número de teléfono solo puede contener números"
          )
          .min(1, "Este campo es requerido")
          .max(10, "El número de teléfono no puede tener más de 10 dígitos"),
      })
    ),
  });
  const [ticketsSelected, setTicketsSelected] = useState<Ticket[]>([]);
  const [raffle, setRaffle] = useState<Raffle | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const idList = ticketsSelected
      .map((ticket) => ticket.id)
      .filter((id): id is number => id !== undefined);
    await updateStateOfTickets(idList, "sold");
    toast.success(`Compra exitosa, enviamos un correo a ${data.email}`);
    navigate(ROUTES.HOME);
  };
  useEffect(() => {
    const state = location.state as { tickets: Ticket[] };
    if (state && state.tickets) {
      setTicketsSelected(state.tickets);
    }
    const raffleState = location.state as { raffle: Raffle };
    if (raffleState && raffleState.raffle) {
      setRaffle(raffleState.raffle);
    }
  }, [location.state]);

  return (
    <main className="container max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout </h1>

      <div className="grid">
        <h2 className="text-lg ml-auto">
          <strong>Total:</strong>
          {ticketsSelected.length > 0 && (
            <strong>
              {(ticketsSelected.length * (raffle?.price ?? 0)).toLocaleString(
                "es-CO",
                {
                  style: "currency",
                  currency: "COP",
                }
              )}{" "}
              {""}
              COP
            </strong>
          )}
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormFieldContainer
            form={form}
            name="name"
            label="Nombre completo"
            type="text"
          />
          <FormFieldContainer
            form={form}
            type="email"
            name="email"
            label="Correo electrónico"
          />
          <FormFieldContainer
            form={form}
            name="phone"
            label="Número de teléfono"
            type="tel"
            placeholder="Ej: 3001234567"
          />
          <Button type="submit" className="w-full">
            Comprar tickets
          </Button>
        </form>
      </Form>
    </main>
  );
};
