import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { ISidebar } from '@/types/sidebar'

export const useSidebarStore = defineStore('Sidebar', () => {
  const sidebar = ref<ISidebar>(JSON.parse(localStorage.getItem('Sidebar') || '{"open": false}'))

  function ChangeSidebar() {
    sidebar.value.open = !sidebar.value.open
  }

  watch(
    sidebar,
    (sidebar) => {
      localStorage.setItem('Sidebar', JSON.stringify(sidebar))
    },
    {
      deep: true,
    }
  )
  return { ChangeSidebar, sidebar }
})
