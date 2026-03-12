import { useState } from 'react';
import { authApi } from '../api/authApi';
import type { LoginRequest, SignupRequest } from '../types/auth';

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
      const message =
        err instanceof Error ? err.message : '회원가입에 실패했습니다.';
      setError(message);
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
      const message =
        err instanceof Error ? err.message : '로그인에 실패했습니다.';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, login, isLoading, error };
}
