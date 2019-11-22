import React from 'react';
import './App.css';
import {GoogleSpreadsheetService} from "./promise-spreadsheet";

export default class App extends React.Component<any, any> {

	state = {
		doc: null,
	};

	constructor(props: any) {
		super(props);
		this.fetchData().then(this.processData.bind(this));
	}

	async fetchData() {
		const doc = GoogleSpreadsheetService('1r2tPnsrYuJP_2W7qIqdsLg_A08GvCjKbVBJJb3UnXMw');
		// this.setState((state: any) => ({
		// 	...state,
		// 	doc,
		// }));
		this.state.doc = doc;
	}

	async processData() {
		if (!this.state.doc) {
			return;
		}
		const doc = this.state.doc as any;
		const info = await doc.getInfo();
		console.log(info);
		console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
		const sheet = info.worksheets[0];
		console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);
	}

	render() {
		return (
			<div className="App">
              { this.state.doc ? 'doc' : 'no doc' }
			</div>
		);
	}
}
