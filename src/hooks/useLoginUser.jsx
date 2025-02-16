import React, { useContext } from 'react';
import { FormContext } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useLoginUser = () => {
    const { user } = useContext(FormContext);

    const { data: loginUser = [], refetch, isLoading } = useQuery({
      queryKey: ["user", user?.email],
      queryFn: async () => {
        const res = await axios.get(`${import.meta.env.VITE_URL}/users/${user.email}`);
        return res.data;
      },
    });
  
    return [loginUser, refetch, isLoading];
};

export default useLoginUser;