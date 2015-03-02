Router.configure({
	layoutTemplate : 'layout',
	notFoundTemplate : 'notFound',
	loadingTemplate : 'loading'
});
Router.map(function() {

    this.route('profile', {path: '/profile'});
    this.route('addBook', {path: '/addBook'});
    this.route('updateBook', {path: '/updateBook'});

});

Router.onBeforeAction(function() {
  if (! Meteor.userId()) {
    this.redirect('profile');
      this.next();
  } else {
    this.next();
  }
});

