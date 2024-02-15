import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		flag: params.flag
	};
};
