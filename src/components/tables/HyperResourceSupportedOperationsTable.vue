<script setup lang="ts">
import type HyperResourceSupportedOperation from '@/models/HyperResourceSupportedOperation';
import { ref } from 'vue';

interface HyperResourceSupportedOperationsTableProps {
    supportedOperations: HyperResourceSupportedOperation[]
}
const props = defineProps<HyperResourceSupportedOperationsTableProps>()
const supOpers = ref(props.supportedOperations)
</script>
<template>
<v-card title="hr:supportedOperations" variant="outlined">
    <v-table fixed-header height="300px">
        <thead>
            <tr>
                <th class="text-left">Type</th>
                <th class="text-left">Append Path</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in supOpers" :key="item._appendPath">
                <td>{{ item._type }}</td>
                <td>{{ item._appendPath }}</td>
            </tr>
        </tbody>
    </v-table>
</v-card>
</template>
<style></style>