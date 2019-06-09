# link-painter [![Build Status](https://travis-ci.org/acinader/link-painter.svg?branch=master)](https://travis-ci.org/acinader/link-painter)
Add Query Parameters to Links in HTML

### install
`npm install link-painter`

### example
```js
const queryParams = {
	utm_source: 'newsletter',
	utm_medium: 'link',
	utm_campaign: 'link-painter'
};

const html = fs.createReadStream('./sample.html', 'utf-8');
const result = await getStream(html.pipe(new LinkPainter('my.example.com', queryParams)));
```

yields:

```html
<!DOCTYPE html>
<html>
	<head></head>
	<body>
		<div><a href="https://my.example.com/?utm_source=newsletter&amp;utm_medium=link&amp;utm_campaign=link-painter">click me</a></div>
		<div><a href="https://google.com">or me</a></div>
	</body>
</html>
```
