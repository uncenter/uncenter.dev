import type { EventContext } from '@cloudflare/workers-types';
import stringify from '../config/json-pretty-stringify.js';
import whoami from '../src/_data/whoami.js';

// @ts-expect-error
export async function onRequest(context: EventContext): Promise<Response> {
	const { next, request } = context as {
		next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
		request: Request;
	};

	if (
		new URL(request.url).pathname === '/' &&
		request.headers.get('user-agent')?.startsWith('curl/')
	) {
		return new Response(stringify(whoami, 2));
	}

	return await next();
}
