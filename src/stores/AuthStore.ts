import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IUserToken } from '@/interfaces/UsersTypes/Users';
import { useStorage } from '@vueuse/core';
import { LoginAccount, RegisterAccount } from '@/services/auth/userServices';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { LogoutAccount } from '../services/auth/userServices';

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

        Swal.fire({
          icon: "success",
          text: "¡Has iniciado sesión correctamente!",
          timerProgressBar: true,
          timer: 3000
        });

        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Error al iniciar sesión. Verifica tus credenciales.",
      });
    }
  };

  async function Register(email: string, password: string){
    try
    {
      const response = await RegisterAccount(email, password);
      if(response.status === 200) {
        Swal.fire({
          icon: "success",
          text: "¡Se ha registrado correctamente la cuenta!",
          timerProgressBar: true,
          timer: 3000
        });

        setTimeout(() => {
          router.push("/login")
        }, 3000)
      }
    }
    catch(error){
      Swal.fire({
        icon: "error",
        text: "Error al crear cuenta. Verifica el error.",
      });
    }
  }

  async function Logout(){
    try
    {
      const response = await LogoutAccount(user.value.token);
      if (response.status === 200){
        user.value = {} as IUserToken;
        token.value = '';

        Swal.fire({
          icon: 'success',
          text: 'Usuario deslogueado correctamente',
          timer: 3000,
          timerProgressBar: true
        })

        setTimeout(() => {
          router.push("/login");
        }, 3000)
      }
    }
    catch(error){
      Swal.fire({
        icon: "error",
        text: "Error al cerrar sesión. Verifica el error con el administrador.",
      });
    }
  }



  return { token, isLogged, Login, Logout, Register}
})
