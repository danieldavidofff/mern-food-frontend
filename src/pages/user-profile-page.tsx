import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/user-profile-form"

const UserProfilePage = () => {
  const { updateUser, isLoading: isGetLoading } = useUpdateMyUser();
  const {currentUser, isLoading: isUpdateLoading} = useGetMyUser();

  if (isGetLoading) {
    //TODO: ADD Loading Component to make it more pretty / react-spinners / PuffLoader or PulseLoader
    return <span>Loading...</span>
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>
  }

  return (
    <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading}/>
  )
}

export default UserProfilePage;