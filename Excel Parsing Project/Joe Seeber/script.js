/*
Programmer: Joe Seeber
Date: 03/19/2018

Last Modified: 2018-03-22
Description: Code for comparing the Excel files.
*/

//Displays the radio buttons
$(document).ready(function () {
    $("input:radio[name='RadioSelection']").change(function () {

        if ($(this).is(':checked') && $(this).val() == 'birth') {
            $("#DisplayBirthLeadSelection").removeAttr('hidden');
            $("#DisplayPrenatalLeadSelection").prop('hidden', true);
        }

        if ($(this).is(':checked') && $(this).val() == 'prenatal') {
            $("#DisplayPrenatalLeadSelection").removeAttr('hidden');
            $("#DisplayBirthLeadSelection").prop('hidden', true);
        }
    });
});

          //Global Variable
          var Current_Month_Records = [];
          var Previous_Month_Records = [];
          var New_User_Additions = [];

          //Birth & Lead Variables
          var previousMonthDataBirthLead;
          var currentMonthDataBirthLead;

          //Prenatal & Lead Variables
          var previousMonthDataPrenatalLead;
          var currentMonthDataPrenatalLead;


          //EventListeners:  birth and lead
          PreviousMonthBirthFile.addEventListener('change', function (e) {
              PreviousMonthHandleFile(e, previousMonthDataBirthLead)
          }, false);

          CurrentMonthBirthFile.addEventListener('change', function (e) {
              CurrentMonthHandleFile(e, currentMonthDataBirthLead)
          }, false);

          //EventListeners: prenatal and lead
          PreviousMonthPrenatalFile.addEventListener('change', function (e) {
              PreviousMonthHandleFile(e, previousMonthDataPrenatalLead)
          }, false);

          CurrentMonthPrenatalFile.addEventListener('change', function (e) {
              CurrentMonthHandleFile(e, currentMonthDataPrenatalLead)
          }, false);


          var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer

          //function handleFile: Previous month
          function PreviousMonthHandleFile(e, dataFile)
          {
              var files = e.target.files, f = files[0];
              var reader = new FileReader();

              reader.onload = function (e)
              {
                  var data = e.target.result;
                  if (!rABS) data = new Uint8Array(data);
                  var workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });

                  var first_sheet_name = workbook.SheetNames[0];
                  var worksheet = workbook.Sheets[first_sheet_name];

                  Previous_Month_Records = XLSX.utils.sheet_to_json(worksheet);
              };
              if (rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
          }

          //function handleFile: Current month
          function CurrentMonthHandleFile(e, dataFile)
          {
              console.log(e);
              console.log(dataFile);
              var files = e.target.files, f = files[0];
              var reader = new FileReader();
              reader.onload = function (e)
              {
                  var data = e.target.result;
                  if (!rABS) data = new Uint8Array(data);
                  var workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });

                  var first_sheet_name = workbook.SheetNames[0];
                  var worksheet = workbook.Sheets[first_sheet_name];

                  Current_Month_Records = XLSX.utils.sheet_to_json(worksheet);
              };
              if (rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
          }


          //Validation for Birth & Lead -->  Verify if user has selected two XLSX files to compare from the input file forms
          function requiredBirth() {
              if (document.getElementById("PreviousMonthBirthFile").files.length == 0 || document.getElementById("CurrentMonthBirthFile").files.length == 0){
                  document.getElementById("errorMessage").innerHTML = "*Missing Birth & Lead File(s)";
              }
              else { compareFiles();
              }
          }

          //Validation for Prenatal & Lead
          function requiredPrenatal() {
              if (document.getElementById("PreviousMonthPrenatalFile").files.length == 0 || document.getElementById("CurrentMonthPrenatalFile").files.length == 0) {
                  document.getElementById("errorMessage").innerHTML = "*Missing Prenatal & Lead File(s)";
              }
              else { compareFiles();
              }
          }

          //Comparing the current month with previous month
          function compareFiles()
          {
              var found = false;
              //Looking for differences in the file
              for (var x = 0; x < Current_Month_Records.length; x++)
              {
                  found = false;

                  for (var y = 0; y < Previous_Month_Records.length; y++)
                  {
                      if (Current_Month_Records[x]["Address Line 2"] == Previous_Month_Records[y]["Address Line 2"] &&
                          Current_Month_Records[x]["Address Line 3"] == Previous_Month_Records[y]["Address Line 3"] &&
                          Current_Month_Records[x]["Address Line 4"] == Previous_Month_Records[y]["Address Line 4"])
                      {
                          found = true;
                          break;
                      }
                  }
                  //If differences found store the record in New_User_Additions list
                  if (!found)
                  {
                      New_User_Additions.push(Current_Month_Records[x]);
                  }
              }
              //Verifying if new entries in list
              if (New_User_Additions.length == 0)
              {
                  window.alert("No additional records found.");
              }
              else {
                 writeExcelFile();               
              }
          }


          //write new records to an excel spreadsheet
          function writeExcelFile()
          {
              var birthFileName = $("#exportBirthFileName").val();
              var prentalFileName = $("#exportPrenatalFileName").val();

              //Verify what file to be named
              if (document.getElementById('RadioBirth').checked)
              {
                  fileName = birthFileName;
              } else {
                  fileName = prentalFileName;
              }

              var wb = XLSX.utils.book_new();
              var wsCols = [
                  { wpx: 133 },
                  { wpx: 133 },
                  { wpx: 150 },
                  { wpx: 150 },
                  { wpx: 150 }
              ];

              var ws = XLSX.utils.json_to_sheet(New_User_Additions);
              ws['!cols'] = wsCols;

              var wopts = { bookType: 'xlsx', bookSST: false, type: 'array' };

              XLSX.utils.book_append_sheet(wb, ws, "result");
              XLSX.writeFile(wb, fileName += ".xlsx");

              //Reset array
              New_User_Additions = [];
              }
