<script setup lang="ts" type="module">
// Components
import HomeTopBar from '@/components/HomeTopBar.vue';
import GameSelectTile from '@/components/GameSelectTile.vue';

const gamesList = [ "Game 1", "Game 2", "Game 3" ]
</script>

<template>
    <div>
        <HomeTopBar page-title="Placeholder"/>
        <GameSelectTile v-for="game in gamesList" :key="game" :gameTitle="game" />
    </div>
</template>