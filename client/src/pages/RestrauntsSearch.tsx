import { useGetRestraunts } from "@/api/MySearchApi";
import { restrauntFormData } from "@/forms/manage-restraunts-form/ManageRestrauntForm";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SortRestraunts } from "@/components/SortRestraunts";
import { CuisinesFilter } from "@/components/CuisinesFilter";
import { Pagination } from "@/components/Paginations";
import { RestrauntSearchBar } from "@/components/RestrauntSearchBar";
import { SearchedRestraunts } from "@/components/SearchedRestraunts";
import { Loading } from "@/components/Loading";

export const SEARCH_RESTRAUNTS_LIMIT = 15;

export function RestrauntsSearch() {
  const [searchParams] = useSearchParams();
  const [restraunts, setRestraunts] = useState<[restrauntFormData] | null>(
    null
  );
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { getRestraunts, isLoading } = useGetRestraunts();
  const [selectedCuisines, setSelectedCuisines] = useState<[string | null]>([
    null,
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [sort, setSort] = useState<string>("default");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      const city = searchParams.get("city") as string;
      const country = searchParams.get("country") as string;
      const results = await getRestraunts({
        city,
        country,
        page,
        name: searchTerm,
        cuisines: selectedCuisines,
        sort: sort,
      });
      setRestraunts(results.restraunts);
      setTotalPages(results.totalPages);
    };

    if (!ignore && !modalOpen) {
      fetchData();
    }

    return () => {
      ignore = true;
    };
  }, [searchParams, page, sort, modalOpen, searchTerm]);

  return (
    <div className="flex items-center justify-center">
      <div className="p-6 flex flex-1 flex-col md:max-w-[90vw] lg:max-w-[80vw]">
        <RestrauntSearchBar setValue={setSearchTerm} />
        <div className="flex justify-center gap-2 md:justify-between w-full flex-wrap items-center">
          <CuisinesFilter
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            selectedCuisines={selectedCuisines}
            setSelectedCuisines={setSelectedCuisines}
          />
          <SortRestraunts setSort={setSort} />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-[70vh]">
            <Loading />
          </div>
        ) : (
          <SearchedRestraunts restraunts={restraunts} />
        )}
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
