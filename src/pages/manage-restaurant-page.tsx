import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant, } from '@/api/MyRestaurantApi'
import ManageRestaurantForm from '@/forms/manage-restaurant-form/manage-restaurant-form'

const ManageRestaurantPage = () => {
  const {createRestaurant, isLoading: isCreateLoading} = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =  useUpdateMyRestaurant();

  //if the restaurant exists isEditing is going to be true and if the restaurant doesn't exist
  //then they are not editing and are trying to create so isEditing is false;

  const isEditing = !!restaurant;

  return (
    <ManageRestaurantForm 
      onSave={isEditing ? updateRestaurant : createRestaurant} 
      isLoading={isCreateLoading || isUpdateLoading} 
      restaurant={restaurant}
    />
  )
}

export default ManageRestaurantPage