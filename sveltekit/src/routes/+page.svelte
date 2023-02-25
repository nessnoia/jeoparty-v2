<script lang="ts">
	import { goto } from '$app/navigation';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/auth/firebase';
	import { browser } from '$app/environment';

	onAuthStateChanged(auth, (user) => {
		if (browser) {
			if (user) {
				goto('/games');
			} else {
				goto('/login');
			}
		}
	});
</script>
