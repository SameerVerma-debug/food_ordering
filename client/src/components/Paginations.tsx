import { Button } from "./ui/button";

interface Props{
  page:number,
  setPage:React.Dispatch<React.SetStateAction<number>>,
  totalPages:number
}

export function Pagination({page,setPage,totalPages} : Props) {
  return (
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
  );
}
