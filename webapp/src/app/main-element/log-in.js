Polymer({
   is: 'log-in',
   behaviors: [
      AppBehavior
   ],
   properties:{
   		user:{
   			type: Object
   		},

      formData: {
            type: Object,
            value: {}
      },

      storedUser:{
        type: Object
      },
        
      error: String
   },


    _setReqBody: function() {      
      this.$.accessAjax.body= this.formData;
    },

    sendForm: function() {
     var me = this;
     var form = me.$.formlogin;
     if (form.validate()) {
      this._setReqBody();
      this.$.accessAjax.generateRequest();
    }
  },


    initializeDefaultUsuario: function() {
      this.storedUser = {
        username: "",
        password: "",
        isLoged: 0, 
        admin: false
      }
    },

   makeModifications: function(user, password, admin) {
      this.set('storedUser.username',user );
      this.set('storedUser.password',password );
      this.set('storedUser.isLoged',1 );
      this.set('storedUser.admin',admin);

    },

    handleUserResponse: function(event) {
        var response = JSON.parse(event.detail.response);
       if (response.id_token) {
            this.error = '';
            this.storedUser = {
                name: this.formData.username,
                id_token: response.id_token,
                access_token: response.access_token,
                loggedin: true,
                storedUser:0
            };
            
       }
       if(response.data != null){
         this.makeModifications(response.data.log_usu, response.data.pas_usu, response.data.niv_adm);
         this.formData = {};    
        window.location.reload();  
       }

    },

    handleUserError: function(event) {
      var response = JSON.parse(event.detail.request.xhr.response);
      console.log(response);
      this.error = response;

    }

});