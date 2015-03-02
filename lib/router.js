Router.configure({
	layoutTemplate : 'layout',
	notFoundTemplate : 'notFound',
	loadingTemplate : 'loading'
});
Router.map(function() {

	this.route('profile' ,{path:'/profile'});
	this.route('addBook' ,{path : '/addBook'});
	this.route('updateBook/' ,
		{
		path:'/updateBook',
        loadingTemplate: 'loading'
			
                    
		});

});

Router.onBeforeAction(function() {
  if (! Meteor.userId()) {
    this.redirect('profile');
      this.next();
  } else {
    this.next();
  }
});
function getUpdateBookObject()
{

	var Book = Books.findOne({hasFinished:true});
	//return Book;
    var UpdateBookObject ={};
    return ;
	UpdateBookObject.currentPage = Book['currentPage'];
	UpdateBookObject.name = Book['name'];
	UpdateBookObject.author = Book['author'];
	// UpdateBookObject.img = Book.img;
	UpdateBookObject.numOfPages = Book['numOfPages'];
	UpdateBookObject.dateStarted = Book['dateStarted'];
	UpdateBookObject.dateToFinish = Book	['dateToFinish'];
	UpdateBookObject.percentage = (UpdateBookObject.currentPage/UpdateBookObject.numOfPages).toFixed(2);
	UpdateBookObject.pagesRemaining = UpdateBookObject.numOfPages - UpdateBookObject.currentPage;
	var finishMoment = moment(UpdateBookObject['dateToFinish'],"DD-MM-YYYY");
	var startMoment = moment(UpdateBookObject.dateStarted,"DD-MM-YYYY");
  UpdateBookObject.perDayToRead = finishMoment.diff(startMoment,'days');
  return UpdateBookObject;
}
