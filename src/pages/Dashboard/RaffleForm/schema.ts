import { z } from "zod";
export const formSchema = z.object({
  title: z.string().min(1, { message: "Campo requerido" }),
  description: z.string().min(1, { message: "Campo requerido" }),
  price: z.string().min(1, { message: "Campo requerido" }),
  finish_date: z.date().optional(),
  images: z
    .array(z.instanceof(File))
    .max(3, { message: "Máximo 3 imagenes" })
    .optional(),
});
