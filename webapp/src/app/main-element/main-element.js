Polymer({
  is: 'main-element',
  behaviors: [
     AppBehavior
  ],

  properties:{
  	login:{
  		type: Number,
  		value: 0
  	},
    admin:{
      type: Boolean,
      value: false
    }
  },

  ready: function(){
  	var ls = window.localStorage.getItem("my-app-storage");
  	var loged = JSON.parse(ls);
    if (loged.isLoged !== null){
        this.login = loged.isLoged;
        this.admin = loged.admin;
      }
  } 
  
});