import { restrauntFormData } from "@/forms/manage-restraunts-form/ManageRestrauntForm";
import { AdvanceImage } from "./AdvanceImage";
import { IoMdTime } from "react-icons/io";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

interface Props {
  restraunts: [restrauntFormData] | null;
}

export function SearchedRestraunts({ restraunts }: Props) {
  return (
    <div className="mt-10 mb-10 flex flex-col flex-1 items-center w-full">
      {restraunts && restraunts.length ? (
        <div className="flex-1 flex flex-col gap-10 w-full">
          {restraunts.map((restraunt) => {
            return (
              <Link to={`/restraunt/${restraunt._id}`} className="flex w-full bg-gray-50 rounded-lg overflow-hidden justify-between md:h-[200px] bg-black-100 hover:scale-[1.01] transition-all duration-200 cursor-pointer" key={restraunt._id}>
                <div className="md:flex w-full gap-2 grid">
                  <div className="md:h-full h-[170px] md:max-w-[300px] w-full restraunt-image mb-2">
                    <AdvanceImage photo={restraunt.image} />
                  </div>
                  <div className="w-full md:w-[55%] lg:w-[50%] md:mt-4 pl-4">
                    <h1 className="font-bold text-xl">{restraunt.name}</h1>
                    <div className="flex flex-wrap items-center">
                      {restraunt.cuisines &&
                        restraunt.cuisines.map((cuisine,index) => {
                          return (
                            <div className="flex items-center mr-2 gap-1">
                              <p className="mb-1">{cuisine}</p>
                              {index < restraunt.cuisines.length - 1 && <GoDotFill size={12}/>}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="flex items-right flex-col flex-1 md:mt-4 pl-4 pb-4 pr-4">
                    <div className="flex items-center gap-1 text-green-600">
                      <IoMdTime />
                      <p>{restraunt.estimatedDeliveryTime} mins</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMoneyBillAlt />
                      <p>Delivery From Rs. {restraunt.deliveryPrice}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : <div className="flex justify-center h-[50vh] items-center text-2xl font-bold">No Restraunts Found</div>}
    </div>
  );
}
