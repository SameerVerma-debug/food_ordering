type Props = {
  message:String | undefined | null
};

export function FormError({message}: Props) {
  return (
    <p className="text-red-500">{message}</p>
  );
}