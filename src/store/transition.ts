import { defineStore } from 'pinia';

export const useTransitionStore = defineStore('transition', {
	state: () => {
		return {
			transition: false
		};
	},
	getters: {},
	actions: {
		handleChange() {
			this.transition = !this.transition;
			
		}
	}
});
