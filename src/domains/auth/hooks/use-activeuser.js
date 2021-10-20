import { useQuery } from 'react-query';
import { getActiveUser } from '../auth.service';
import { useAuth } from '..';

export const useActiveUser = () => {
    const { accessToken } = useAuth();
    return useQuery(['activeUser', accessToken], () =>
        getActiveUser(accessToken, {
            staleTime: 3000,
        })
    );
};
