<template>
	<router-view />
	<cool />
</template>

<style lang="scss">
.text-ellipsis {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: normal;
}
</style>

<script setup lang="ts">
import Cool from '/@/cool/index.vue';
</script>
