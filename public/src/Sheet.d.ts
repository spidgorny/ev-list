export namespace Sheet {

	export interface Author {
		name: string;
		email: string;
	}

	export interface Worksheet {
		url: string;
		id: string;
		title: string;
		rowCount: number;
		colCount: number;
		_links: any[];
	}

	export interface Info {
		id: string;
		title: string;
		updated: Date;
		author: Author;
		worksheets: Worksheet[];
	}

	export interface Sheet {
		url: string;
		id: string;
		title: string;
		rowCount: number;
		colCount: number;
		_links: any[];
	}

	export interface Row {
		_xml: string;
		id: string;
		_links: any[];
		automarke: string;
		automodell: string;
		'batterie-kapazität': string;
		_cre1l: string;
		'gesamt-reichweiteelektrisch': string;
		_ciyn3: string;
		'lade-leistung': string;
		kw100km: string;
		reichweitenach1stundeanladestation: string;
		ladedaueranderladestation: string;
		ladedauerandersteckdose: string;
		'stecker-typ': string;
		'energie-verbrauchkwh100km': string;
		zudenpassendenladestationen: string;
	}

	export interface ISheet {
		info: Info;
		sheet: Sheet;
		rows: Row[];
	}

}
