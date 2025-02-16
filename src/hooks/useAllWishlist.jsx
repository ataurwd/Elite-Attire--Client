import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useAllWishlist = () => {
    const { data: wishlist = [], refetch: reload } = useQuery({
        queryKey: ["wishlist"],
        queryFn: async () => {
          const res = axios.get(`${import.meta.env.VITE_URL}/wishlist`);
          return (await res).data;
        },
      });
      return [wishlist, reload];
};

export default useAllWishlist;