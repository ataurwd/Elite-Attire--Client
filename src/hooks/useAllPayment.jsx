import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useAllPayment = () => {
    const { data: payment = [], refetch: reFetch, isLoading } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
          const res = axios.get(`${import.meta.env.VITE_URL}/payment`);
          return (await res).data;
        },
      });
      return [payment, reFetch,isLoading];
};

export default useAllPayment;