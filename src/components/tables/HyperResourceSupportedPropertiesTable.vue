<script setup lang="ts">
import type HyperResourceSupportedProperty from '@/models/HyperResourceSupportedProperty';
import { ref } from 'vue';

interface HyperResourceSupportedPropertiesTableProps {
    supportedProperties: HyperResourceSupportedProperty[]
}
const props = defineProps<HyperResourceSupportedPropertiesTableProps>()
const supProps = ref(props.supportedProperties)
</script>
<template>
<v-card title="hr:supportedProperties" variant="outlined">    
    <v-table fixed-header height="300px">
        <thead>
            <tr>
                <th class="text-left">Type</th>
                <th class="text-left">Property</th>
                <th class="text-left">Required</th>
                <th class="text-left">Readable</th>
                <th class="text-left">Writable</th>
                <th class="text-left">Is External</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in supProps" :key="item._property">
                <td>{{ item._type }}</td>
                <td>{{ item._property }}</td>
                <td>{{ item._required }}</td>
                <td>{{ item._readable }}</td>
                <td>{{ item._writable }}</td>
                <td>{{ item._isExternal }}</td>
            </tr>
        </tbody>
    </v-table>
</v-card>
</template>
<style></style>