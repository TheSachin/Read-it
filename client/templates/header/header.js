/**
 * Created by sachin on 3/3/15.
 */
Template.header.helpers({
    userLoginStatus: function () {
        var userId = Meteor.userId();
        if (userId === null) {
            return "Sign In";
        }
        if (userId != null) {
            return "Sign Out";
        }
    }
});