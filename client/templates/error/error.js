/**
 * Created by sachin on 3/3/15.
 */
Template.error.rendered = function () {
    //Meteor.redirect("updateBook");
    Router.go("updateBook");
    Meteor.next();
};
