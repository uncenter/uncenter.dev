export default function (input, space) {
	return JSON.stringify(
		input,
		function (_k, v) {
			if (Array.isArray(v)) {
				let children = '';

				for (let index = 0, l = v.length; index < l; index++) {
					const value = v[index];
					const child = JSON.stringify(value);

					if (child === undefined) continue;

					children += children ? `, ${child}` : child;
				}

				return `[${children}]`;
			}
			return v;
		},
		space,
	)
		.replaceAll('\\', '')
		.replaceAll('"[', '[')
		.replaceAll(']"', ']')
		.replaceAll('"{', '{')
		.replaceAll('}"', '}');
}
