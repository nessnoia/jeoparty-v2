<script setup lang="ts">
import { ref } from 'vue';

import ModalTemplate from './ModalTemplate.vue';

const showCreateModal = ref(false);

const props = defineProps<{
    pageTitle: string
}>();

const deleteGames = () => {
    return;
}

</script>


<template>
    <div >
        <button><font-awesome-icon icon="bars"></font-awesome-icon></button>
        <h2>{{ pageTitle }}</h2>
        <input type="search" placeholder="Search..." />
        <button @click="showCreateModal = true"><font-awesome-icon icon="circle-plus"></font-awesome-icon></button>
        <button @click="deleteGames()"><font-awesome-icon icon="circle-minus"></font-awesome-icon></button>

        <Teleport to="body">
            <ModalTemplate :show="showCreateModal" @close="showCreateModal = false">
                <template #title>
                    Create New Jeoparty Game
                </template>
                <template #body>
                    <input type="text" placeholder="Game title...">
                    <input type="checkbox" id="public"><label for="public">Make this game public?</label>
                </template>
                <template #footer>
                    <button>
                        Enter Game Editor
                    </button>
                </template>
            </ModalTemplate>
        </Teleport>
    </div>
</template>