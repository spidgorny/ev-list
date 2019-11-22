import React from 'react';
import './App.css';
const axios = require('axios').default;
import { useTable } from 'react-table';

export default class App extends React.Component<any, any> {

	state = {
		sheet: null,
	};

	constructor(props: any) {
		super(props);
		this.fetchData();
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
		const {
			getTableProps,
			getTableBodyProps,
			headerGroups,
			rows,
			prepareRow,
		} = useTable({
			columns: [
				'type'
			],
			data: this.state.sheet,
		});

		return (
			<div className="App">
              { this.state.sheet ? 'doc' : 'no doc' }
				<table {...getTableProps()}/>
			</div>
		);
	}
}
