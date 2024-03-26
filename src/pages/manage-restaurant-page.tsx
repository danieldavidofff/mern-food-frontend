import { useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrders, useUpdateMyRestaurant, } from '@/api/MyRestaurantApi'
import OrderItemCard from '@/components/order-item-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ManageRestaurantForm from '@/forms/manage-restaurant-form/manage-restaurant-form'

const ManageRestaurantPage = () => {
  const {createRestaurant, isLoading: isCreateLoading} = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =  useUpdateMyRestaurant();
  const {orders} = useGetMyRestaurantOrders();

  //if the restaurant exists isEditing is going to be true and if the restaurant doesn't exist
  //then they are not editing and are trying to create so isEditing is false;

  const isEditing = !!restaurant;

  return (
    <Tabs defaultValue='orders'>
      <TabsList>
        <TabsTrigger value='orders'>Orders</TabsTrigger>
        <TabsTrigger value='manage-restaurant'>Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent value='orders' className='space-y-5 bg-gray-50 p-10 rounded-lg'>
        <h2 className='text-2xl font-bold'>{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order}/>
        ))}
      </TabsContent>
      <TabsContent value='manage-restaurant'>
          <ManageRestaurantForm 
            onSave={isEditing ? updateRestaurant : createRestaurant} 
            isLoading={isCreateLoading || isUpdateLoading} 
            restaurant={restaurant}
          />
      </TabsContent>
    </Tabs>
  )
}

export default ManageRestaurantPage