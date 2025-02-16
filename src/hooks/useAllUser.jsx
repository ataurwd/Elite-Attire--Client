import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllUser = () => {
  const { data: alluser = [], refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = axios.get(`${import.meta.env.VITE_URL}/users`);
      return (await res).data;
    },
  });
  return [alluser, refetch];
};

export default useAllUser;
