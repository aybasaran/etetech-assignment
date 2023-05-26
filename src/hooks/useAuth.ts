import { useQuery } from "@tanstack/react-query";
import api from "../api";

const useAuth = () => {
  const { data } = useQuery(["profile"], async () => {
    try {
      const { data, status } = await api.get("/auth/me");
      if (status === 200) {
        return data;
      }
      return null;
    } catch (error) {
      return null;
    }
  });

  return { user: data };
};

export default useAuth;
