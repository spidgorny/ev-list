import GoogleSpreadsheet from "google-spreadsheet";

export function GoogleSpreadsheetService(spreadsheetId: string,
										 sensitive?: any,
										 logger?: any) {
	let retr: any = {};

	const googleDoc = new GoogleSpreadsheet(spreadsheetId);

	retr.setupConnection = () => {
		return new Promise((resolve, reject) => {
			googleDoc.useServiceAccountAuth(sensitive.google, (connErr: any) => {
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
			const getInfoCb = (err: any, spreadsheetInfo: any) => {
				if (err) {
					reject(err);
					return;
				}

				resolve({...spreadsheetInfo});
			};

			googleDoc.getInfo(getInfoCb);
		});
	};

	retr.getSheetByName = (sheetName: string) => {
		return new Promise((resolve, reject) => {
			if (!sheetName) {
				reject("No name provided");
			}

			const getInfoCb = (err: any, spreadsheetInfo: any) => {
				if (err) {
					reject(err);
					return;
				}

				spreadsheetInfo.worksheets.forEach((worksheet: any) => {
					if (worksheet.title === sheetName) {
						resolve({...worksheet});
					}
				});
				reject(`No worksheet by name '${sheetName}'.`);
			};

			googleDoc.getInfo(getInfoCb);
		});
	};

	retr.addSheet = (sheetName: any) => {
		return new Promise((resolve, reject) => {
			if (!sheetName) {
				reject({error: "No name provided", errorCode: 1});
			}

			retr.getSheetByName(sheetName).then((sheet: any) => {
				resolve({
					error: "Sheet with that name already exists.",
					errorCode: 2,
					sheet
				});
			}).catch(() => {
				const addSheetCb = (err: any, spreadsheetInfo: any) => {
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

	retr.addRow = (sheetId: any, data: any) => {
		return new Promise((resolve, reject) => {
			if (!sheetId) {
				reject("No sheet id provided");
			}

			const addRowCb = (err: any, spreadsheetRow: any) => {
				if (err) {
					reject(err);
					return;
				}
				resolve({...spreadsheetRow});
			};

			googleDoc.addRow(sheetId, data, addRowCb);
		});
	};

	retr.getRows = (sheet: any, options: any) => {
		return new Promise((resolve, reject) => {
			const addRowCb = (err: any, rows: any) => {
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
