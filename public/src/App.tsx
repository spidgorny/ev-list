import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";
import {Sheet} from './Sheet';
import {CarRow} from "./CarRow";

const axios = require('axios').default;

interface IAppState {
	sheet?: Sheet.ISheet | null;
	sortBy: null | string;
}

export default class App extends React.Component<any, IAppState> {

	constructor(props: any) {
		super(props);
		this.fetchData().then(r => {
			this.setState((state) => ({
				...state,
				sortBy: localStorage.getItem('sortBy'),
			}));
		});
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

	isNumeric(n: string) {
		return !isNaN(parseFloat(n)) && isFinite(parseInt(n, 10));
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
				if (this.isNumeric(v1[0]) && this.isNumeric(v2[0])) {
					const i1 = parseFloat(v1);
					const i2 = parseFloat(v2);
					return i1 - i2;
				}
				return v1.localeCompare(v2);
			});
		}

		return (
			<div className="App">
				<Table striped bordered hover className="tableFixHead">
					<thead>
					<tr>
						<th></th>
						<th onClick={this.sortBy.bind(this, 'automarke')}>Brand</th>
						<th onClick={this.sortBy.bind(this, 'automodell')}>Make</th>
						<th onClick={this.sortBy.bind(this, 'batterie-kapazität')}>Battery</th>
						<th onClick={this.sortBy.bind(this, 'gesamt-reichweiteelektrisch')}>Range</th>
						<th onClick={this.sortBy.bind(this, 'lade-leistung')}>Charging with</th>
						<th onClick={this.sortBy.bind(this, 'kw100km')}>Efficiency</th>
						<th onClick={this.sortBy.bind(this, 'stecker-typ')}>Charging port</th>
					</tr>
					</thead>
					<tbody>
					{rows.map((row: Sheet.Row) => {
						return <CarRow data={row} key={row.id}/>;
					})}
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
		localStorage.setItem('sortBy', column);
	}
}
