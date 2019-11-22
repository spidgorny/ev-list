**Is your feature request related to a problem? Please describe.**

I'm trying to use [express-art-template](https://aui.github.io/art-template/express/) with ApiController.

**Describe the solution you'd like**
Given the setup.
```
app.engine('art', require('express-art-template'));
app.set('view', {
	debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'art');
```
I'd like to be able to get access to ```app``` variable from inside the controller.
```
@HttpGet('/')
@SendsResponse()
get(): string {
	return this.app.render('index.art');
}
```

**Describe alternatives you've considered**
My current solution is to use the template directly without integration with express.

	@HttpGet('/')
	@SendsResponse()
	get(): void {
		let html: string = template(__dirname + '/../../public/build/index.html', {});
		this.response.type('text/html').send(html);
	}

**Additional context**
No
