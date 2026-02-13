import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { resetAuthState } from "../store/slices/auth/auth.slice";
import { refreshUserToken, verifyUser } from "../store/slices/auth/auth.thunk";
import MedLoader from "../components/Loader";

const ProtectedRoute = ({ allowedRoles }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.common.auth);

  const [checking, setChecking] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const verifyResult = await dispatch(verifyUser());

        if (verifyResult?.payload?.success) {
          setIsVerified(true);
          return;
        }

        const refreshResult = await dispatch(refreshUserToken());

        if (refreshResult?.payload?.success) {
          const retryVerify = await dispatch(verifyUser());

          if (retryVerify?.payload?.success) {
            setIsVerified(true);
            return;
          }
        }

        dispatch(resetAuthState());
        setIsVerified(false);
      } catch (error) {
        dispatch(resetAuthState());
        setIsVerified(false);
      } finally {
        setChecking(false);
      }
    };

    authenticate();
  }, [dispatch]);

  if (checking) {
    return <MedLoader />;
  }

  if (!isVerified || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
