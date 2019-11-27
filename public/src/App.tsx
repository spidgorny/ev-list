import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";
import { Sheet } from './Sheet';

const axios = require('axios').default;

interface IAppState {
	sheet?: Sheet.ISheet | null;
	sortBy: null | string;
}

export default class App extends React.Component<any, IAppState> {

	constructor(props: any) {
		super(props);
		this.fetchData().then(r => {});
	}

	async fetchData() {
		const result = await axios.get('http://localhost:8088/sheet');
		console.log(result);
		const sheet = result.data;

		this.setState((state: any) => ({
			...state,
			sheet,
		}));
	}

	render() {
		if (!this.state || this.state.sheet === null) {
			return '<div>Loading...</div>';
		}

		const rows = this.state.sheet ? this.state.sheet.rows : [];
		if (this.state.sortBy) {
			rows.sort((a: Sheet.Row, b: Sheet.Row) => {
				if (!this.state.sortBy) {
					return 0;
				}
				// @ts-ignore
				let v1 = a[this.state.sortBy] as string;
				// @ts-ignore
				let v2 = b[this.state.sortBy] as string;
				return v1.localeCompare(v2);
			});
		}

		return (
			<div className="App">
				<Table striped bordered hover className="tableFixHead">
					<thead>
					<tr>
						<th onClick={this.sortBy.bind(this, 'automarke')}>Brand</th>
						<th onClick={this.sortBy.bind(this, 'automodell')}>Make</th>
						<th onClick={this.sortBy.bind(this, 'batterie-kapazität')}>Battery</th>
						<th onClick={this.sortBy.bind(this, 'gesamt-reichweiteelektrisch')}>Range</th>
						<th onClick={this.sortBy.bind(this, 'lade-leistung')}>Charging with</th>
					</tr>
					</thead>
					<tbody>
					{rows.map((row: Sheet.Row) => {
							return (
								<tr key={row.id}>
									<td>{row.automarke}</td>
									<td>{row.automodell}</td>
									<td>{row['batterie-kapazität']}</td>
									<td>{row['gesamt-reichweiteelektrisch']}</td>
									<td>{row['lade-leistung']}</td>
								</tr>);
						}
					)}
					</tbody>
				</Table>
			</div>
		);
	}

	sortBy(column: string) {
		this.setState((state) => ({
			...state,
			sortBy: column,
		}));
	}
}
