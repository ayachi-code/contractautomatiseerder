function make_pdf(naam,value) {
  // File 2
  var doc = DocumentApp.create(naam)
  var docId = doc.getId();
  DocumentApp.openById(docId).getBody().appendParagraph(value);
  doc.saveAndClose();
  var file = DriveApp.getFileById(docId);
  
  // File 3 (PDF)
  DriveApp.createFile(doc.getAs(MimeType.PDF));
  
  file.setTrashed(true);
} 
function run() {  
  var sheet = SpreadsheetApp.openById("1RBfCy4lM0SNimM_iXb0t4ZRrd0aCIz8k2FyDQwogYxU").getSheetByName('Blad1')
  var data = sheet.getDataRange().getValues();
  var template = "1W9fjZhwza0j5h_hDMAu1gUSoKdncAgwqL1zdmE2QkhI";
  var content = DocumentApp.openById(template).getBody().getText();
  var rows = Math.floor(data.length);
  
  for (var i = 1; i < rows; i++) {
    var map = {
      "<<name>>": data[i][0],
      "<<bsn>>": data[i][1],
      "<<street>>": data[i][2],
      "<<postalcode>>": data[i][3],
      "<<origin>>": data[i][4],
      "<<datum>>": data[i][5],
      "<<tel>>": data[i][6]
      
    };    
    content = content.replace(/<<name>>|<<bsn>>|<<street>>|<<postalcode>>|<<origin>>|<<datum>>|<<tel>>/gi, function(matched){
      return map[matched];
    }); 
        
    //var id_value_return = make_file("formulier_new2","werk");
    //var id_value = id_value_return;   
    make_pdf("formulier_new" + i,content);
    content = DocumentApp.openById(template).getBody().getText();
  }  
}
