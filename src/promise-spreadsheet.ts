const GoogleSpreadsheet = require('google-spreadsheet');

export function GoogleSpreadsheetService({
											   sensitive,
											   logger
										   }) {
	let retr: any = {};

	const spreadsheetId = process.env.spreadsheetId || sensitive.dataStore.googleSpreadsheet;

	const googleDoc = new GoogleSpreadsheet(spreadsheetId);

	retr.setupConnection = () => {
		return new Promise((resolve, reject) => {
			googleDoc.useServiceAccountAuth(sensitive.google, function (connErr) {
				if (connErr) {
					logger.error(`[${new Date().getTime()}]: GoogleSpreadsheetService:: Failed to connect to spreadsheet. spreadsheetId: ${spreadsheetId}`);
					reject(connErr);
					return;
				}
				resolve({success: true});
			});
		});
	};

	retr.getInfo = () => {
		return new Promise((resolve, reject) => {
			const getInfoCb = (err, spreadsheetInfo) => {
				if (err) {
					reject(err);
					return;
				}

				resolve({...spreadsheetInfo});
			};

			googleDoc.getInfo(getInfoCb);
		});
	};

	retr.getSheetByName = (sheetName) => {
		return new Promise((resolve, reject) => {
			if (!sheetName) {
				reject("No name provided");
			}

			const getInfoCb = (err, spreadsheetInfo) => {
				if (err) {
					reject(err);
					return;
				}

				spreadsheetInfo.worksheets.forEach((worksheet) => {
					if (worksheet.title === sheetName) {
						resolve({...worksheet});
					}
				});
				reject(`No worksheet by name '${sheetName}'.`);
			};

			googleDoc.getInfo(getInfoCb);
		});
	};

	retr.addSheet = (sheetName) => {
		return new Promise((resolve, reject) => {
			if (!sheetName) {
				reject({error: "No name provided", errorCode: 1});
			}

			retr.getSheetByName(sheetName).then((sheet) => {
				resolve({
					error: "Sheet with that name already exists.",
					errorCode: 2,
					sheet
				});
			}).catch(() => {
				const addSheetCb = (err, spreadsheetInfo) => {
					if (err) {
						reject({
							error: "Unable to add sheet",
							apiError: err,
							errorCode: 3,
						});
						return;
					}
					resolve({
						message: "Sheet created",
						successCode: 1,
						sheet: spreadsheetInfo
					});
				};

				googleDoc.addWorksheet({
					title: sheetName,
					headers: ['your', 'columns', 'here'],
					colCount: 16
				}, addSheetCb);
			});

		});
	};

	retr.addRow = (sheetId, data) => {
		return new Promise((resolve, reject) => {
			if (!sheetId) {
				reject("No sheet id provided");
			}

			const addRowCb = (err, spreadsheetRow) => {
				if (err) {
					reject(err);
					return;
				}
				resolve({...spreadsheetRow});
			};

			googleDoc.addRow(sheetId, data, addRowCb);
		});
	};

	retr.getRows = (sheet, options) => {
		return new Promise((resolve, reject) => {
			const addRowCb = (err, rows) => {
				if (err) {
					reject(err);
					return;
				}
				resolve([...rows]);
			};

			sheet.getRows(options, addRowCb);
		});
	};

	return retr;
}
