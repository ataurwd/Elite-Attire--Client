import React, { useContext } from 'react';
import useAllProduct from './useAllProduct';
import { FormContext } from '../context/AuthContext';
import useAllWishlist from './useAllWishlist';

const useUserProduct = () => {
    const [product, refetch] = useAllProduct()
    const [wishlist] = useAllWishlist()
    const { user } = useContext(FormContext)
    const userProduct = product.filter(p => p.userEmail === user?.email)

    // to show login user wishlis data
    const wishlistData = wishlist.filter(p => p.email === user?.email)
    return [userProduct, wishlistData, refetch]
};

export default useUserProduct;