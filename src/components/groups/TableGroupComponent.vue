<script lang="ts" setup>
import { ref } from 'vue';

const customers3 = ref([
  {
    representative: { name: 'John Doe', image: 'john_doe.jpg' },
    name: 'Customer 1',
    country: { code: 'US', name: 'United States' },
    company: 'Company A',
    status: 'Active',
    date: '2025-03-01',
  },
  {
    representative: { name: 'John Doe', image: 'john_doe.jpg' },
    name: 'Customer 2',
    country: { code: 'CA', name: 'Canada' },
    company: 'Company B',
    status: 'Inactive',
    date: '2025-02-15',
  },
  {
    representative: { name: 'Jane Smith', image: 'jane_smith.jpg' },
    name: 'Customer 3',
    country: { code: 'GB', name: 'United Kingdom' },
    company: 'Company C',
    status: 'Active',
    date: '2025-03-05',
  },
  {
    representative: { name: 'Jane Smith', image: 'jane_smith.jpg' },
    name: 'Customer 4',
    country: { code: 'FR', name: 'France' },
    company: 'Company D',
    status: 'Inactive',
    date: '2025-01-30',
  },
  {
    representative: { name: 'Jane Smith', image: 'jane_smith.jpg' },
    name: 'Customer 4',
    country: { code: 'FR', name: 'France' },
    company: 'Company D',
    status: 'Inactive',
    date: '2025-01-30',
  },
  {
    representative: { name: 'Jane Smith', image: 'jane_smith.jpg' },
    name: 'Customer 4',
    country: { code: 'FR', name: 'France' },
    company: 'Company D',
    status: 'Inactive',
    date: '2025-01-30',
  },
  {
    representative: { name: 'Jane Smith', image: 'jane_smith.jpg' },
    name: 'Customer 4',
    country: { code: 'FR', name: 'France' },
    company: 'Company D',
    status: 'Inactive',
    date: '2025-01-30',
  },
  {
    representative: { name: 'Jane Smith', image: 'jane_smith.jpg' },
    name: 'Customer 4',
    country: { code: 'FR', name: 'France' },
    company: 'Company D',
    status: 'Inactive',
    date: '2025-01-30',
  },
  {
    representative: { name: 'Jane Smith', image: 'jane_smith.jpg' },
    name: 'Customer 4',
    country: { code: 'FR', name: 'France' },
    company: 'Company D',
    status: 'Inactive',
    date: '2025-01-30',
  },
  {
    representative: { name: 'Jane Smith', image: 'jane_smith.jpg' },
    name: 'Customer 4',
    country: { code: 'FR', name: 'France' },
    company: 'Company D',
    status: 'Inactive',
    date: '2025-01-30',
  },
  {
    representative: { name: 'Jane Smith', image: 'jane_smith.jpg' },
    name: 'Customer 4',
    country: { code: 'FR', name: 'France' },
    company: 'Company D',
    status: 'Inactive',
    date: '2025-01-30',
  },
]);

const getSeverity = (status) => {
  return status === 'Active' ? 'success' : 'danger';
};

const calculateCustomerTotal = (representativeName) => {
  return customers3.value.filter(
    (customer) => customer.representative.name === representativeName
  ).length;
};
</script>

<template>
  <div class="card px-6">
    <DataTable
      :value="customers3"
      rowGroupMode="subheader"
      groupRowsBy="representative.name"
      sortMode="single"
      sortField="representative.name"
      :sortOrder="1"
      scrollable
      scrollHeight="800px"
      tableStyle="min-width: 50rem"
    >
      <template #groupheader="slotProps">
        <div class="flex items-center gap-2">
          <img
            :alt="slotProps.data.representative.name"
            :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.data.representative.image}`"
            width="32"
            style="vertical-align: middle"
          />
          <span>{{ slotProps.data.representative.name }}</span>
        </div>
      </template>
      <Column field="representative.name" header="Representative" />
      <Column field="name" header="Name" style="min-width: 200px" />
      <Column field="country" header="Country" style="min-width: 200px">
        <template #body="slotProps">
          <div class="flex items-center gap-2">
            <img
              alt="flag"
              src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
              :class="`flag flag-${slotProps.data.country.code}`"
              style="width: 24px"
            />
            <span>{{ slotProps.data.country.name }}</span>
          </div>
        </template>
      </Column>
      <Column field="company" header="Company" style="min-width: 200px" />
      <Column field="status" header="Status" style="min-width: 200px">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.status"
            :severity="getSeverity(slotProps.data.status)"
          />
        </template>
      </Column>
      <Column field="date" header="Date" style="min-width: 200px" />
      <template #groupfooter="slotProps">
        <div class="flex justify-end font-bold w-full">
          Total Customers: {{ calculateCustomerTotal(slotProps.data.representative.name) }}
        </div>
      </template>
    </DataTable>
  </div>
</template>
