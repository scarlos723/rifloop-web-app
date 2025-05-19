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
    defaultValues: {
      digit: { value: 1, label: "1" },
      ticketsNumber: "10",
    },
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
        digit: data.digit.value,
      };
      console.log("adaptedData", adaptedData);

      const raffleId = await createRaffle(adaptedData);
      console.log("Raffle created with ID:", raffleId);
      navigate(`${ROUTES.DASHBOARD.LIST_RAFFLES}`);
    } catch (error) {
      console.error("Error creating raffle:", error);
    }
  };
  const digit = form.watch("digit");
  function getTicketsCountByDigit(digit: number): number {
    return Math.pow(10, digit);
  }
  const calcTotalPrice = (price?: string, ticketsNumber?: string): string => {
    if (!price || !ticketsNumber) return "0";
    const priceNumber = Number(price.replace(/\D/g, ""));
    const ticketsNumberValue = Number(ticketsNumber);
    return (priceNumber * ticketsNumberValue).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
    });
  };

  useEffect(() => {
    if (digit.value) {
      const ticketsCount = getTicketsCountByDigit(digit.value).toString();
      console.log("ticketsCount", ticketsCount);
      form.setValue("ticketsNumber", ticketsCount);
    }
  }, [digit]);

  return (
    <main className="container py-10">
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
                <div className="flex items-center gap-4">
                  <FormFieldContainer
                    form={form}
                    type="react-select"
                    name="digit"
                    label="Cuantas cifras "
                    options={[
                      { value: 1, label: "1" },
                      { value: 2, label: "2" },
                      { value: 3, label: "3" },
                      { value: 4, label: "4" },
                    ]}
                  />
                  <FormFieldContainer
                    form={form}
                    type="number"
                    readOnly={true}
                    name="ticketsNumber"
                    label="Cantidad de boletos *"
                  />
                </div>

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

                  <div>
                    <p>Total venta:</p>
                    <p className="text-2xl font-bold">
                      {calcTotalPrice(
                        form.watch("price"),
                        form.watch("ticketsNumber")
                      )}
                      $
                    </p>
                  </div>
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
