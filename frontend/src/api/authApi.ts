import api from './axiosInstance';
import type { LoginRequest, SignupRequest, TokenResponse, User } from '../types/auth';

export const authApi = {
  signup: (data: SignupRequest) =>
    api.post<void>('/auth/signup', data),

  login: (data: LoginRequest) =>
    api.post<TokenResponse>('/auth/login', data),

  getMe: () =>
    api.get<User>('/auth/me'),
};
