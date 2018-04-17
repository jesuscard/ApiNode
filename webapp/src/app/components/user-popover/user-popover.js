Polymer({
   is: 'user-popover',
   behaviors:[
     AppBehavior
   ],
   properties: {
      userIdentity: {
         type: Object,
         notify: true
      },
      userOptionsPage: {
       notify: true,
       value: "user_info"
     }
   },
   listeners: {
      "iron-form-presubmit": "saveEditData"
   },
   sendEditForm: function(){
    this.$.editForm.submit();
   },
   saveEditData: function(event) {
    event.preventDefault();
   },
   showUserInfo: function() {
      this.userOptionsPage = "user_info";
   },
   resetContent: function() {
     this.showUserInfo();
   },
   editData: function(event) {
    event.preventDefault();
    this.userOptionsPage = "edit_section";
    return false;
   },
   confirmLogout: function() {
     this.confirm({
      title: this.localize('confirmation'),
      message: this.localize('confirm_logout')
     },function(){
       this.fire("app-logout",{});
     }.bind(this));
     this.$.userOptionsPaperElement.close();
   }
});