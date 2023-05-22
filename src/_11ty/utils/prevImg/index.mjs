// Via: https://github.com/ryanccn/ryanccn.dev/tree/main/src/utils/socialImages
// License: MIT

import satori from 'satori';

import url from 'node:url';
import { join } from 'node:path';
import { mkdir, readFile, rm } from 'node:fs/promises';

import { format } from 'date-fns';
import kleur from 'kleur';
import pLimit from 'p-limit';
import sharp from 'sharp';

const FONTS_DIR = join(
	url.fileURLToPath(new URL('.', import.meta.url)),
	'fonts',
);

const FONTS = [
	{
		name: 'Inter',
		weight: 400,
		style: 'normal',
		data: await readFile(join(FONTS_DIR, 'Inter-Regular.otf')),
	},
	{
		name: 'Inter',
		weight: 400,
		style: 'italic',
		data: await readFile(join(FONTS_DIR, 'Inter-Italic.otf')),
	},
	{
		name: 'Inter',
		weight: 500,
		style: 'normal',
		data: await readFile(join(FONTS_DIR, 'Inter-Medium.otf')),
	},
	{
		name: 'Inter',
		weight: 500,
		style: 'italic',
		data: await readFile(join(FONTS_DIR, 'Inter-MediumItalic.otf')),
	},
	{
		name: 'Inter',
		weight: 600,
		style: 'normal',
		data: await readFile(join(FONTS_DIR, 'Inter-SemiBold.otf')),
	},
	{
		name: 'Inter',
		weight: 600,
		style: 'italic',
		data: await readFile(join(FONTS_DIR, 'Inter-SemiBoldItalic.otf')),
	},
	{
		name: 'Inter',
		weight: 700,
		style: 'normal',
		data: await readFile(join(FONTS_DIR, 'Inter-Bold.otf')),
	},
	{
		name: 'Inter',
		weight: 700,
		style: 'italic',
		data: await readFile(join(FONTS_DIR, 'Inter-BoldItalic.otf')),
	},
	{
		name: 'Satoshi',
		weight: 800,
		style: 'normal',
		data: await readFile(join(FONTS_DIR, 'Satoshi-Black.otf')),
	},
	{
		name: 'Satoshi',
		weight: 800,
		style: 'italic',
		data: await readFile(join(FONTS_DIR, 'Satoshi-Black.otf')),
	},
];

const makeImage = async (data) => {
	console.log(
		`[11ty][${kleur.magenta('previews')}] ${kleur.bold('dist/previews/')}${kleur
			.cyan()
			.bold(data.slug)}${kleur.bold('.png')}`,
	);

	try {
		const result = await satori(
			{
				type: 'div',
				props: {
					children: [
						{
							type: 'h1',
							props: {
								children: data.title,
								style: {
									fontFamily: 'Satoshi',
									fontWeight: 800,
									fontSize: '80px',
									textWrap: 'balance',
									width: '100%',
								},
							},
						},
						{
							type: 'div',
							props: {
								style: {
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'flex-end',
									width: '100%',
								},
								children: [
									{
										type: 'div',
										props: {
											style: {
												display: 'flex',
												flexDirection: 'column',
											},
											children: [
												{
													type: 'p',
													props: {
														children: [
															{
																type: 'span',
																props: {
																	children: 'uncenter',
																	style: {
																		fontWeight: 700,
																		marginRight: '0.625rem',
																	},
																},
															},
															{
																type: 'span',
																props: { children: '· uncenter.org' },
															},
														],
														style: {
															fontFamily: 'Inter',
															fontWeight: 500,
															fontSize: '30px',
															display: 'flex',
															alignItems: 'baseline',
														},
													},
												},
												...(data.date
													? [
															{
																type: 'p',
																props: {
																	children: format(
																		new Date(data.date),
																		'yyyy/MM/dd',
																	),
																	style: {
																		fontFamily: 'Inter',
																		fontWeight: 400,
																		color: '#a3a3a3',
																		fontSize: '30px',
																	},
																},
															},
													  ]
													: []),
											],
										},
									},
									{
										type: 'img',
										props: {
											src: 'https://uncenter.org/trim-duck.png',
											style: {
												width: '144px',
												height: '135px',
											},
										},
									},
								],
							},
						},
					],
					style: {
						height: '100vh',
						width: '100vw',
						padding: '4rem',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						alignItems: 'flex-start',
						backgroundColor: '#171717',
						color: '#ffffff',
					},
				},
			},
			{
				width: 1200,
				height: 630,
				fonts: FONTS,
			},
		);

		await sharp(Buffer.from(result))
			.png()
			.toFile(`dist/previews/${data.slug}.png`);
	} catch (err) {
		console.error(
			kleur.red(`[11ty][previews] Error generating preview for ${data.slug}`),
		);
		throw err;
	}
};

await rm('dist/previews', { force: true, recursive: true });
await mkdir('dist/previews', { recursive: true });

const startTime = performance.now();

const pagesData = await readFile('./pages.json').then(JSON.parse);
await Promise.all(pagesData.map((data) => pLimit(10)(() => makeImage(data))));

console.log(
	kleur.green(
		`[11ty] Wrote ${pagesData.length} previews in ${(
			performance.now() - startTime
		).toFixed(2)}ms (${(
			(performance.now() - startTime) /
			pagesData.length
		).toFixed(2)}ms each)`,
	),
);
