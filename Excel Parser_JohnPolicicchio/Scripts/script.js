$(document).ready(function () {    
    
    $("input:button[name='nav']").click(applyHidden);

    $("input:radio[name='optionRadio']").change(function () {        

        if ($(this).is(':checked') && $(this).val() == 'birth') {
           
            $("#Previous").text("Select the Birth and Lead file for the previous month.");
            $("#Current").text("Select the Birth and Lead file for the current month.").removeHidden();            

        } else {
            
            $("#Previous").text("Select the Prenatal and Lead file for the previous month.");
            $("#Current").text("Select the Prenatal and Lead file for the current month.").removeHidden();            
        }
        var inputFile1 = document.getElementById("PrevFile").files.length;
        var inputFile2 = document.getElementById("CurrFile").files.length;
        if (inputFile1 > 0 && inputFile2 > 0) {            
        }
    });

    $("input:file[name='upload']").change(function () {
        
        var previousFile = $("#PrevFile")[0].files.length;
        var currentFile = $("#CurrFile")[0].files.length;        

        if (previousFile > 0 && currentFile > 0) {           
            $("#newFileName").removeAttr('hidden');
            $("#filename").removeAttr('hidden');
            $("#submit").removeAttr('hidden');
            $("#reset").removeAttr('hidden');                       
        }        
    });   
  
    $("#reset").click(applyHidden);

    $("#submit").click(function () {
        validateForm();        
    });

    $("#PrevFile").on("change", handleFile);
    $("#CurrFile").on("change", handleFile2);

    function applyHidden() {
        $("#legend").prop('hidden', true);
        $("#Previous").prop('hidden', true);
        $("#PrevFile").prop('hidden', true);
        $("#Current").prop('hidden', true);
        $("#CurrFile").prop('hidden', true);
        $("#filename").prop('hidden', true);
        $("#newFileName").prop('hidden', true);
        $("#submit").prop('hidden', true);
        $("#reset").prop('hidden', true);
    };

    $.fn.removeHidden = function () {
        $("#legend").removeAttr('hidden');
        $("#Previous").removeAttr('hidden');
        $("#PrevFile").removeAttr('hidden');
        $("#Current").removeAttr('hidden');
        $("#CurrFile").removeAttr('hidden');
    };
});

  
// GLOBAL VARIABLES
var prevMthJson = [];
var currMthJson = [];
var newJsonRecords = [];
var quit = false;


// READ EXCEL TO JSON previous file        
function handleFile(e) {
    
    prevMthJson = [];
    var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
    var f = document.getElementById("PrevFile").files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        if (!rABS) data = new Uint8Array(data);
        var workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });
               
        var sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[sheet_name];
        var json_previousExcel = XLSX.utils.sheet_to_json(worksheet);                            
        prevMthJson = json_previousExcel;                
    };            
    if (rABS) reader.readAsBinaryString(f);
}

// READ EXCEL TO JSON current file        
function handleFile2(e) {

    currMthJson = [];
    var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
    var f = document.getElementById("CurrFile").files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        if (!rABS) data = new Uint8Array(data);
        var workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });
         
        var sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[sheet_name];
        var json_currentExcel = XLSX.utils.sheet_to_json(worksheet);                          
        currMthJson = json_currentExcel;                
    };
    if (rABS) reader.readAsBinaryString(f);
}

// COMPARE TWO EXCEL FILES        
function fileCompare() {
    var prevFileLength = prevMthJson.length;
    var currFileLength = currMthJson.length;
    var Match = false;

    if (prevFileLength > 0 && currFileLength > 0) {        

        for (var i = 0; i < currFileLength; i++) {
          
            match = false;

            for (var j = 0; j < prevFileLength; j++) {

                if (prevMthJson[j]["Address Line 2"] == currMthJson[i]["Address Line 2"] &&
                    prevMthJson[j]["Address Line 3"] == currMthJson[i]["Address Line 3"] &&
                    prevMthJson[j]["Address Line 4"] == currMthJson[i]["Address Line 4"]) {

                    match = true;
                    break;
                }
            }
            if (!match) {
                newJsonRecords.push(currMthJson[i]);
            }
        }
        if (newJsonRecords.length == 0) {
            $("#modalText").text("There are no new records!");
            $("#myModal").modal("show");
            quit = true;
        }
    } else {
        if (prevMthJson.length == 0 && currMthJson.length == 0) {
            $("#modalText").text("The files cannot be empty!");
            $("#myModal").modal("show");
            quit = true;
        } else if (currMthJson.length == 0) {
            $("#modalText").text("The current month file cannot be empty!");
            $("#myModal").modal("show");
            quit = true;
        } else {
            $("#modalText").text("The previous month file cannot be empty!");
            $("#myModal").modal("show");
            quit = true;
        }
    }
}
// WRITE TO EXCEL
function createWorkbook() {

    var radioBirth = document.getElementById("RadioBirth");
    var radioPrenatal = document.getElementById("RadioPrenatal");
    var filename = document.getElementById("filename").value;
    // births/lead
    if (radioBirth.checked == true) {
        var wb = XLSX.utils.book_new();
        var wsCols = [
            { wch: 25 },
            { wch: 35 },
            { wch: 35 },
            { wch: 35 }
        ];
        var ws = XLSX.utils.json_to_sheet(newJsonRecords);
        ws['!cols'] = wsCols;
        XLSX.utils.book_append_sheet(wb, ws, "Births and Lead");
        if (filename != "") {
            XLSX.writeFile(wb, filename + ".xlsx", { compression: true });
        } else {
            XLSX.writeFile(wb, "ParsedBirthsAndLead.xlsx", { compression: true });
        }       
    }
    // prenatal/lead
    if (radioPrenatal.checked == true) {
        var wb = XLSX.utils.book_new();
        var wsCols = [
            { wch: 25 },
            { wch: 25 },
            { wch: 35 },
            { wch: 35 },
            { wch: 35 }
        ];
        var ws = XLSX.utils.json_to_sheet(newJsonRecords);
        ws['!cols'] = wsCols;
        XLSX.utils.book_append_sheet(wb, ws, "Prenatal and Lead");
        if (filename != "") {
            XLSX.writeFile(wb, filename + ".xlsx", { compression: true });
        } else {
            XLSX.writeFile(wb, "ParsedPrenatalAndLead.xlsx", { compression: true });
        }        
    }    
    newJsonRecords = [];
}

// FORM VALIDATION
function validateForm() {
    
    var radioBirth = document.getElementById("RadioBirth");
    var radioPrenatal = document.getElementById("RadioPrenatal");

    if (radioBirth.checked == true || radioPrenatal.checked == true) {
        var inputFile1 = document.getElementById("PrevFile").files.length;
        var inputFile2 = document.getElementById("CurrFile").files.length;

        if (inputFile1 == 0 && inputFile2 == 0) {            
            $("#modalText").text("You must select files for the current month and previous month.");
            $("#myModal").modal("show");
        }
        else if (inputFile1 == 1 && inputFile2 == 0) {           
            $("#modalText").text("You must select a file for the current month.");
            $("#myModal").modal("show");
        }
        else if (inputFile1 == 0 && inputFile2 == 1) {            
            $("#modalText").text("You must select a file for the previous month.");
            $("#myModal").modal("show");
        }
        else {
           
            fileCompare();
            if (quit == false) {
                createWorkbook();
            }            
        }
    }
    else {
        $("#modalText").text("You must select a document type.");
        $("#myModal").modal("show");
    }    
}
   

