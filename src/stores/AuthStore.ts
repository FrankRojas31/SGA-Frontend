import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { IUserToken } from '@/interfaces/UsersTypes/Users';
import { useStorage } from '@vueuse/core';
import { LoginAccount, RegisterAccount, LogoutAccount } from '@/services/auth/userServices';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const user = ref({} as IUserToken);
  const token = useStorage('token', '');
  const isLogged = computed(() => token.value !== '' && token.value !== undefined);

  async function Login(email: string, password: string) {
    try {
      const response = await LoginAccount(email, password);

      if (response.status === 200) {
        user.value = response.data;
        token.value = user.value.token;

        await Swal.fire({
          icon: 'success',
          text: '¡Has iniciado sesión correctamente!',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        router.push('/dashboard');
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Error al iniciar sesión. Verifica tus credenciales.';
      await Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: errorMessage,
        confirmButtonText: 'Entendido',
      });
    }
  }

  async function Register(email: string, password: string) {
    try {
      const response = await RegisterAccount(email, password);

      if (response.status === 200) {
        await Swal.fire({
          icon: 'success',
          text: '¡Cuenta registrada correctamente! Ahora inicia sesión.',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        router.push('/login');
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Error al crear la cuenta. Verifica los datos.';
      await Swal.fire({
        icon: 'error',
        title: 'Error de registro',
        text: errorMessage,
        confirmButtonText: 'Entendido',
      });
    }
  }

  async function Logout() {
    try {
      const response = await LogoutAccount(user.value.token);

      if (response.status === 200) {
        user.value = {} as IUserToken;
        token.value = '';

        await Swal.fire({
          icon: 'success',
          text: '¡Has cerrado sesión correctamente!',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        router.push('/login');
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Error al cerrar sesión. Contacta al administrador.';
      await Swal.fire({
        icon: 'error',
        title: 'Error al cerrar sesión',
        text: errorMessage,
        confirmButtonText: 'Entendido',
      });
    }
  }

  return { token, isLogged, Login, Logout, Register };
});
