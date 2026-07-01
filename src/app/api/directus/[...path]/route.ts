import { NextRequest, NextResponse } from 'next/server';
import { DIRECTUS_URL } from '@/http/directus';

interface RouteContext {
	params: Promise<{
		path: string[];
	}>;
}

const HOP_BY_HOP_HEADERS = new Set([
	'connection',
	'content-encoding',
	'content-length',
	'keep-alive',
	'transfer-encoding',
	'upgrade',
]);

const buildDirectusUrl = async (
	request: NextRequest,
	context: RouteContext,
): Promise<string> => {
	const { path } = await context.params;
	const targetPath = path.map(encodeURIComponent).join('/');

	return `${DIRECTUS_URL}/${targetPath}${request.nextUrl.search}`;
};

const createProxyHeaders = (request: NextRequest): Headers => {
	const headers = new Headers();
	const contentType = request.headers.get('content-type');

	if (contentType) {
		headers.set('content-type', contentType);
	}

	return headers;
};

const proxyDirectusRequest = async (
	request: NextRequest,
	context: RouteContext,
): Promise<NextResponse> => {
	const directusUrl = await buildDirectusUrl(request, context);
	const method = request.method.toUpperCase();
	const hasBody = method !== 'GET' && method !== 'HEAD';

	const response = await fetch(directusUrl, {
		method,
		headers: createProxyHeaders(request),
		body: hasBody ? await request.arrayBuffer() : undefined,
		cache: 'no-store',
	});

	const responseHeaders = new Headers();
	response.headers.forEach((value, key) => {
		if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
			responseHeaders.set(key, value);
		}
	});

	return new NextResponse(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: responseHeaders,
	});
};

export const GET = proxyDirectusRequest;
export const POST = proxyDirectusRequest;
export const PATCH = proxyDirectusRequest;
export const DELETE = proxyDirectusRequest;
