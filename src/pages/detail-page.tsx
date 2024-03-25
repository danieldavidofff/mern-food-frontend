import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/checkout-button";
import MenuItemComponent from "@/components/menu-item";
import OrderSummary from "@/components/order-summary";
import RestaurantInfo from "@/components/restaurant-info";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/user-profile-form";
import { MenuItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom"

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    //We are checking the sessionStorage if the user has any cartitems from the restaurantId
    //and we are going to return string intp the storedCart variable
    // if the storeditems exists its going to parse that string into a cartItem array or empty array;
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevCartItems) => {
      // 1. Check if the item is already in the cart
      const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id);

      let updatedCartItems;
      //2. If item is in the cart, update the quantity
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) => cartItem._id === menuItem._id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
      } else {
        //3. if item is not in the cart, add it as new item
        updatedCartItems = [
          ...prevCartItems, {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          }
        ]
      }

      //Store the cart items agains this key (cartItems) and this is going to be saved in storage
      sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      //we arre using the filter function to remove the current item that was clicked from current state
      // of cartitems that we have stored and we are returning the new array in the end
      const updatedCartItems = prevCartItems.filter((item) => cartItem._id !== item._id);

      //Store the cart items agains this key (cartItems) and this is going to be saved in storage
      sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {

    if (!restaurant) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) =>({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      }
    };
    
    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  }


  if (isLoading || !restaurant) {
    return "Loading...";
    //Add later a component to make it look fancy! :)
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img className="rounded-md object-cover h-full w-full" src={restaurant.imageUrl} alt="restaurant-image" />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant}/>
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItemComponent menuItem={menuItem} addToCart={() => addToCart(menuItem)}/>
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart}/>
            <CardFooter>
              <CheckoutButton disabled={cartItems.length === 0} onCheckout={onCheckout} isLoading={isCheckoutLoading}/>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DetailPage