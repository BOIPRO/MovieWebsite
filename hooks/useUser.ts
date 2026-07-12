// hooks/useUser.js (Custom Hook cho gọn code)
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/services/axios';
import { useAuthStore } from '@/lib/services/useAuthStore';
export const useUser = () => {
  const {isAuthChecked  } = useAuthStore();
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const { data } = await api.get('auth/me');
      return data;
    }, 
    enabled: isAuthChecked,
   retry : false,
   staleTime: 15 * 60 * 1000, 
    gcTime: 30 * 60 * 1000,
  });
};