<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

// Datos dummy para los productos
const products = ref([
  { id: 1, name: 'Product 1', price: 100, image: 'product1.jpg' },
  { id: 2, name: 'Product 2', price: 150, image: 'product2.jpg' },
  { id: 3, name: 'Product 3', price: 200, image: 'product3.jpg' },
  { id: 4, name: 'Product 4', price: 250, image: 'product4.jpg' },
  { id: 5, name: 'Product 5', price: 300, image: 'product5.jpg' },
  { id: 5, name: 'Product 5', price: 300, image: 'product5.jpg' },
  { id: 5, name: 'Product 5', price: 300, image: 'product5.jpg' },
  { id: 5, name: 'Product 5', price: 300, image: 'product5.jpg' },
  { id: 5, name: 'Product 5', price: 300, image: 'product5.jpg' },
  { id: 5, name: 'Product 5', price: 300, image: 'product5.jpg' },
  { id: 5, name: 'Product 5', price: 300, image: 'product5.jpg' },
  { id: 5, name: 'Product 5', price: 300, image: 'product5.jpg' },
]);

function formatCurrency(value) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

// Función de ejemplo para el botón "Ver"
function viewProduct(product) {
    console.log('Ver producto:', product);
}
</script>

<template>
    <div class="card">
        <DataTable :value="products" :rows="3" paginator responsiveLayout="scroll">

            <!-- Nombre -->
            <Column field="name" header="Name" sortable style="width: 35%"></Column>

            <!-- Precio -->
            <Column field="price" header="Price" sortable style="width: 35%">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.price) }}
                </template>
            </Column>

            <!-- Botón "Ver" -->
            <Column style="width: 15%" header="View">
                <template #body="slotProps">
                    <Button
                        icon="pi pi-search"
                        type="button"
                        class="p-button-text"
                        @click="viewProduct(slotProps.data)"
                    />
                </template>
            </Column>
        </DataTable>
    </div>
</template>
