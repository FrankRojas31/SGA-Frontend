<script lang="ts" setup>
import { ref } from 'vue';

const balanceFrozen = ref(false);

const customers2 = ref([
  {
    id: 1,
    name: 'Customer 1',
    country: { name: 'United States' },
    date: '2025-03-01',
    company: 'Company A',
    status: 'Active',
    activity: 'Completed',
    representative: { name: 'John Doe' },
    balance: 1200.50,
  },
  {
    id: 2,
    name: 'Customer 2',
    country: { name: 'Canada' },
    date: '2025-02-15',
    company: 'Company B',
    status: 'Inactive',
    activity: 'Pending',
    representative: { name: 'John Doe' },
    balance: 600.75,
  },
  {
    id: 3,
    name: 'Customer 3',
    country: { name: 'United Kingdom' },
    date: '2025-03-05',
    company: 'Company C',
    status: 'Active',
    activity: 'In Progress',
    representative: { name: 'Jane Smith' },
    balance: 2300.00,
  },
  {
    id: 4,
    name: 'Customer 4',
    country: { name: 'Germany' },
    date: '2025-01-30',
    company: 'Company D',
    status: 'Active',
    activity: 'Completed',
    representative: { name: 'Jane Smith' },
    balance: 1450.25,
  },
  {
    id: 4,
    name: 'Customer 4',
    country: { name: 'Germany' },
    date: '2025-01-30',
    company: 'Company D',
    status: 'Active',
    activity: 'Completed',
    representative: { name: 'Jane Smith' },
    balance: 1450.25,
  },
  {
    id: 4,
    name: 'Customer 4',
    country: { name: 'Germany' },
    date: '2025-01-30',
    company: 'Company D',
    status: 'Active',
    activity: 'Completed',
    representative: { name: 'Jane Smith' },
    balance: 1450.25,
  },
  {
    id: 4,
    name: 'Customer 4',
    country: { name: 'Germany' },
    date: '2025-01-30',
    company: 'Company D',
    status: 'Active',
    activity: 'Completed',
    representative: { name: 'Jane Smith' },
    balance: 1450.25,
  },
  {
    id: 4,
    name: 'Customer 4',
    country: { name: 'Germany' },
    date: '2025-01-30',
    company: 'Company D',
    status: 'Active',
    activity: 'Completed',
    representative: { name: 'Jane Smith' },
    balance: 1450.25,
  },
  {
    id: 4,
    name: 'Customer 4',
    country: { name: 'Germany' },
    date: '2025-01-30',
    company: 'Company D',
    status: 'Active',
    activity: 'Completed',
    representative: { name: 'Jane Smith' },
    balance: 1450.25,
  },
  {
    id: 4,
    name: 'Customer 4',
    country: { name: 'Germany' },
    date: '2025-01-30',
    company: 'Company D',
    status: 'Active',
    activity: 'Completed',
    representative: { name: 'Jane Smith' },
    balance: 1450.25,
  },
  {
    id: 4,
    name: 'Customer 4',
    country: { name: 'Germany' },
    date: '2025-01-30',
    company: 'Company D',
    status: 'Active',
    activity: 'Completed',
    representative: { name: 'Jane Smith' },
    balance: 1450.25,
  },
  {
    id: 4,
    name: 'Customer 4',
    country: { name: 'Germany' },
    date: '2025-01-30',
    company: 'Company D',
    status: 'Active',
    activity: 'Completed',
    representative: { name: 'Jane Smith' },
    balance: 1450.25,
  },
  {
    id: 4,
    name: 'Customer 4',
    country: { name: 'Germany' },
    date: '2025-01-30',
    company: 'Company D',
    status: 'Active',
    activity: 'Completed',
    representative: { name: 'Jane Smith' },
    balance: 1450.25,
  },
  {
    id: 4,
    name: 'Customer 4',
    country: { name: 'Germany' },
    date: '2025-01-30',
    company: 'Company D',
    status: 'Active',
    activity: 'Completed',
    representative: { name: 'Jane Smith' },
    balance: 1450.25,
  },
  {
    id: 4,
    name: 'Customer 4',
    country: { name: 'Germany' },
    date: '2025-01-30',
    company: 'Company D',
    status: 'Active',
    activity: 'Completed',
    representative: { name: 'Jane Smith' },
    balance: 1450.25,
  },
  {
    id: 4,
    name: 'Customer 4',
    country: { name: 'Germany' },
    date: '2025-01-30',
    company: 'Company D',
    status: 'Active',
    activity: 'Completed',
    representative: { name: 'Jane Smith' },
    balance: 1450.25,
  },
  {
    id: 4,
    name: 'Customer 4',
    country: { name: 'Germany' },
    date: '2025-01-30',
    company: 'Company D',
    status: 'Active',
    activity: 'Completed',
    representative: { name: 'Jane Smith' },
    balance: 1450.25,
  },
]);

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
</script>

<template>
  <div class="card">
    <DataTable :value="customers2" scrollable scrollHeight="780px" class="mt-6">
      <Column field="name" header="Name" style="min-width: 100px" frozen class="font-bold"></Column>
      <Column field="id" header="Id" style="min-width: 100px"></Column>
      <Column field="name" header="Name" style="min-width: 100px"></Column>
      <Column field="country.name" header="Country" style="min-width: 100px"></Column>
      <Column field="date" header="Date" style="min-width: 100px"></Column>
      <Column field="company" header="Company" style="min-width: 100px"></Column>
      <Column field="status" header="Status" style="min-width: 100px"></Column>
      <Column field="activity" header="Activity" style="min-width: 100px"></Column>
      <Column field="representative.name" header="Representative" style="min-width: 100px"></Column>
    </DataTable>
  </div>
</template>
