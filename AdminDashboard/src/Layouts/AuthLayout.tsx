import { Navigate, Outlet } from "react-router-dom";
import { useTokenStore } from "@/zustandStore";
const AuthLayout = () => {
  const token = useTokenStore.getState().token;
  if (token) {
    return <Navigate to={"/home"} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
