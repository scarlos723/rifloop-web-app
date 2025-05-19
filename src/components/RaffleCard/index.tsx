import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import type { Raffle } from "@/models/raffles.model";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export const RaffleCard = (props: { item: Raffle }) => {
  const { item } = props;
  const [showDescription, setShowDescription] = useState(false);
  const navigate = useNavigate();
  const dateToFormatString = (date?: Date) => {
    return date ? format(date, "yyyy-MM-dd") : "Hasta vender todos los tikets"; // Formato YYYY-MM-DD
  };
  const descRef = useRef<HTMLDivElement>(null);
  const formatNumberToCurrency = (number: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };
  useEffect(() => {
    if (!showDescription) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (descRef.current && !descRef.current.contains(event.target as Node)) {
        setShowDescription(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDescription]);
  return (
    <article className="border shadow-md p-5 mb-4 rounded-lg flex flex-col box-content md:w-[220px] lg:w-[232px]">
      <div className=" w-full h-[200px] border rounded-md overflow-hidden shadow mb-2">
        {(item?.images ?? []).length > 0 ? (
          <img
            src={(item.images ?? [])[0]}
            alt="item image "
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <small>
              <p className="text-center text-gray-500">
                No hay imagen disponible
              </p>
            </small>
          </div>
        )}
      </div>
      <div className="h-[200px]">
        <h2 className="font-bold capitalize text-xl line-clamp-3">
          {item.title} moto asd 2323 de 2010 a
        </h2>
        <div className="relative inline-block" ref={descRef}>
          <span
            className="text-gray-500 font-bold underline line-clamp-1  cursor-pointer"
            onClick={() => setShowDescription(true)}
          >
            {item.description}
          </span>
          {showDescription && (
            <div className="absolute left-1/2 z-10 w-64 -translate-x-1/2 mt-2 px-4 py-2 rounded bg-gray-900 text-white text-sm ">
              {item.description}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptate aut nostrum nam doloribus dolor dolore optio mollitia
              neque consectetur nesciunt rem ducimus provident, in vitae
              reprehenderit molestiae nihil? Fugit, in.
            </div>
          )}
        </div>
        <div>
          <p>
            <strong>Sorteo:</strong>{" "}
          </p>
          <p className="text-sm line-clamp-2">
            {dateToFormatString(item?.finishDate) || ""}{" "}
          </p>
        </div>
      </div>
      <div className="ml-auto">
        <p className="text-right">
          <strong className="text-sm">
            {formatNumberToCurrency(item.price)} COP
          </strong>
        </p>
        <Button
          type="button"
          onClickCapture={() => {
            navigate(`${ROUTES.DASHBOARD.RAFFLE}?raffleId=${item.id}`);
          }}
        >
          Comprar ticket
        </Button>
      </div>
    </article>
  );
};
