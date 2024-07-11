import { queryParams, useGetRestraunts } from "@/api/MySearchApi";
import { Button } from "@/components/ui/button";
import { cuisineList } from "@/config/restraunt-cuisine-options";
import { restrauntFormData } from "@/forms/manage-restraunts-form/ManageRestrauntForm";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FilterOption } from "@/components/CuisineFilter";
import { DialogClose } from "@radix-ui/react-dialog";
import { AdvanceImage } from "@/components/AdvanceImage";

export const SEARCH_RESTRAUNTS_LIMIT = 15;

export function RestrauntsSearch() {
  const [searchParams] = useSearchParams();
  const [restraunts, setRestraunts] = useState<[restrauntFormData] | null>(
    null
  );
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { getRestraunts, isLoading } = useGetRestraunts();
  const isTotalPagesFetched = useRef<boolean>(false);
  const [selectedCuisines, setSelectedCuisines] = useState<[string]>([""]);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      const city = searchParams.get("city");
      const country = searchParams.get("country");
      const results = await getRestraunts({
        city,
        country,
        page,
        limit: SEARCH_RESTRAUNTS_LIMIT,
      } as queryParams);
      setRestraunts(results.restraunts);
      if (!isTotalPagesFetched.current) {
        setTotalPages(results.totalPages);
        isTotalPagesFetched.current = true;
      }
    };

    if (!ignore) {
      fetchData();
    }

    return () => {
      ignore = true;
    };
  }, [searchParams, page]);

  const handleSearchFilter = () => {};

  return (
    <div className="p-6 flex flex-1 flex-col">
      <div className="flex justify-between">
        <Dialog>
          <DialogTrigger>
            <div className="border p-2 rounded-lg bg-gray-100">
              Filter By Cuisines
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Cuisines</DialogTitle>
              <DialogDescription className="text-center">
                <div>
                  {cuisineList.map((cuisine) => {
                    return (
                      <FilterOption
                        selected={selectedCuisines}
                        setSelected={setSelectedCuisines}
                        value={cuisine}
                      />
                    );
                  })}
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogClose>
              <Button onClick={handleSearchFilter}>Apply Filters</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <div>Sort</div>
      </div>

      <div className="mt-4 flex flex-col flex-1">
        {restraunts && (
          <div className="flex-1">
            {restraunts.map((restraunt) => {
              return (
                <div className="w-full" key={restraunt._id}>
                  <div className="flex w-full gap-4">
                    <div className="w-[20vw] h-[20vh] object-cover">
                    <AdvanceImage photo={restraunt.image} />
                    </div>
                    <div>
                      <h1>{restraunt.name}</h1>
                      <p>Cuisines</p>
                    </div>
                    <div>
                      <p>{restraunt.estimatedDeliveryTime}</p>
                      <p>Delivery From Rs.{restraunt.deliveryPrice}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex gap-2 items-center justify-center">
          <Button
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
            variant="ghost"
          >
            Previous
          </Button>
          {page > 1 && (
            <Button onClick={() => setPage(page - 1)} variant="ghost">
              {page - 1}
            </Button>
          )}
          <Button variant="default">{page}</Button>
          {page < totalPages && (
            <Button onClick={() => setPage(page + 1)} variant="ghost">
              {page + 1}
            </Button>
          )}
          <p>...</p>
          <Button
            variant="ghost"
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
