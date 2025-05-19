import { z } from "zod";
export const formSchema = z.object({
  title: z.string().nonempty({ message: "Campo requerido" }),
  description: z.string().nonempty({ message: "Campo requerido" }),
  price: z.string().nonempty({ message: "Campo requerido" }),
  finishDate: z.date().optional(),
  digit: z
    .object({
      value: z.number(),
      label: z.string(),
    })
    .refine((val) => val !== undefined && val !== null, {
      message: "Campo requerido",
    }),
  images: z
    .array(z.instanceof(File))
    .max(3, { message: "Máximo 3 imagenes" })
    .optional(),
  ticketsNumber: z.string().nonempty({ message: "Campo requerido" }),
});

export type FormSchema = z.infer<typeof formSchema>;
