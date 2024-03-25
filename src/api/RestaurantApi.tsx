import { SearchState } from "@/pages/search-page";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (searchState: SearchState, city?: string) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption)
    const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Failed to get restaurant")
    }

    return response.json();
  };
//if the city is undefined then the query won't run
  const { data: results, isLoading } = useQuery(["searchRestaurants",  searchState], createSearchRequest, {enabled: !!city});

  return {
    results,
    isLoading
  };
};

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`);
    if (!response.ok) {
      throw new Error("Failed to get restaurant")
    }

    return response.json();
  };

  //We are telling reactQuery to enable this query  if we have restaurantId
  //This prevent the query to trigger the first time when we don't have an id as the backend 
  //will give an error so it's a waste of api request
  const { data: restaurant, isLoading } = useQuery("fetchRestaurant", getRestaurantByIdRequest, {
    enabled: !!restaurantId
  });

  return {
    restaurant,
    isLoading
  };
};