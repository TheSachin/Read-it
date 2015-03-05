Template.ViewBookList.helpers({
    BooksList: function () {
        var BooksList = [];
        var BooksDbListCursor = Books.find();
        var showBookObject = {};
        BooksDbListCursor.forEach(function (book) {
            showBookObject._id = book._id;
            showBookObject.hasFinished = book.hasFinished;
            showBookObject.name = book.name;
            BooksList.push(showBookObject);
            showBookObject = {};
        });
        return BooksList;
    }
});