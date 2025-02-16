import React, { useContext } from 'react';
import useAllProduct from './useAllProduct';
import { FormContext } from '../context/AuthContext';

const useUserProduct = () => {
    const [product] = useAllProduct()
    const { user } = useContext(FormContext)
    const userProduct = product.filter(p => p.userEmail === user?.email)
    return [userProduct]
};

export default useUserProduct;