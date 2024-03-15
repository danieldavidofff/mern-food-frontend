import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckbox = ({
  cuisine,
  field
}: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox 
          className="bg-white" 
          checked={field.value.includes(cuisine)} 
          //when onCheckChange happens the new passed checked value is going to be a boolean and
          //we are checking if the new value checked and if it's checked  we want to add the cuisine to the list of
          //cuisines the user has already selected and is creating a new array with the current cuisine list that
          //the user has selected and is adding a new cuisine to the end and is taking the array and is setting it
          //to the new value of that field and else is doing the opposite so instead of adding the current cuisine field array
          // is going to filter out the value of the existing array and return that new array without the current cuisine that we are currently on
          onCheckedChange={(checked) => {
          if (checked) {
            field.onChange([...field.value, cuisine])
          } else {
            field.onChange(field.value.filter((value: string) => value !== cuisine))
          }
        }}/>
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  )
}

export default CuisineCheckbox;

