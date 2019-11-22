import {GoogleSpreadsheetService} from "./src/promise-spreadsheet";

// spreadsheet key is the long id in the sheets URL
const doc = GoogleSpreadsheetService('1r2tPnsrYuJP_2W7qIqdsLg_A08GvCjKbVBJJb3UnXMw');
let sheet;

(async () => {
	const info = await doc.getInfo();
	console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
	sheet = info.worksheets[0];
	console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);

	const rows = await doc.getRows(sheet, {
		offset: 1,
		limit: 20,
	});

	console.log(rows.length);
	console.log(rows);
})();
