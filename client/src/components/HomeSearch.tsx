import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { useSearchAutocomplete } from "@/api/MySearchApi";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { AutoComplete } from "./Autocomplete";

export interface location {
  properties: {
    city: String;
    country: String;
    formatted: String;
  };
}

export function HomeSearch() {
  const [autocompleteResults, setAutocompleteResults] = useState<
    [location] | null
  >(null);
  const { getLocations, isLoading } = useSearchAutocomplete();
  const [autocompleteDisplay, setAutocompleteDisplay] = useState(false);
  const autocompleteRef = useRef(null);

  useOutsideClick(autocompleteRef, setAutocompleteDisplay);

  const handleAutoComplete = async () => {
    const query = searchRef.current?.value as String;
    if (query?.length < 3) {
      setAutocompleteDisplay(false);
      return;
    }

    const locations = await getLocations(query as String);
    setAutocompleteResults(locations);
    setAutocompleteDisplay(true);
  };

  const searchRef = useRef<HTMLInputElement | null>(null);
  return (
    <div
      ref={autocompleteRef}
      className="shadow-2xl z-50 rounded-xl p-8 mx-6 flex flex-col items-center gap-2"
    >
      <h1 className="text-orange-500 font-bold text-3xl">
        Tuck into a takeaway today
      </h1>
      <p>Food is just a click away!</p>
      <div className="gap-2 border p-1 rounded-xl border-gray-300 flex flex-1 w-full relative">
        <input
          type="text"
          className="w-full outline-none bg-inherit p-2"
          placeholder="Search by City or Town"
          onChange={handleAutoComplete}
          ref={searchRef}
        />

        <AutoComplete
          isLoading={isLoading}
          results={autocompleteResults}
          display={autocompleteDisplay}
        />
      </div>
    </div>
  );
}
