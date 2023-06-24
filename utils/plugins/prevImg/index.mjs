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
											src: 'data:image/png;base64,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',
											style: {
												width: '89px',
												height: '75px',
												alignSelf: 'center',
												marginTop: '1em',
												marginBottom: '1em',
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
						backgroundColor: '#232634',
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
			.toFile(`dist/assets/previews/${data.slug}.png`);
		console.log(
			`[11ty][${kleur.magenta('previews')}] ${kleur.bold(
				'dist/assets/previews/',
			)}${kleur.cyan().bold(data.slug)}${kleur.bold('.png')}`,
		);
	} catch (err) {
		console.error(
			kleur.red(`[11ty][previews] Error generating preview for ${data.slug}`),
		);
		throw err;
	}
};

await rm('dist/assets/previews', { force: true, recursive: true });
await mkdir('dist/assets/previews', { recursive: true });

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
