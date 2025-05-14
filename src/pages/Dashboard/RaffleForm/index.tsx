import { DropZoneFiles } from "@/components/DropZoneFiles";
import { FormFieldContainer } from "@/components/FormFieldContainer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ROUTES } from "@/config/routes";
import { createRaffle } from "@/services/raffles.service";
import { uploadRaffleImages } from "@/services/storage.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { formSchema, type FormSchema } from "./schema";
export const RaffleForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    console.log("errors", form.formState.errors);
  }, [form.formState.errors]);
  const navigate = useNavigate();
  const onSubmitFnc = async (data: FormSchema) => {
    console.log("data", data);
    try {
      const imageUrls = data.images && (await uploadRaffleImages(data.images));

      const adaptedData = {
        ...data,
        images: imageUrls, // Solo se guarda el nombre del archivo
        price: Number(data.price.replace(/\D/g, "")), // Elimina caracteres no numéricos
        ticketsNumber: Number(data.ticketsNumber),
        finishDate: data.finishDate ? new Date(data.finishDate) : undefined,
      };
      console.log("adaptedData", adaptedData);

      const raffleId = await createRaffle(adaptedData);
      console.log("Raffle created with ID:", raffleId);
      navigate(`/${ROUTES.DASHBOARD.LIST_RAFFLES}`);
    } catch (error) {
      console.error("Error creating raffle:", error);
    }
  };
  return (
    <main className="container">
      <div>
        <Form {...form}>
          <section className="max-w-[1024px] rounded-xl border p-5 mx-auto">
            <h1 className="text-2xl font-bold mb-10 ">Crea una nueva rifa</h1>
            <div>
              {(form.watch("images")?.length ?? 0) > 0 && (
                <div className="flex gap-2 mb-4">
                  {form.watch("images")?.map((file: File) => (
                    <img
                      src={URL.createObjectURL(file)}
                      className="w-20 h-20 object-cover rounded-md"
                      key={file.name}
                      alt={file.name}
                    />
                  ))}
                </div>
              )}
            </div>
            <form className="" onSubmit={form.handleSubmit(onSubmitFnc)}>
              <div className="grid gap-4 md:grid-cols-2">
                <FormFieldContainer
                  form={form}
                  type="text"
                  name="title"
                  label="Nombre del sorteo *"
                  placeholder="Mi sorteo"
                />
                <FormFieldContainer
                  form={form}
                  type="date_picker"
                  name="finishDate"
                  label="Fecha de finalización"
                  placeholder="Fecha del sorteo"
                />
                <div className="flex gap-4 ">
                  <FormFieldContainer
                    form={form}
                    type="currency"
                    name="price"
                    label="Precio $COP *"
                    placeholder="$1.000"
                  />
                  <FormFieldContainer
                    form={form}
                    type="number"
                    name="ticketsNumber"
                    label="Cantidad de boletos *"
                    placeholder="10"
                  />
                </div>
                <FormFieldContainer
                  form={form}
                  type="textarea"
                  name="description"
                  label="Descripción *"
                  placeholder="Escribe una breve descripción del sorteo"
                />
                <div>
                  <p className="text-sm font-medium mb-1">
                    {" "}
                    Imagenes del premio
                  </p>
                  <DropZoneFiles
                    maxFiles={3}
                    onlyImages={true}
                    onDropFnc={(files) => {
                      form.setValue("images", files);
                    }}
                  />
                </div>
              </div>
              <Button className="mt-5" type="submit">
                Submit
              </Button>
            </form>
          </section>
        </Form>
      </div>
    </main>
  );
};
