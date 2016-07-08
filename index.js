"use strict";
var fs = require('fs');
var seperator = '__';

var folderPath = process.argv[2];

function rename (fileName) {
	var matchResult = fileName.match(/(0?[1-9]|1[012])[\-]\d{4}/),
		splitResult;
	if (Array.isArray(matchResult) && matchResult.length > 0) {
		splitResult = matchResult[0].split('-');
		fs.rename(folderPath + '/' + fileName, folderPath + '/' + splitResult[1] + '-' + splitResult[0] + seperator + fileName, () => {console.log('OK', fileName);});
	}
}

fs.readdir(folderPath, function(error, files) {
     if (error)
        console.log('error ' + error.code + ' : ' + error.message);
     else {
        let i, len;
		for (i = 0, len = files.length; i < len; i++) {
			let fileName = files[i];
			if (fileName.length > 4 && fileName.toLowerCase().indexOf('.pdf') === (fileName.length - 4) && fileName.indexOf('PB_KAZ') === 0) {
				rename(fileName);
			}
		}		
     }
 })
