import slug from '@sindresorhus/slugify';

export function slugify(string: string) {
	return slug(string);
}
