<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useAuthStore } from '../../stores/AuthStore'
  import { addComentts } from '@/services/attacks/xssServices'
  import type { IComments, ICommentSend } from '@/interfaces/attacks/xss'
  import Swal from 'sweetalert2'
  import { GetCommentss } from '../../services/attacks/xssServices'

  const userId = useAuthStore()
  const commentIn = ref('')
  const comments = ref<IComments[]>([])

  console.log(userId.user.id)

  const HandleSubmit = async () => {
    const comment = commentIn.value.trim()

    if (comment.length === 0) {
      Swal.fire({
        icon: 'error',
        title: '¡Comentario Vacio!',
        text: 'Tu comentario esta fuera de lugar XD',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
    } else {
      const body: ICommentSend = {
        user_id: userId.user.id,
        comment: comment,
      }
      const results = await addComentts(body)

      if (results.status === 200) {
        Swal.fire({
          title: 'Correcto',
          text: 'Tu comentario se ha agregado correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        })

        commentIn.value = ''

        await GetComments()
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrio un error',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        })
      }
    }
  }

  const GetComments = async () => {
    const results = await GetCommentss()
    comments.value = results.data.results
  }

  onMounted(async () => {
    await GetComments()
  })
</script>

<template>
  <div class="">
    <h2 class="font-bold">Ataque XSS</h2>

    <div class="relative mt-4 w-full">
      <form @submit.prevent="HandleSubmit">
        <textarea
          v-model="commentIn"
          class="w-full shadow-inner p-4 border-0 mb-4 rounded-lg focus:shadow-outline text-md"
          placeholder="Escribe tu comentario...."
          cols="6"
          rows="6"
          id="comment_content"
          spellcheck="false"
        ></textarea>
        <button
          class="font-bold py-2 px-4 w-full bg-green-600 hover:bg-green-700 text-lg text-white shadow-md rounded-lg"
        >
          Comentar
        </button>
      </form>
      <div class="mt-4" v-for="comment in comments" :key="comment.id">
        <div
          class="bg-white rounded-lg p-3 flex flex-col justify-center items-center md:items-start shadow-lg mb-4"
        >
          <div class="flex flex-row justify-center mr-2">
            <img
              alt="avatar"
              width="48"
              height="48"
              class="rounded-full w-10 h-10 mr-4 shadow-lg mb-4"
              src="https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png"
            />
            <h3 class="text-gray-600 font-semibold text-lg text-center md:text-left">
              @Usuario Destacado
            </h3>
          </div>

          <div
            v-html="comment.comment"
            style="width: 90%"
            class="text-gray-600 text-lg text-center md:text-left"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
