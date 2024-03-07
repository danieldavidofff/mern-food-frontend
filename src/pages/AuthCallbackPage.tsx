import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();

  const hasCreatedUser = useRef(false);

  // When the page first load hasCreatedUser is going to be false so because is false
  //the if statement is going to run and  is going to go and create the user and once is done
  // we are going to update the ref state value to true and this insure that the useEffect runs only once
  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      //!hasCreatedUser.current => if hasCreatedUser is false
      createUser({auth0Id: user.sub, email: user.email});
      hasCreatedUser.current = true;
    }
    navigate("/");
  },[createUser, navigate, user]);

  return (
    <>Loading...</>
  )
}

export default AuthCallbackPage