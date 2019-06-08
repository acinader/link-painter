'use strict';
const RewritingStream = require('parse5-html-rewriting-stream');
const UrlPattern = require('url-pattern');
const isRelativeUrl = require('is-relative-url');

const isEqual = (a, b) =>
	b &&
	a.tld === b.tld &&
	a.subdomain === b.subdomain &&
	a.domain === b.domain;

class LinkPainter extends RewritingStream {
	constructor(domain, queryParams, options) {
		super(options);
		const pattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld((/)(?)*)');
		const toMatch = pattern.match(domain);

		this.on('startTag', startTag => {
			if (startTag.tagName === 'a') {
				const href = startTag.attrs.find(a => a.name === 'href');
				if (
					href &&
					(isRelativeUrl(href.value) || isEqual(toMatch, pattern.match(href.value)))
				) {
					const url = new URL(href.value);
					Object.keys(queryParams).forEach(k => url.searchParams.set(k, queryParams[k]));
					href.value = url.toString();
				}
			}

			this.emitStartTag(startTag);
		});
	}
}

module.exports = LinkPainter;
