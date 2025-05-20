import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
// Instala e importa tu carrusel favorito, aquí un ejemplo simple:
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const DialogImages = (props: { images: string[] }) => {
  // ...tu código...
  const { images } = props;
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const handlePrev = () =>
    setCurrent((prev) => (prev === 0 ? (images?.length ?? 1) - 1 : prev - 1));
  const handleNext = () =>
    setCurrent((prev) => (prev === (images?.length ?? 1) - 1 ? 0 : prev + 1));

  return (
    <div>
      {/* ... */}
      {images.length > 0 && (
        <Dialog open={open} onOpenChange={setOpen}>
          <div className="flex gap-2 mb-4">
            {images?.map((file: string, idx: number) => (
              <DialogTrigger asChild key={file}>
                <img
                  src={file}
                  className="w-30 h-30 object-cover rounded-md cursor-pointer"
                  alt="raffle"
                  onClick={() => {
                    setCurrent(idx);
                    setOpen(true);
                  }}
                />
              </DialogTrigger>
            ))}
          </div>
          <DialogContent className="max-w-lg flex flex-col items-center">
            <div className="relative w-full flex items-center justify-center">
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow"
                onClick={handlePrev}
              >
                <FaChevronLeft />
              </button>
              <img
                src={images?.[current]}
                alt={`Imagen ${current + 1}`}
                className="max-h-[400px] rounded-md mx-auto"
              />
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow"
                onClick={handleNext}
              >
                <FaChevronRight />
              </button>
            </div>
            <div className="mt-2 text-center text-xs text-gray-500">
              Imagen {current + 1} de {images?.length}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
