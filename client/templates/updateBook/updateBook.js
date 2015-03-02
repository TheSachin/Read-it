
Template.updateBook.helpers({
    BookDetails :function(){
        var Book = Books.findOne({hasFinished:false});
        var UpdateBookObject = {};
        UpdateBookObject.currentPage = Book['currentPage'];
        UpdateBookObject.name = Book['name'];
        UpdateBookObject.author = Book['author'];
        // UpdateBookObject.img = Book.img;
        UpdateBookObject.numOfPages = Book['numOfPages'];
        UpdateBookObject.dateStarted = Book['dateStarted'];
        UpdateBookObject.dateToFinish = Book['dateToFinish'];
        UpdateBookObject.percentage = ((UpdateBookObject.currentPage/UpdateBookObject.numOfPages)*100).toFixed(2);
        UpdateBookObject.pagesRemaining = UpdateBookObject.numOfPages - UpdateBookObject.currentPage;
        var finishMoment = moment(UpdateBookObject['dateToFinish'],"DD-MM-YYYY");
        var startMoment = moment(UpdateBookObject.dateStarted,"DD-MM-YYYY");
        UpdateBookObject.perDayToRead = Math.ceil(UpdateBookObject.pagesRemaining/finishMoment.diff(startMoment,'days'));
        return UpdateBookObject;

    }
});
