import React from "react";
import {Sheet} from "./Sheet";

export class CarRow extends React.Component<{data: Sheet.Row}, {}> {

	state = {
		checked: false,
	};

	render() {
		const row = this.props.data;
		return (
			<tr key={row.id} className={this.state.checked ? 'bg-primary text-dark' : ''}
				onClick={this.checked.bind(this)}
			>
				<td>
					<input type={'checkbox'} id={'check'+row.id} checked={this.state.checked} onChange={this.checked.bind(this)}/>
				</td>
				<td>{row.automarke}</td>
				<td>{row.automodell}</td>
				<td>{row['batterie-kapazität']}</td>
				<td>{row['gesamt-reichweiteelektrisch']}</td>
				<td>{row['lade-leistung']}</td>
				<td>{row['kw100km']}</td>
				<td>{row['stecker-typ']}</td>
			</tr>);
	}

	checked() {
		this.setState((state) => ({
			...state,
			checked: !this.state.checked,
		}))
	}

}
