<script lang="ts" setup>
import AppLogo from '@/layouts/global/AppLogo.vue'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { RouterLink } from 'vue-router'
import * as yup from 'yup'

const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().required('El correo es requerido').email('Correo Incorrecto'),
      password: yup
        .string()
        .required('La contraseña es requerida')
        .min(8, 'La contraseña debe tener al menos 8 caracteres'),
      duoPassword: yup
        .string()
        .required('Debes confirmar la contraseña')
        .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
    })
  ),
})

const [email, emailAttrs] = defineField('email', {
  validateOnModelUpdate: true,
})

const [password, passwordAttrs] = defineField('password', {
  validateOnModelUpdate: true,
})

const [duoPassword, duoPasswordAttrs] = defineField('duoPassword', {
  validateOnModelUpdate: true,
})

const RegisterAccount = handleSubmit((values) => {
  if (Object.keys(errors.value).length === 0) {
    console.log('Form is valid, proceeding with registration:', values)
    // auth.Register(values.email, values.password)
  } else {
    console.error('Form has errors:', errors.value)
  }
})
</script>

<template>
  <div class="font-sans">
    <div
      class="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 bg-[url('@/assets/images/background-login.jpg')]"
    >
      <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div class="relative sm:max-w-sm w-full">
        <div class="card bg-gray-500 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-7"></div>
        <div class="card bg-gray-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
        <div class="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
          <AppLogo :route="false" />
          <label class="block mt-2 text-md text-gray-800 text-center font-semibold uppercase">
            Registrar Cuenta
          </label>
          <form class="mt-2" @submit.prevent="RegisterAccount">
            <label class="block mb-2 text-sm font-medium">Correo Electrónico</label>
            <div
              class="relative"
              v-bind="emailAttrs"
              :class="{ 'mb-4': !errors.email, 'mb-1': errors.email }"
            >
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  class="w-5 h-5"
                  :class="{ 'text-gray-400': !errors.email, 'text-red-400': errors.email }"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <input
                type="email"
                v-model="email"
                v-bind="emailAttrs"
                :class="{
                  'border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5': true,
                  'border-gray-300': !errors.email,
                  'border-red-500': errors.email,
                }"
                placeholder="ejemplo@gmail.com"
                required
              />
            </div>
            <div v-show="errors.email" class="mb-2">
              <span v-if="errors.email" class="font-sans text-red-400 text-sm">
                {{ errors.email }}
              </span>
            </div>

            <label class="block mb-2 text-sm font-medium">Contraseña</label>
            <div
              class="relative"
              v-bind="passwordAttrs"
              :class="{ 'mb-4': !errors.password, 'mb-1': errors.password }"
            >
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5"
                  :class="{ 'text-gray-400': !errors.password, 'text-red-400': errors.password }"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                v-model="password"
                type="password"
                v-bind="passwordAttrs"
                :class="{
                  'border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5': true,
                  'border-gray-300': !errors.password,
                  'border-red-500': errors.password,
                }"
                placeholder="••••••••"
                required
              />
            </div>
            <div v-show="errors.password" class="mb-2">
              <span v-if="errors.password" class="text-red-400 text-sm">{{ errors.password }}</span>
            </div>

            <label class="block mb-2 text-sm font-medium">Repite Contraseña</label>
            <div
              class="relative"
              v-bind="duoPasswordAttrs"
              :class="{ 'mb-6': !errors.duoPassword, 'mb-3': errors.duoPassword }"
            >
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-5"
                  :class="{ 'text-gray-400': !errors.duoPassword, 'text-red-400': errors.duoPassword }"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                v-model="duoPassword"
                type="password"
                v-bind="duoPasswordAttrs"
                :class="{
                  'border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5': true,
                  'border-gray-300': !errors.duoPassword,
                  'border-red-500': errors.duoPassword,
                }"
                placeholder="••••••••"
                required
              />
            </div>
            <div v-show="errors.duoPassword" class="mb-4">
              <span v-if="errors.duoPassword" class="text-red-400 text-sm">{{ errors.duoPassword }}</span>
            </div>

            <div class="mt-6">
              <button
                class="bg-gray-500 w-full py-3 rounded-md text-white shadow-xl transition duration-300 ease-in-out transform hover:-translate-x hover:scale-101 hover:bg-gray-600"
                :disabled="Object.keys(errors).length > 0"
              >
                Registrar
              </button>
            </div>

            <div class="mt-4 mb-4">
              <div class="w-full text-center">
                <label class="text-sm">¿Ya tienes cuenta?</label>
                <RouterLink to="/login" class="underline text-sm text-gray-600 hover:text-gray-900">
                  Inicia Sesión
                </RouterLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
