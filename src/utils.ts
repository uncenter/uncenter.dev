import slug from '@sindresorhus/slugify';

export const slugify = (string: string) => slug(string);
export const capitalize = (string: string) =>
	string.charAt(0).toUpperCase() + string.slice(1);
