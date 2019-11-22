import {ApiController, Async, Controller, HttpGet, SendsResponse} from 'dinoloop';
import {injectable} from "inversify";
import {GoogleSpreadsheetService} from "../promise-spreadsheet";

const template = require('art-template');
import cors = require('cors');

@injectable()
@Controller('', {
	use: [
		cors(),
	]
})
export class HomeController extends ApiController {

	@HttpGet('/')
	@SendsResponse()
	get(): void {
		let html: string = template(__dirname + '/../../public/build/index.html', {});
		html = html.replace(/%PUBLIC_URL%/g, 'public/build');
		this.response.type('text/html').send(html);
	}

	@HttpGet('/ajax')
	ajax() {
		return {a: 'b'};
	}

	@Async()
	@HttpGet('/async')
	async async() {
		return {a: 'b'};
	}

	@Async()
	@HttpGet('/sheet')
	async sheet() {
		const doc = GoogleSpreadsheetService('1r2tPnsrYuJP_2W7qIqdsLg_A08GvCjKbVBJJb3UnXMw');

		const info = await doc.getInfo();
		let sheet = info.worksheets[0];

		const rows = await doc.getRows(sheet, {
			offset: 1,
			limit: 20,
		});

		console.log(rows.length);
		return {
			info,
			sheet,
			rows
		};
	}

}

