import { useStorage } from '@vueuse/core'
import { computed } from 'vue'

export const isAuth = () => {
  const refreshToken = useStorage('refreshToken', '')
  const accessToken = useStorage('accessToken', '')
  return computed(() => !!refreshToken.value && !!accessToken.value)
}
