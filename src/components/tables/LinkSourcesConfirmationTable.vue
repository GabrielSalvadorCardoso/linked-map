<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { type TableItem } from "../workspace/LinkSources.vue"
import * as vNG from "v-network-graph"
import {
  ForceLayout,
  type ForceNodeDatum,
  type ForceEdgeDatum,
} from "v-network-graph/lib/force-layout"
type Node = {
    name: string
}
type Edge = {
    source: string,
    target: string,
    label: string
}

// const nodes = {
//     node1: { name: "http://bcim.geoapi/lim-municipio-a-list" },
//     node2: { name: "http://localhost:8001/taxas-rendimento-escolar-por-municipio-list" }
// }

// const edges = {
//     edge1: { source: "node1", target: "node2", label: "http://www.semanticweb.org/adriana/ontologies/2023/6/untitled-ontology-56#geocodigo" },
// }

// const nodeCount = ref(Object.keys(nodes).length)
// initialize network
// buildNetwork(nodeCount.value, nodes, edges)

// watch(nodeCount, () => {
//     buildNetwork(nodeCount.value, nodes, edges)
// })

// function buildNetwork(count: number, nodes: vNG.Nodes, edges: vNG.Edges) {
//     const idNums = [...Array(count)].map((_, i) => i)

//     // nodes
//     const newNodes = Object.fromEntries(idNums.map(id => [`node${id}`, {}]))
//     Object.keys(nodes).forEach(id => delete nodes[id])
//     Object.assign(nodes, newNodes)

//     // edges
//     const makeEdgeEntry = (id1: number, id2: number) => {
//         return [`edge${id1}-${id2}`, { source: `node${id1}`, target: `node${id2}`, label: `node` }]
//     }
//     const newEdges = Object.fromEntries([
//         ...idNums
//         .map(n => [n, (Math.floor(n / 4) * 4) % count])
//         .map(([n, m]) => (n === m ? [n, (n + 4) % count] : [n, m]))
//         .map(([n, m]) => makeEdgeEntry(n, m)),
//     ])
//     Object.keys(edges).forEach(id => delete edges[id])
//     Object.assign(edges, newEdges)
// }

interface LinkSourcesConfirmationTableProps {
    isLinkSourceDialogOpen: boolean,
    selectedTableItems: TableItem[],
    contextTableItems: TableItem[]
}

const generateNodesAndEdges = (_selectedTableItems:TableItem[], _contextItems: TableItem[]) => {
    let _nodes:any = {}
    let _edges:any = {}
    for(let i=0; i<_selectedTableItems.length; i++) {
        let node:Node = {name: _selectedTableItems[i].source}
        let nodeId = `node${i}`
        _nodes[nodeId] = node

        if(_selectedTableItems[i].matchsWith.length>0) {
            for(let k=0; k<_selectedTableItems[i].matchsWith.length; k++) {
                let linkedNode:Node = {name: _contextItems[_selectedTableItems[i].matchsWith[k]].source}
                let linkedNodeId = `node${i+1}`
                _nodes[linkedNodeId] = linkedNode
                
                // create edge between linked nodes
                let edge:Edge = {source: nodeId, target: linkedNodeId, label: _contextItems[_selectedTableItems[i].matchsWith[k]].semantic }
                let edgeId = `edge${Object.keys(_edges)}`
                _edges[edgeId] = edge
            }
        }
    }
    return {
        nodes: _nodes,
        edges: _edges
    }
}

const props = defineProps<LinkSourcesConfirmationTableProps>()
const isDialogOpen = ref(props.isLinkSourceDialogOpen)
const selectedItems = ref(props.selectedTableItems)
const contextItems = ref(props.contextTableItems)

// const nodes:any = ref(generateNodes(props.selectedTableItems))
const nodesAndEdges = ref(generateNodesAndEdges(selectedItems.value, contextItems.value)) as any
console.log(nodesAndEdges)
// const nodes = nodesEdges[0]
// const edges = nodesEdges[1]

const emit = defineEmits(['confirmLinkedSources', 'closeLinkSourceDialog'])
watch(
  () => props.isLinkSourceDialogOpen,
  () => {
        isDialogOpen.value = props.isLinkSourceDialogOpen
        nodesAndEdges.value = generateNodesAndEdges(props.selectedTableItems, props.contextTableItems)
  }
)

watch(
    () => props.selectedTableItems,
    () => {
        // selectedItems.value = 
        nodesAndEdges.value = generateNodesAndEdges(props.selectedTableItems, props.contextTableItems)
        // nodes.value = nodes
        // edges.value = edges
        console.log(nodesAndEdges.value)
    }
)

watch(
    () => props.contextTableItems,
    () => {
        // contextItems.value = props.contextTableItems
        nodesAndEdges.value = generateNodesAndEdges(props.selectedTableItems, props.contextTableItems)
        // nodes.value = nodes
        // edges.value = edges
        console.log(nodesAndEdges.value)
    }
)

const initialConfigs = vNG.defineConfigs({
    // view: {
    //     layoutHandler: new ForceLayout({
    //         positionFixedByDrag: false,
    //         positionFixedByClickWithAltKey: true,
    //         createSimulation: (d3, nodes, edges) => {
    //             // d3-force parameters
    //             const forceLink = d3.forceLink<ForceNodeDatum, ForceEdgeDatum>(edges).id((d:any) => d.id)
    //             return d3
    //                 .forceSimulation(nodes)
    //                 .force("edge", forceLink.distance(40).strength(0.5))
    //                 .force("charge", d3.forceManyBody().strength(-800))
    //                 .force("center", d3.forceCenter().strength(0.05))
    //                 .alphaMin(0.001)

    //         // * The following are the default parameters for the simulation.
    //         // const forceLink = d3.forceLink<ForceNodeDatum, ForceEdgeDatum>(edges).id(d => d.id)
    //         // return d3
    //         //   .forceSimulation(nodes)
    //         //   .force("edge", forceLink.distance(100))
    //         //   .force("charge", d3.forceManyBody())
    //         //   .force("collide", d3.forceCollide(50).strength(0.2))
    //         //   .force("center", d3.forceCenter().strength(0.05))
    //         //   .alphaMin(0.001)
    //         }
    //     }),
    // },
    node: {
        label: {
            visible: true,
        },
        normal: {
            color: "#4466cc88",
        },
    },
  edge: {
    selectable: true,
    normal: {
      width: 3,
      color: "#4466cc",
      dasharray: "0",
      linecap: "butt",
      animate: false,
      animationSpeed: 50,
    },
    hover: {
      width: 4,
      color: "#3355bb",
      dasharray: "0",
      linecap: "butt",
      animate: false,
      animationSpeed: 50,
    },
    selected: {
      width: 3,
      color: "#dd8800",
      dasharray: "6",
      linecap: "round",
      animate: false,
      animationSpeed: 50,
    },
    gap: 5,
    type: "straight",
    margin: 2,
    marker: {
      source: {
        type: "none",
        width: 4,
        height: 4,
        margin: -1,
        offset: 0,
        units: "strokeWidth",
        color: null,
      },
      target: {
        type: "arrow",
        width: 4,
        height: 4,
        margin: -1,
        offset: 0,
        units: "strokeWidth",
        color: null,
      },
    }
  },
})
const configs = reactive(initialConfigs)

</script>
<template>
    <v-col cols="auto">
        
        <v-dialog fullscreen transition="dialog-bottom-transition" v-model="isDialogOpen">
            <v-card>
                <!-- <v-toolbar color="primary" :title="`Link sources confirmation`"></v-toolbar> -->
                <v-toolbar dark color="primary"> 
                    <v-btn icon dark @click="($event:any) => emit('closeLinkSourceDialog')">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Link sources confirmation</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn variant="text" @click="($event:any) => emit('confirmLinkedSources')">Save</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    {{ selectedTableItems }}
                    <br/>
                    <br/>
                    {{ nodesAndEdges }}
                    <!-- <br/>
                    <br/>
                    {{ edges }} -->
                    <v-network-graph
                        class="graph"
                        :nodes="nodesAndEdges.nodes"
                        :edges="nodesAndEdges.edges"
                        :configs="configs"
                    >
                        <template #edge-label="{ edge, ...slotProps }">
                            <v-edge-label :text="edge.label" align="center" vertical-align="above" v-bind="slotProps" />
                        </template>
                    </v-network-graph>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-col>
</template>
<styles>
</styles>