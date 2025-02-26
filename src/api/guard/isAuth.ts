import { useStorage } from '@vueuse/core'
import { computed } from 'vue'

export const isAuth = () => {
  const token = useStorage('token', '')
  return computed(() => !!token.value)
}
