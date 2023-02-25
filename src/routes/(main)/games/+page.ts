import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { auth } from '$lib/auth/firebase';
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, (user) => {
    if (browser) {
        if (!user) {
            goto('/login');
        }
    }
});
