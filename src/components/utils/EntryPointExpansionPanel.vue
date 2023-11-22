<script setup lang="ts">
import LinkTerm from '@/models/LinkTerm';
import { ref } from 'vue';
const JSONLD_ACONTEXT_KEYWORD = "@context"
const JSONLD_AID_KEYWORD:string = "@id"
const JSONLD_ATYPE_KEYWORD = "@type";
interface EntryPointExpansionPanelProps {
    title: string,
    content: any
}

const isLinkTerm = (valObject:any) => {
    return (
        typeof valObject === 'object' &&
        Object.keys(valObject).includes(JSONLD_AID_KEYWORD) &&
        Object.keys(valObject).includes(JSONLD_ATYPE_KEYWORD) &&
        valObject[JSONLD_ATYPE_KEYWORD] === JSONLD_AID_KEYWORD
    )

}

const formatEntryPointMetadata = (_content:any) => {
    let _endpoints:LinkTerm[] = []
    for(let i=0; i<Object.entries(_content[JSONLD_ACONTEXT_KEYWORD]).length; i++) {
        let term:string = Object.entries(_content[JSONLD_ACONTEXT_KEYWORD])[i][0] as unknown as string
        let valObject:any = Object.entries(_content[JSONLD_ACONTEXT_KEYWORD])[i][1]
        if(isLinkTerm(valObject)) {
            let id = valObject[JSONLD_AID_KEYWORD]
            _endpoints.push(new LinkTerm(title.value, term, id))
        }
    }
    return _endpoints
}

const props = defineProps<EntryPointExpansionPanelProps>()
const title = ref(props.title)
const endpoints = ref(formatEntryPointMetadata(props.content))
// const trip = ref({
//       trip: {
//         name: '',
//         location: null,
//         start: null,
//         end: null,
//       },
//       locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Ecuador', 'France'],
// })
</script>
<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-title>
                {{ title }}
              <!-- <template v-slot:default="{ expanded }">
                <v-row no-gutters>
                  <v-col cols="4" class="d-flex justify-start">
                    {{ title }}
                  </v-col>
                  <v-col
                    cols="8"
                    class="text-grey"
                  >
                    <v-fade-transition leave-absolute>
                      <span
                        v-if="expanded"
                        key="0"
                      >
                        Enter a name for the trip
                      </span>
                      <span
                        v-else
                        key="1"
                      >
                        {{ trip.trip.name }}
                      </span>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </template> -->
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-list v-for="endpoint in endpoints" density="compact" :key="endpoint.getLink()">
                    <v-list-item>
                        <div class="item-content">
                            <v-list-item-title>{{ endpoint.getLink() }}</v-list-item-title>
                            <v-btn> REQUEST LAYER</v-btn>
                        </div>
                    </v-list-item>
                </v-list>
                <!-- {{ endpoints }} -->
              <!-- <v-text-field
                v-model="trip.name"
                hide-details
                placeholder="Caribbean Cruise"
              ></v-text-field> -->
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>
<style>
.item-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    vertical-align: middle;
    border-bottom: #ccc solid 2px;
}
</style>