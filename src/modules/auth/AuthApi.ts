import { Http } from '@/http';
import type { AuthPayload, AuthResponse,LoginPayload  } from './AuthTypes';

export async function registerUser(payload: AuthPayload): Promise<AuthResponse> {
  const response = await Http.post<AuthResponse>(
    '/users/signup',
    payload,
    {}
  );

  if (!response) {
    throw new Error('Failed to register user: Response is undefined');
  }

  return response;
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
    const response = await Http.post<AuthResponse>(
      '/customer/login', 
      payload,
      {}
    );

    if (!response) {
      throw new Error('Failed to login user: Response is undefined');
    }

    return response;
  }


