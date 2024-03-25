import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout";
import HomePage from "@/pages/home-page";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/user-profile-page";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/manage-restaurant-page";
import SearchPage from "./pages/search-page";
import DetailPage from "./pages/detail-page";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout showHero><HomePage/></Layout>}/>
      <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
      <Route path="/search/:city" element={<Layout showHero={false}><SearchPage/></Layout>}/>
      <Route path="/detail/:restaurantId" element={<Layout showHero={false}><DetailPage/></Layout>}/>

      <Route element={<ProtectedRoute/>}>
        <Route path="/user-profile" element={<Layout><UserProfilePage/></Layout>}/>
        <Route path="/manage-restaurant" element={<Layout><ManageRestaurantPage/></Layout>}/>
      </Route>
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  );
};

export default AppRoutes;