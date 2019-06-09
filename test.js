import fs from 'fs';
import test from 'ava';
import getStream from 'get-stream';
import toReadableStream from 'to-readable-stream';

import LinkPainter from '.';

const queryParams = {
	// eslint-disable-next-line camelcase
	utm_source: 'newsletter',
	// eslint-disable-next-line camelcase
	utm_medium: 'link',
	// eslint-disable-next-line camelcase
	utm_campaign: 'link-painter'
};

test('Paint links', async t => {
	const html = fs.createReadStream('./sample.html', 'utf-8');
	const result = await getStream(html.pipe(new LinkPainter('my.example.com', queryParams)));

	t.true(result.includes('"https://my.example.com/?utm_source=newsletter&amp;utm_medium=link&amp;utm_campaign=link-painter"'));
	t.true(result.includes('"https://google.com"'));
});

test('Url with path', async t => {
	const input = '<a href="https://my.example.com/foo">foo</a>';
	const expected = '<a href="https://my.example.com/foo?utm_source=newsletter&amp;utm_medium=link&amp;utm_campaign=link-painter">foo</a>';
	const html = toReadableStream(input).setEncoding('utf-8');
	const result = await getStream(html.pipe(new LinkPainter('my.example.com', queryParams)));
	t.is(result, expected);
});

test('Url with query string', async t => {
	const input = '<a href="https://my.example.com/?take=2">foo</a>';
	const expected = '<a href="https://my.example.com/?take=2&amp;utm_source=newsletter&amp;utm_medium=link&amp;utm_campaign=link-painter">foo</a>';
	const html = toReadableStream(input).setEncoding('utf-8');
	const result = await getStream(html.pipe(new LinkPainter('my.example.com', queryParams)));
	t.is(result, expected);
});

test('Url with query string but no trailing /', async t => {
	const input = '<a href="https://my.example.com?take=2">foo</a>';
	const expected = '<a href="https://my.example.com/?take=2&amp;utm_source=newsletter&amp;utm_medium=link&amp;utm_campaign=link-painter">foo</a>';
	const html = toReadableStream(input).setEncoding('utf-8');
	const result = await getStream(html.pipe(new LinkPainter('my.example.com', queryParams)));
	t.is(result, expected);
});

test('Survive bad input', async t => {
	const html = fs.createReadStream('./sample2.html', 'utf-8');
	const result = await getStream(html.pipe(new LinkPainter('example.com', queryParams)));

	t.true(result.includes('"https://example.com/?page=1&amp;utm_source=newsletter&amp;utm_medium=link&amp;utm_campaign=link-painter"'));
	t.true(result.includes('"https://google.com"'));
});
