import Image from "next/image";
import { SearchParamTypes } from "@/Types/SearchParamTypes";
import formatPrice from "@/util/priceFormat";
import AddCart from "./AddCart";

export default async function ProductDetail({
  searchParams,
}: SearchParamTypes) {
  return (
    <div className="flex flex-col justify-center items-center lg:flex-row lg:gap-14 pb-6">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={400}
        height={400}
        priority={true}
        className="w-full rounded-lg"
      />

      <div className="font-medium">
        <h1 className="text-2xl py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <div className="flex gap-2">
          <p className="font-bold text-primary">
            {searchParams.unit_amount !== null
              ? formatPrice(searchParams.unit_amount)
              : "N/A"}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
}
