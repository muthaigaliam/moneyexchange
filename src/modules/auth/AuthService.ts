import { useMutation } from '@tanstack/vue-query';
import { useNotification } from '@/composables'; // Assuming this composable manages notifications
import { registerUser, loginUser } from './AuthApi';
import type { AuthPayload, AuthResponse, LoginPayload } from './AuthTypes';
import { useToast } from 'vue-toastification';
const toast = useToast();

const { error, success } = useNotification();

const useAuthService = () => {
  function useRegisterUser() {
    return useMutation<AuthResponse, Error, AuthPayload>({
      mutationFn: (payload) => registerUser(payload),
      onSuccess: (data) => {
        toast.success('Account created successfully'); // Success notification for registration
        console.log('Registered user:', data);
        // You can trigger an additional notification here if needed
        // For example, you can display the user name after successful registration:
        success('Signed in successfully, kindly Login In');
      },
      onError: (err) => {
        console.error('Registration error:', err);
        toast.error('Failed to register. Please try again.'); // Error notification for registration failure
      }
    });
  }

  function useLoginUser() {
    return useMutation<AuthResponse, Error, LoginPayload>({
      mutationFn: (payload) => loginUser(payload),
      onSuccess: (data) => {
        toast.success('Logged in successfully'); // Success notification for login
        console.log('Logged in user:', data);
      },
      onError: (err) => {
        console.error('Login error:', err);
        toast.error('Login failed. Please check your credentials.'); // Error notification for login failure
      }
    });
  }

  return {
    useRegisterUser,
    useLoginUser
  };
};

export default useAuthService;
