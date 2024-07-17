import { Button } from "./ui/button";

interface Props {
  selected: [string | null];
  setSelected: Function;
  value: string;
}

export function FilterOption({ selected, setSelected, value }: Props) {
  const handleSelectedFilters = () => {
    const isSelected = selected.includes(value);
    isSelected
      ? setSelected(
          selected.filter((selectedValue) => {
            return selectedValue !== value;
          })
        )
      : setSelected([...selected, value]);
  };

  return (
    <button
      onClick={handleSelectedFilters}
      className={`border m-1 p-4 rounded-xl transition-all ${
        selected.includes(value) && "bg-orange-400 text-white"
      } hover:scale-105`}
    >
      {value}
    </button>
  );
}
