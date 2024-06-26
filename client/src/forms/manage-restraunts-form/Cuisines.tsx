import { FormError } from "@/components/FormError";
import { cuisineList } from "@/config/restraunt-cuisine-options";
import { ReactNode } from "react";
import { Controller } from "react-hook-form";

export function Cuisines({ errors, control }: any) {
  return (
    <div className="flex flex-col">
      <div>
        <h1 className="font-bold text-2xl">Cuisines</h1>
        <p className="text-gray-500">
          Select cuisines offered by your restraunt
        </p>
      </div>
      <div className="mt-4">
        {errors?.cuisines && <FormError message={errors.cuisines.message} />}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
        {
          cuisineList.map((cuisine: String, index: number) => {
            return (
              <div key={index} className="flex gap-2 mt-1">
                <Controller
                  name="cuisines"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      value={cuisine as string}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...field.value, e.target.value]
                          : field.value.filter(
                              (val: string | undefined) =>
                                val !== e.target.value
                            );
                        field.onChange(newValue);
                      }}
                      checked={field.value.includes(cuisine as string)}
                    />
                  )}
                />
                <label className="font-bold" htmlFor={`cuisine-${cuisine}`}>
                  {cuisine}
                </label>
              </div>
            );
          }) as Iterable<ReactNode>
        }
      </div>
    </div>
  );
}
