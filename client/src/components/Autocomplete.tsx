import { Link } from "react-router-dom";
import { Loading } from "./Loading";
import { location } from "./HomeSearch";

interface Props {
  isLoading: Boolean;
  results: [location] | null;
  display: boolean;
}

export function AutoComplete({ isLoading, results, display }: Props) {
  return (
    <>
      {isLoading ? (
        <div className="absolute max-h-[30vh] bg-gray-100 top-[3.5em] w-full p-4 flex flex-col gap-2 items-center">
          <Loading />
        </div>
      ) : (
        results &&
        results.length > 0 &&
        display && (
          <div className="absolute overflow-y-scroll overflow-x-hidden max-h-[30vh] bg-gray-100 top-[3.5em] w-full pt-4 flex flex-col gap-2 items-center">
            {results.map((location: location, index: number) => {
              return (
                <Link
                  to={`/search?city=${location.properties.city}&country=${location.properties.country}`}
                  key={index}
                  className="w-full text-center border-b-2 p-2 border-white hover:scale-105 transition-all"
                >
                  <p>{location.properties.formatted}</p>
                </Link>
              );
            })}
          </div>
        )
      )}
    </>
  );
}
