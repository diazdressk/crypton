import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';
import { LoginInput, RegisterInput } from '../lib/schemas';

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: RegisterInput) => {
      return api.register(data.email, data.password);
    },
    onSuccess: () => {
      navigate('/login');
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginInput) => {
      return api.login(data.email, data.password);
    },
    onSuccess: (data) => {
      Cookies.set('token', data.token, {
        expires: 7,
        secure: true,
        sameSite: 'strict'
      });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      navigate('/profile');
    },
  });
}

export function useProfile() {
  const navigate = useNavigate();

  return useQuery({
    queryKey: ['profile'],
    queryFn: api.getProfile,
    retry: false,
    throwOnError(error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        Cookies.remove('token');
        navigate('/login');
      }
      return false;
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    Cookies.remove('token');
    queryClient.clear();
    navigate('/login');
  };
}