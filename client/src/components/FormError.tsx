type Props = {
  message:any
};

export function FormError({message}: Props) {
  return (
    <p className="text-red-500">{message}</p>
  );
}