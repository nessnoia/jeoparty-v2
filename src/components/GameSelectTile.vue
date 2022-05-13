<script setup lang="ts">
import { ref } from 'vue';

import ModalTemplate from './ModalTemplate.vue';

const showPreviewModal = ref(false);

const props = defineProps<{
    gameTitle: string,
}>();

</script>

<template>
    <div>
        <button @click="showPreviewModal = true">{{ gameTitle }}</button>

        <Teleport to="body">
            <ModalTemplate :show="showPreviewModal" @close="showPreviewModal = false">
                <template #title>
                    <h2>Preview Game</h2>
                </template>
                <template #body>
                    <div></div>
                </template>
                <template #footer>
                    <button>Edit Game</button>
                    <button>Start Game</button>
                </template>
            </ModalTemplate>
        </Teleport>
    </div>
</template>