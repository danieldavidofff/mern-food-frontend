import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user")
    }
  };

  const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess
  };
};

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
}

export const useUpdateMyUser = () => {
  const {getAccessTokenSilently} = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error("Failed to update profile")
    }

    return response.json();
  };
  // Changing the name mutateAsync to updateUser so we know what we are doing, know easier!
  const { mutateAsync: updateUser, isLoading, isSuccess, error, reset } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success("User profile updated!")
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    updateUser,
    isLoading
  };
};

export const useGetMyUser = () => {
  const { getAccessTokenSilently} = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

   // Renaming the data to currentUser so you know what are you getting back

  const { data: currentUser, isLoading, error } = useQuery("fetchCurrentUser", getMyUserRequest);

  if (error) {
    toast.error(error.toString())
  }

  return {currentUser, isLoading};
};