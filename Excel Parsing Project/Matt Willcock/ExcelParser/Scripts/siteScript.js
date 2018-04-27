var newerFileDone = false;
var olderFileDone = false;
var newerFile;
var olderFile;

function ExportToTable() { 
$('#exceltable> tr').remove();
     var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;  
     /*Checks whether the file is a valid excel file*/  
     if (regex.test($("#excelfile2").val().toLowerCase())) {  
         var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/  
         if ($("#excelfile2").val().toLowerCase().indexOf(".xlsx") > 0) {  
             xlsxflag = true;  
         }  
         /*Checks whether the browser supports HTML5*/  
         if (typeof (FileReader) != "undefined") {  		
		 
			//File reader 1
             var reader = new FileReader();  
             reader.onload = function (e) { 		 
                 var data = e.target.result; 			 
                 /*Converts the excel data in to object*/  
                 if (xlsxflag) {  
                     var workbook = XLSX.read(data, { type: 'binary' });  
                 }  
                 else {  
                     var workbook = XLS.read(data, { type: 'binary' });  
                 }  
                 /*Gets all the sheetnames of excel in to a variable*/  
                 var sheet_name_list = workbook.SheetNames;  
  
                 var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/  
				 var exceljson;
                 sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/  
                     /*Convert the cell value to Json*/  					 
                     if (xlsxflag) {  
                         olderFile = XLSX.utils.sheet_to_json(workbook.Sheets[y]);  
						 newerFileDone = true;
						 parseFiles();	
                     }  
                     else {  
                         olderFile = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);  
						 newerFileDone = true;
						 parseFiles();	
                     }   			 
                 });
							
             }			 			
			 
			 //File reader 2
             var reader2 = new FileReader();  
             reader2.onload = function (e) { 		 
                 var data = e.target.result; 			 
                 /*Converts the excel data in to object*/  
                 if (xlsxflag) {  
                     var workbook = XLSX.read(data, { type: 'binary' });  
                 }  
                 else {  
                     var workbook = XLS.read(data, { type: 'binary' });  
                 }  
                 /*Gets all the sheetnames of excel in to a variable*/  
                 var sheet_name_list = workbook.SheetNames;  
  
                 var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/  
				 
                 sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/  
                     /*Convert the cell value to Json*/  					 
                     if (xlsxflag) {  
                         newerFile = XLSX.utils.sheet_to_json(workbook.Sheets[y]);  
						 olderFileDone = true;
						 parseFiles();	
                     }  
                     else {  
                         newerFile = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);
						olderFileDone = true;
						 parseFiles();							 
                     }                       
                 });  		
                 $('#exceltable').show();	
			     			 
             }
			 
			 //Execute the reader
             if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/  
                reader.readAsArrayBuffer($("#excelfile2")[0].files[0]);
				reader2.readAsArrayBuffer($("#excelfile")[0].files[0]); 	
             }  
             else {  
                 reader.readAsBinaryString($("#excelfile2")[0].files[0]);  
             }  
         }  
         else {  
             alert("Sorry! Your browser does not support HTML5!");  
         }  
     }  
     else {  
         alert("Please upload a valid Excel file!");  
     }  
 }  
 
 
 function parseFiles() {	 
	 if (newerFileDone && olderFileDone){
		 var foundObjectsArray = [];	
		 var parsedFoundObjectsArray = [];	 
		 /*If the user wishes to find the unique values between two files 'step 2' */
		 if ($('#uniqueValues').is(":checked")) {	
			/*Loop through each row and compare each value against the older file*/	 
			 for (var i = 0; i < newerFile.length; i++)
				{	
					var newAddress2 = "";
					var newAddress3 = "";
					var newAddress4 = "";
					
					if (JSON.stringify(newerFile[i]["Address Line 2"]) == undefined) {
						newAddress2 = "";
					} else {
						newAddress2 = JSON.stringify(newerFile[i]["Address Line 2"]);
					}
					
					if (JSON.stringify(newerFile[i]["Address Line 3"]) == undefined) {
						newAddress3 = "";
					} else {
						newAddress3 = JSON.stringify(newerFile[i]["Address Line 3"]);
					}
					
					if (JSON.stringify(newerFile[i]["Address Line 4"]) == undefined) {
						newAddress4 = "";
					} else {
						newAddress4 = JSON.stringify(newerFile[i]["Address Line 4"]);
					}
				
					var find = '"';
					 var re = new RegExp(find, 'g');
					 var obj = {};					 
					 obj["Address Line 2"] = newAddress2.replace(re, '');
					 obj["Address Line 3"] = newAddress3.replace(re, '');
					 obj["Address Line 4"] = newAddress4.replace(re, '');				 	
					 parsedFoundObjectsArray.push(obj);
				}				
			for (var i = 0; i < olderFile.length; i++)
			{	
				var find = '"';
				var re = new RegExp(find, 'g');
				var obj = {};	
				var oldAddress2 = "";
				var oldAddress3 = "";
				var oldAddress4 = "";							
			
				if (JSON.stringify(olderFile[i]["Address Line 2"]) != undefined) {				
					oldAddress2 = JSON.stringify(olderFile[i]["Address Line 2"]);
				}
				
				if (JSON.stringify(olderFile[i]["Address Line 3"]) != undefined) {				
					oldAddress3 = JSON.stringify(olderFile[i]["Address Line 3"]);
				}
				
				if (JSON.stringify(olderFile[i]["Address Line 4"]) != undefined) {				
					oldAddress4 = JSON.stringify(olderFile[i]["Address Line 4"]);
				}
		
				var match = true;
				
				for (var b = 0; b < parsedFoundObjectsArray.length; b++)
				{			
					var parsedAddress2 = "";
					var parsedAddress3 = "";
					var parsedAddress4 = "";
					
					if (JSON.stringify(parsedFoundObjectsArray[b]["Address Line 2"]) != undefined) {					
						parsedAddress2 = JSON.stringify(parsedFoundObjectsArray[b]["Address Line 2"]);
					}
					
					if (JSON.stringify(parsedFoundObjectsArray[b]["Address Line 3"]) != undefined) {					
						parsedAddress3 = JSON.stringify(parsedFoundObjectsArray[b]["Address Line 3"]);
					}
					
					if (JSON.stringify(parsedFoundObjectsArray[b]["Address Line 4"]) != undefined) {					
						parsedAddress4 = JSON.stringify(parsedFoundObjectsArray[b]["Address Line 4"]);
					}								    
						
					if (parsedAddress2.replace(re, '').toLowerCase() == oldAddress2.replace(re, '').toLowerCase() &&
						(parsedAddress3.replace(re, '').toLowerCase() == oldAddress3.replace(re, '').toLowerCase()) &&
						(parsedAddress4.replace(re, '').toLowerCase() == oldAddress4.replace(re, '').toLowerCase()))
						{
							match = true;
							break;									
						} else {
							match = false;							
						}				
				}
				if (!match) {								
					var find = '"';
					 var re = new RegExp(find, 'g');
					 var obj = {};					 
					 obj["Address Line 2"] = oldAddress2.replace(re, '');
					 obj["Address Line 3"] = oldAddress3.replace(re, '');
					 obj["Address Line 4"] = oldAddress4.replace(re, '');					
					 parsedFoundObjectsArray.push(obj);	 
				 }			
			}		
		 } else {
			/*Loop through each row and compare each value against the older file*/	 
			for (var i = 0; i < newerFile.length; i++)
			{	
				var match = true;
				
				var newAddress2 = "";
				var newAddress3 = "";
				var newAddress4 = "";
				
				if (JSON.stringify(newerFile[i]["Address Line 2"]) == undefined) {
					newAddress2 = "";
				} else {
					newAddress2 = JSON.stringify(newerFile[i]["Address Line 2"]);
				}
				
				if (JSON.stringify(newerFile[i]["Address Line 3"]) == undefined) {
					newAddress3 = "";
				} else {
					newAddress3 = JSON.stringify(newerFile[i]["Address Line 3"]);
				}
				
				if (JSON.stringify(newerFile[i]["Address Line 4"]) == undefined) {
					newAddress4 = "";
				} else {
					newAddress4 = JSON.stringify(newerFile[i]["Address Line 4"]);
				}
				
				for (var b = 0; b < olderFile.length; b++)
				{															
					var oldAddress2 = "";
					var oldAddress3 = "";
					var oldAddress4 = "";							
				
					if (JSON.stringify(olderFile[b]["Address Line 2"]) == undefined) {
						oldAddress2 = "";
					} else {
						oldAddress2 = JSON.stringify(olderFile[b]["Address Line 2"]);
					}
					
					if (JSON.stringify(olderFile[b]["Address Line 3"]) == undefined) {
						oldAddress3 = "";
					} else {
						oldAddress3 = JSON.stringify(olderFile[b]["Address Line 3"]);
					}
					
					if (JSON.stringify(olderFile[b]["Address Line 4"]) == undefined) {
						oldAddress4 = "";
					} else {
						oldAddress4 = JSON.stringify(olderFile[b]["Address Line 4"]);
					}

						if (newAddress2.toLowerCase() == oldAddress2.toLowerCase() &&
							(newAddress3.toLowerCase() == oldAddress3.toLowerCase()) &&
							(newAddress4.toLowerCase() == oldAddress4.toLowerCase()))
						{
							match = true;
							break;									
						} else {
							match = false;							
						}				
				}	
				 
				 if (!match) {
					 var find = '"';
					 var re = new RegExp(find, 'g');
					 var obj = {};					 
					 obj["Address Line 2"] = newAddress2.replace(re, '');
					 obj["Address Line 3"] = newAddress3.replace(re, '');
					 obj["Address Line 4"] = newAddress4.replace(re, '');					
					 foundObjectsArray.push(obj);					 
				 }
				 
			};
			
			for (var i = 0; i < foundObjectsArray.length; i++) {  /*Compare all rows in excel*/  	
				
				var fdAddress2 = "";
				var fdAddress3 = "";
				var fdAddress4 = "";
				
				if (JSON.stringify(foundObjectsArray[i]["Address Line 2"] != undefined)) {			
					fdAddress2 = JSON.stringify(foundObjectsArray[i]["Address Line 2"]);
				}
				
				if (JSON.stringify(foundObjectsArray[i]["Address Line 3"] != undefined)) {				
					fdAddress3 = JSON.stringify(foundObjectsArray[i]["Address Line 3"]);
				}
				
				if (JSON.stringify(foundObjectsArray[i]["Address Line 4"] != undefined)) {				
					fdAddress4 = JSON.stringify(foundObjectsArray[i]["Address Line 4"]);
				}	
					
				parsedFoundObjectsArray.push(foundObjectsArray[i]);
				
				/*Sault Ste. Marie filtering
				if (fdAddress2.toLowerCase().indexOf("sault") != -1 || 
					fdAddress3.toLowerCase().indexOf("sault") != -1 || 
					fdAddress4.toLowerCase().indexOf("sault") != -1) {
					parsedFoundObjectsArray.push(foundObjectsArray[i]);
				};*/
				
			}
		 }
		BindTable(parsedFoundObjectsArray, '#exceltable');  
	 }
 }
 
 
 function BindTable(jsondata, tableid) {/*Function used to convert the JSON array to Html Table*/  
	if ($.fn.DataTable.isDataTable(tableid)) {
		var dt = $(tableid).DataTable();
		dt.destroy();		
		$("#exceltable_wrapper").remove();			
	}
	$("#tableWrapper").html("<table id='exceltable'></table>");
     var columns = BindTableHeader(jsondata, tableid); /*Gets all the column headings of Excel*/  	
	$(tableid).append("<tbody>");	 
	 if (jsondata.length > 1) { /*More than just the column headings*/ 
	 var i = 0;
		 for (i; i < jsondata.length; i++) {  
			 var row$ = $('<tr/>');  
			 for (var colIndex = 0; colIndex < columns.length; colIndex++) {  
				 var cellValue = jsondata[i][columns[colIndex]];  
				 if (cellValue == null) {
					 cellValue = "";  
				 }
				 row$.append($('<td/>').html(cellValue));  
			 }  
			 $(tableid).append("</tbody>");	 		 
			 $(tableid).append(row$);  
		 }  
	 } else {		 
		 $(tableid).append("</tbody>");
	 }
	 $('#exceltable tr:first').wrap('<thead />');	
	 
		if (i == jsondata.length) {
			BindDatatable();	 
		} else if (jsondata.length == 1) {
			BindDatatable();
		} else if (jsondata.length == 0) {
			$("#tableWrapper").html("<table id='exceltable'></table>");
			var table = "";
			 table += '<thead><tr>';
			table += '<th>Address Line 2</th>';
			table += '<th>Address Line 3</th>';
			table += '<th>Address Line 4</th>';
			table += '</tr></thead>';		
			table += "<tbody>";
			table += "</tbody>";	 
			$(tableid).append(table);
			BindDatatable();
		}
 }  
 function BindDatatable() {
	 var today = new Date();
		 var twoDigitMonth = ((today.getMonth().length+1) === 1) ? (today.getMonth()+1) :(today.getMonth()+1);
		 if (twoDigitMonth < 10) {
			 twoDigitMonth = "0" + twoDigitMonth;
		 }
		 var currentDate = today.getDate() + "-" + twoDigitMonth + "-" + today.getFullYear();
		 
		 /*Output to a datatable with export buttons*/
		 $("#exceltable").DataTable({ 
			dom: 'Bfirt',
			paging: false,		
			buttons: [            
				{
					extend: 'csv',
					title: '',
					filename:  'File_Compare_Export___' + currentDate
				},
				{
					extend: 'excel',
					title: '',
					filename:  'File_Compare_Export___' + currentDate,
					customize: function(xlsx) {
						var sheet = xlsx.xl.worksheets['sheet1.xml'];
						var col = $('col', sheet);
						col.each(function () {
							$(this).attr('width', 30);
						});
					}
				},
				{
					extend: 'pdf',
					title: '',
					filename:  'File_Compare_Export___' + currentDate
				}
				]
			});	
 }
 
 function BindTableHeader(jsondata, tableid) {/*Function used to get all column names from JSON and bind the html table header*/  
	 if (!$.fn.DataTable.isDataTable("#exceltable")){
		 var columnSet = [];
		 var headerTr$ = $('<tr/>');  
		 for (var i = 0; i < jsondata.length; i++) {  
			 var rowHash = jsondata[i];  
			 for (var key in rowHash) {  
				 if (rowHash.hasOwnProperty(key)) {  
					 if ($.inArray(key, columnSet) == -1) {/*Adding each unique column names to a variable array*/  
						 columnSet.push("Address Line 2");  
						 headerTr$.append($('<th/>').html("Address Line 2"));
						 columnSet.push("Address Line 3");  
						 headerTr$.append($('<th/>').html("Address Line 3"));
						 columnSet.push("Address Line 4"); 
						 headerTr$.append($('<th/>').html("Address Line 4"));					 
					 }  
				 }  
			 }  
		 } 
		 
		 $(tableid).append(headerTr$);  
		 return columnSet;  
	 }
 }  