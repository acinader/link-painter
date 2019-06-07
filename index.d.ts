/// <reference types="node"/>
import RewritingStream from 'parse5-html-rewriting-stream';

export = LinkPainter;

// TODO: figure out what type the stream options are/should be from transform
// TODO: find a type for the queryParams
declare class LinkPainter extends RewritingStream {
    constructor(domain: string, queryParams: {}, options?: {});
}
