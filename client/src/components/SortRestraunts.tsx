interface Props {
  setSort: React.Dispatch<React.SetStateAction<string>>;
}

export function SortRestraunts({ setSort }: Props) {
  return (
    <div>
      <select
        onChange={(e) => setSort(e.target.value)}
        className="bg-gray-100 p-2 rounded-xl"
      >
        <option value="default">Sort By: Best Match</option>
        <option value="estimatedDeliveryTime">Sort By: Delivery Time</option>
        <option value="deliveryPrice">Sort By: Delivery Price</option>
      </select>
    </div>
  );
}
