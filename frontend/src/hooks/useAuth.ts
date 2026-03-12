import { useState } from 'react';
import axios from 'axios';
import { authApi } from '../api/authApi';
import type { LoginRequest, SignupRequest } from '../types/auth';

function extractErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err) && err.response?.data) {
    const data = err.response.data;
    if (typeof data.message === 'string') return data.message;
    const firstValue = Object.values(data)[0];
    if (typeof firstValue === 'string') return firstValue;
  }
  return fallback;
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (data: SignupRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      await authApi.signup(data);
      return true;
    } catch (err: unknown) {
      setError(extractErrorMessage(err, '회원가입에 실패했습니다.'));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authApi.login(data);
      return res.data.accessToken;
    } catch (err: unknown) {
      setError(extractErrorMessage(err, '로그인에 실패했습니다.'));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, login, isLoading, error };
}
