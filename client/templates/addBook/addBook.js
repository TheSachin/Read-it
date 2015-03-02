Template.addBook.rendered = function(){
	var currentDate =moment(new Date());
	var afterSevenDaysDate = moment(currentDate);
	afterSevenDaysDate.date(currentDate.date()+ 7);
    $('#dateStarted').datetimepicker({format:'ddd , D MMM YY',minDate : currentDate,defaultDate:currentDate});
    $('#dateToFinish').datetimepicker({format:'ddd , D MMM YY',defaultDate:afterSevenDaysDate});
};
   
Template.addBook.events({
	'submit #addBookForm':function(event){		
	var serializedArrayInput =$("#addBookForm").serializeArray();
        var arrayInput = ExtractArrayFromNameValuePairs(serializedArrayInput);
    	bookId = addBookIntoDb(arrayInput);
        event.preventDefault();

	}
});
function ExtractArrayFromNameValuePairs(nameValueArray) {
    var oResult = {};
    var arrayLength = nameValueArray.length;
    var i;
    for (i = 0; i <arrayLength ; i++) {
        var aTemp = nameValueArray[i];
        oResult[aTemp.name] = decodeURI(aTemp.value);
    }

    return oResult;
}
function addBookIntoDb(serializedArrayInput)
{
    if(!serializedArrayInput instanceof  Array)
    {
        return false;
	}
    //TODO : add required checks
    var bookArray = serializedArrayInput;
    bookArray = prepareBookArray(bookArray);
	
	var bookId = Books.insert(JSON.parse(bookArray));
	return bookId;

}
function prepareBookArray(bookArray)
{
	var bookJson = {}
	bookJson['hasFinished'] = false;
	bookJson['currentPage'] = 1;
	bookJson['name'] = bookArray['bookName'];	
	bookJson['author'] = bookArray['bookAuthor'];	
	bookJson['img'] = bookArray['bookName'];	
	bookJson['numOfPages'] = bookArray['numOfPages'];	
	bookJson['dateStarted'] = convertToStandardDate(bookArray['dateStarted']);	
	bookJson['dateToFinish'] = convertToStandardDate(bookArray['dateToFinish']);	
    //TODO : add user id to bookArray
//    bookArray['userId'] =
     var jsonString =JSON.stringify(bookJson);
     return jsonString;
 }
function convertToStandardDate(momentDate)
{
	var standardDate = new moment(momentDate,"ddd , D MMM YY");
	var standardDateFormat = "DD-MM-YYYY";
	return	standardDate.format(standardDateFormat);
}



