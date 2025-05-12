import { DropZoneFiles } from "@/components/DropZoneFiles";
import { FormFieldContainer } from "@/components/FormFieldContainer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "./schema";

export const RaffleForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    console.log("errors", form.formState.errors);
  }, [form.formState.errors]);
  return (
    <main className="container">
      <Form {...form}>
        <h1 className="text-2xl font-bold mb-10">Crea una nueva rifa</h1>
        <form
          className="grid gap-4"
          onSubmit={form.handleSubmit((data) => console.log(data))}
        >
          <FormFieldContainer
            form={form}
            type="text"
            name="title"
            label="Nombre del sorteo *"
            placeholder="Escribe el nombre del sorteo"
          />
          <FormFieldContainer
            form={form}
            type="text"
            name="description"
            label="Descripción *"
            placeholder="Escribe una breve descripción del sorteo"
          />
          <FormFieldContainer
            form={form}
            type="currency"
            name="price"
            label="Precio $COP *"
            placeholder="Selecciona el precio del boleto"
          />
          <FormFieldContainer
            form={form}
            type="date_picker"
            name="finish_date"
            label="Fecha de finalización"
            placeholder="Escoja la fecha de finalización del sorteo"
          />

          <div>
            <p className="text-sm font-medium mb-1"> Imagenes del premio</p>
            <DropZoneFiles
              onDropFnc={(files) => {
                console.log(files);
              }}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
};
