import { z } from "zod";
export const formSchema = z.object({
  title: z.string().nonempty({ message: "Campo requerido" }),
  description: z.string().nonempty({ message: "Campo requerido" }),
  price: z.string().nonempty({ message: "Campo requerido" }),
  finishDate: z.date().optional(),
  images: z
    .array(z.instanceof(File))
    .max(3, { message: "Máximo 3 imagenes" })
    .optional(),
  ticketsNumber: z
    .string()
    .transform((val) => (val.trim() === "" ? NaN : Number(val))) // Convierte a número o NaN si está vacío
    .refine((val) => !isNaN(val), { message: "Debe ser un número válido" }) // Verifica que sea un número
    .refine((val) => val >= 10, { message: "Mínimo 10" }), // Valida que sea mayor o igual a 10
});

export type FormSchema = z.infer<typeof formSchema>;
