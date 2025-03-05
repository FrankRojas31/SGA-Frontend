<template>
  <div id="features" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
    <div class="grid grid-cols-12 gap-4 justify-center">
      <div class="col-span-12 text-center mt-20 mb-6">
        <div class="text-surface-900 font-normal mb-2 text-4xl">Características del Gestor de Alumnos</div>
        <span class="text-muted-color text-2xl">Simplifica la gestión educativa con herramientas modernas</span>
      </div>

      <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
        <div
          style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))">
          <div class="p-4 bg-surface-0 h-full" style="border-radius: 8px">
            <div class="flex items-center justify-center bg-yellow-200 mb-4"
              style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
              <i class="pi pi-fw pi-users !text-2xl text-yellow-700"></i>
            </div>
            <h5 class="mb-2 text-surface-900">Fácil de Usar</h5>
            <span class="text-surface-600">Interfaz intuitiva para gestionar alumnos sin complicaciones.</span>
          </div>
        </div>
      </div>

      <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
        <div
          style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(172, 180, 223, 0.2))">
          <div class="p-4 bg-surface-0 h-full" style="border-radius: 8px">
            <div class="flex items-center justify-center bg-cyan-200 mb-4"
              style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
              <i class="pi pi-fw pi-book !text-2xl text-cyan-700"></i>
            </div>
            <h5 class="mb-2 text-surface-900">Registro de Notas</h5>
            <span class="text-surface-600">Administra calificaciones de forma rápida y precisa.</span>
          </div>
        </div>
      </div>

      <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pb-8 mt-6 lg:mt-0">
        <div
          style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(172, 180, 223, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(246, 158, 188, 0.2))">
          <div class="p-4 bg-surface-0 h-full" style="border-radius: 8px">
            <div class="flex items-center justify-center bg-indigo-200"
              style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
              <i class="pi pi-fw pi-calendar !text-2xl text-indigo-700"></i>
            </div>
            <div class="mt-6 mb-1 text-surface-900 text-xl font-semibold">Control de Asistencia</div>
            <span class="text-surface-600">Lleva un registro diario de la asistencia de los alumnos.</span>
          </div>
        </div>
      </div>

      <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
        <div
          style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(187, 199, 205, 0.2), rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(145, 210, 204, 0.2))">
          <div class="p-4 bg-surface-0 h-full" style="border-radius: 8px">
            <div class="flex items-center justify-center bg-slate-200 mb-4"
              style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
              <i class="pi pi-fw pi-mobile !text-2xl text-slate-700"></i>
            </div>
            <div class="mt-6 mb-1 text-surface-900 text-xl font-semibold">Diseño Adaptable</div>
            <span class="text-surface-600">Accede desde cualquier dispositivo, en cualquier momento.</span>
          </div>
        </div>
      </div>

      <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
        <div
          style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(187, 199, 205, 0.2), rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(145, 226, 237, 0.2), rgba(160, 210, 250, 0.2))">
          <div class="p-4 bg-surface-0 h-full" style="border-radius: 8px">
            <div class="flex items-center justify-center bg-orange-200 mb-4"
              style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
              <i class="pi pi-fw pi-chart-bar !text-2xl text-orange-700"></i>
            </div>
            <div class="mt-6 mb-1 text-surface-900 text-xl font-semibold">Reportes Detallados</div>
            <span class="text-surface-600">Genera informes de rendimiento y estadísticas.</span>
          </div>
        </div>
      </div>

      <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pb-8 mt-6 lg:mt-0">
        <div
          style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(251, 199, 145, 0.2), rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(212, 162, 221, 0.2))">
          <div class="p-4 bg-surface-0 h-full" style="border-radius: 8px">
            <div class="flex items-center justify-center bg-pink-200 mb-4"
              style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
              <i class="pi pi-fw pi-lock !text-2xl text-pink-700"></i>
            </div>
            <div class="mt-6 mb-1 text-surface-900 text-xl font-semibold">Seguridad Garantizada</div>
            <span class="text-surface-600">Protege los datos de tus alumnos con encriptación.</span>
          </div>
        </div>
      </div>

      <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 mt-6 lg:mt-0">
        <div
          style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 210, 204, 0.2), rgba(160, 210, 250, 0.2)), linear-gradient(180deg, rgba(187, 199, 205, 0.2), rgba(145, 210, 204, 0.2))">
          <div class="p-4 bg-surface-0 h-full" style="border-radius: 8px">
            <div class="flex items-center justify-center bg-teal-200 mb-4"
              style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
              <i class="pi pi-fw pi-check-circle !text-2xl text-teal-700"></i>
            </div>
            <div class="mt-6 mb-1 text-surface-900 text-xl font-semibold">Listo para Usar</div>
            <span class="text-surface-600">Implementación rápida sin configuraciones complejas.</span>
          </div>
        </div>
      </div>

      <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 mt-6 lg:mt-0">
        <div
          style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 210, 204, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(251, 199, 145, 0.2), rgba(160, 210, 250, 0.2))">
          <div class="p-4 bg-surface-0 h-full" style="border-radius: 8px">
            <div class="flex items-center justify-center bg-blue-200 mb-4"
              style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
              <i class="pi pi-fw pi-sync !text-2xl text-blue-700"></i>
            </div>
            <div class="mt-6 mb-1 text-surface-900 text-xl font-semibold">Sincronización en Tiempo Real</div>
            <span class="text-surface-600">Actualiza datos al instante desde cualquier lugar.</span>
          </div>
        </div>
      </div>

      <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg-4 mt-6 lg:mt-0">
        <div
          style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(160, 210, 250, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(246, 158, 188, 0.2), rgba(212, 162, 221, 0.2))">
          <div class="p-4 bg-surface-0 h-full" style="border-radius: 8px">
            <div class="flex items-center justify-center bg-purple-200 mb-4"
              style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
              <i class="pi pi-fw pi-user-plus !text-2xl text-purple-700"></i>
            </div>
            <div class="mt-6 mb-1 text-surface-900 text-xl font-semibold">Gestión de Usuarios</div>
            <span class="text-surface-600">Administra profesores, alumnos y roles fácilmente.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
