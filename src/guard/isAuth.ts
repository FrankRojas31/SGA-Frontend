import { useStorage } from '@vueuse/core'
import { computed } from 'vue'

export const isAuth = () => {
  const token = useStorage('user', '')
  return computed(() => !!token.value)
}
