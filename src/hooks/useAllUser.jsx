import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useAllUser = () => {
    const secureAxios = useAxios()
    const { data: alluser = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = secureAxios.get(`/users`)
            return (await res).data;
        }
        
    })
    return [alluser, refetch];
};

export default useAllUser;