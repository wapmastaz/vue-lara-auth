<template>
	<v-alert
		v-if="isLoading"
		:icon="icon"
		:type="type"
		border="top"
		elevation="2"
		dismissible
		>{{ content }}</v-alert
	>
</template>

<script>
import { mapGetters } from 'vuex/types/helpers';
export default {
	props: ['type', 'icon', 'content'],
	computed: {
		...mapGetters(['isLoading']),
	},
};
</script>

<style></style>
