import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { disconnectSocket } from "../services/socket";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get("/auth/me")
      .then((result) => {
        setUser(result.user);
        setHospital(result.hospital);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  const login = async (credentials) => {
    const result = await api.post("/auth/login", credentials);
    setUser(result);
    const current = await api.get("/auth/me");
    setUser(current.user);
    setHospital(current.hospital);
    return current.user;
  };
  const signupPatient = async (payload) => {
    await api.post("/auth/signup/patient", payload);
    const current = await api.get("/auth/me");
    setUser(current.user);
    setHospital(current.hospital);
    return current.user;
  };
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      disconnectSocket();
      setUser(null);
      setHospital(null);
    }
  };
  const value = useMemo(
    () => ({ user, hospital, loading, login, signupPatient, logout }),
    [user, hospital, loading],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
