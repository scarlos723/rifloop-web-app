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
      <div className="backdrop-blur-lg bg-white/40 dark:bg-gray-900/70 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-extrabold mb-2 text-center  dark:text-blue-300">
          Checkout
        </h1>
        <hr className="my-4" />
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center justify-between">
            <span>Total a pagar:</span>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              {ticketsSelected.length > 0
                ? (
                    ticketsSelected.length * (raffle?.price ?? 0)
                  ).toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })
                : "$ 0"}{" "}
              COP
            </span>
          </h2>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {ticketsSelected.length > 0 && (
              <span>
                Tus Números :{" [ "}
                <span className="font-bold text-blue-600 dark:text-blue-300">
                  {ticketsSelected.map((t) => t.ticketNumber).join(", ")}
                </span>
                {" ]"}
              </span>
            )}
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Comprar tickets
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};
