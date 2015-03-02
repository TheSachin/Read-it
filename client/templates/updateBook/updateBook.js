DetailBookObject = {};
Template.updateBook.helpers({
    BookDetails :function(){
        var Book = Books.findOne({hasFinished: false});
        DetailBookObject = buildDetailBookObjectFromDatabaseBook(Book);
        return DetailBookObject;
    }
});
Template.updateBook.events({
    "submit #updateCurrentPage": function (event) {
        event.preventDefault();
        var latestUpdate = $("#inputlatestPage").val();
        if (latestUpdate <= 0) {
            alert("Sorry , number can not be less than 0");
        }
        //getting the current page
        DetailBookObject.currentPage = latestUpdate;
        //update the Details view object
        updateDetailBook(DetailBookObject);
        //animation
        doAnimationUpdateProgress("percentage", DetailBookObject.percentage);
        saveDetailBookObjectToDatabase(DetailBookObject);
        //now time to hide the modal
        $("#currentPageModal").modal('hide');
    }
});
function doAnimationUpdateProgress(id, percentage) {
    var idSelector = "#" + id;
    $(idSelector).css('width', percentage + '%').attr('aria-valuenow', percentage);

}
function updateDetailBook(UpdateBookObject) {
    UpdateBookObject.percentage = ((UpdateBookObject.currentPage / UpdateBookObject.numOfPages) * 100).toFixed(2);
    UpdateBookObject.pagesRemaining = UpdateBookObject.numOfPages - UpdateBookObject.currentPage;
    var finishMoment = moment(UpdateBookObject['dateToFinish'], "DD-MM-YYYY");
    var startMoment = moment(UpdateBookObject.dateStarted, "DD-MM-YYYY");
    var nowMoment = moment();
    UpdateBookObject.daysLeft = finishMoment.diff(nowMoment, 'days');
    UpdateBookObject.perDayToRead = Math.ceil(UpdateBookObject.pagesRemaining / UpdateBookObject.daysLeft);
    return UpdateBookObject;
}
function buildDetailBookObjectFromDatabaseBook(Book) {

    DetailBookObject.currentPage = Book.currentPage;
    DetailBookObject.name = Book['name'];
    DetailBookObject.author = Book['author'];
    // DetailBookObject.img = Book.img;
    DetailBookObject.numOfPages = Book['numOfPages'];
    DetailBookObject.dateStarted = Book['dateStarted'];
    DetailBookObject.dateToFinish = Book['dateToFinish'];
    DetailBookObject = updateDetailBook(DetailBookObject);
    DetailBookObject._id = Book._id;
    return DetailBookObject;
}
function saveDetailBookObjectToDatabase(detailBookObject) {
    Books.update({_id:detailBookObject._id},{$set :{
        currentPage:detailBookObject.currentPage,
        name : detailBookObject.name,
        author : detailBookObject.author,
        numOfPages : detailBookObject.numOfPages,
        dateStarted : detailBookObject.dateStarted,
        dateToFinish : detailBookObject.dateToFinish,
    }});
}



