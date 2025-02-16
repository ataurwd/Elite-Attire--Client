import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useAllProduct = () => {
    const { data: product = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = axios.get(`${import.meta.env.VITE_URL}/allProduct`)
            return (await res).data;
        }
        
    })
    return [product, refetch];
};

export default useAllProduct;