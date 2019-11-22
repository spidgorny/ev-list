import {ApiController, Controller, HttpGet, SendsResponse} from 'dinoloop';
import {injectable} from "inversify";
const template = require('art-template');

@injectable()
@Controller('')
export class HomeController extends ApiController {

	@HttpGet('/')
	@SendsResponse()
	get(): void {
		let html: string = template(__dirname + '/../../public/build/index.html', {});
		html = html.replace(/%PUBLIC_URL%/g, 'public/build');
		// console.log(html);
		this.response.type('text/html').send(html);
	}
}

