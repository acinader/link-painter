import fs from 'fs';
import test from 'ava';
import getStream from 'get-stream';

import LinkPainter from '.';

test('Paint links', async t => {
	const queryParams = {
		// eslint-disable-next-line camelcase
		utm_source: 'newsletter',
		// eslint-disable-next-line camelcase
		utm_medium: 'link',
		// eslint-disable-next-line camelcase
		utm_campaign: 'link-painter'
	};

	const html = await fs.createReadStream('./sample.html', 'utf-8');
	const result = await getStream(html.pipe(new LinkPainter('my.example.com', queryParams)));

	t.true(result.includes('"https://my.example.com/?utm_source=newsletter&amp;utm_medium=link&amp;utm_campaign=link-painter"'));
	t.true(result.includes('"https://google.com"'));
});
