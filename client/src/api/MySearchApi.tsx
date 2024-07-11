import { SEARCH_RESTRAUNTS_LIMIT } from "@/pages/RestrauntsSearch";
import axios from "axios";
import { useMutation } from "react-query";

export interface queryParams{
  city:String,
  country:String,
  page:Number,
}

export function useSearchAutocomplete() {
  const handleAutocomplete = async (query: String) => {
    const res = await axios.get(
      `https://api.geoapify.com/v1/geocode/autocomplete`,
      {
        params: {
          text: query,
          lang: "en",
          limit: "10",
          type: "city",
          apiKey: "c526bac0288d4430b41ad66ee2676eb6",
        },
      }
    );

    return res.data.features;
  };

  const {
    mutateAsync: getLocations,
    isLoading,
    isError,
  } = useMutation(handleAutocomplete);

  return { getLocations, isLoading, isError };
}

export function useGetRestraunts() {
  const handleGetRestraunts = async ({city, country, page}:queryParams) => {
    try {
      const res = await axios.get(`/api/my/search`, {
        params: {
          city: city,
          country: country,
          page:page,
          limit:SEARCH_RESTRAUNTS_LIMIT
        },
      });
      return res.data;
    } catch (err) {
      throw new Error(err as any);
    }
  };

  const {
    mutateAsync: getRestraunts,
    isLoading,
    isError,
  } = useMutation(handleGetRestraunts);

  return {
    getRestraunts,
    isLoading,
    isError,
  };
}
