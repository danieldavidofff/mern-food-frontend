import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void; 
}


const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick
}: Props) => {
  const handleCuisineReset = () => onChange([]);
  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;
    //if isChecked is true or false.. So if the cuisine is checked (true) then
    //we are creating a new array and we are copying all the current selected cuisines that the user is chosen
    // and we are going to add the clicked cuisine on to the end,
    // and if isChecked is false is using the filter function to remove clicked cuisine from the existing cuisine array and
    // is going to return a new array without the clicked cuisine in it and then is going to assign either of the 
    //two results into the newCuisineList variable
    const newCuisinesList = isChecked ? [...selectedCuisines, clickedCuisine] : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisinesList);
  }

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">
          Filter By Cuisine
        </div>
        <div 
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
          onClick={handleCuisineReset}
        >
          Reset Filters
        </div>
      </div>
      {/*  */}
      <div className="space-y-2 flex flex-col">
        {cuisineList.slice(0, isExpanded ? cuisineList.length : 7).map((cuisine) => {
          //We are checking if the mapped cuisine is selected or not and we are saving it to the isSelected variable
          const isSelected = selectedCuisines.includes(cuisine);
          return (
            <div className="flex">
              <input 
                id={`cuisine_${cuisine}`} 
                type="checkbox" className="hidden" 
                value={cuisine} 
                checked={isSelected}
                onChange={handleCuisinesChange}
              />
              <Label 
                htmlFor={`cuisine_${cuisine}`}
                className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                  isSelected ? "border border-green-600 text-green-600": "border border-slate-300"}`}

              >
                {isSelected && (
                  <Check size={20} strokeWidth={3}/>
                )}
                {cuisine}
                </Label>
            </div>
          )
        })}
      </div>
      <Button 
        onClick={onExpandedClick} 
        variant="link" 
        className="mt-4 flex-1"
        >
        {isExpanded ? (
          <span className="flex flex-row items-center">
            View Less <ChevronUp/>
          </span>
        ) : (
          <span className="flex flex-row items-center">
            View More <ChevronDown/>
          </span>
        )}
      </Button>
    </>
  )
}

export default CuisineFilter