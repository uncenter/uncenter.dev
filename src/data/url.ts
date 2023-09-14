import { url } from '@/data/site';

export function urlize(
	path: string = '',
	base: URL | string = new URL(
		import.meta.env.PROD ? url : 'http://localhost:4321/',
	),
) {
	return new URL(path, base);
}
