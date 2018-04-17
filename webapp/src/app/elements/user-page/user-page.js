Polymer({
  is: 'user-page',
  properties: {
    list: {
      type: Array,
      value: []
    },
    formData: {
      type: Object,
      value: {}
    },
    searchItem: {
      type: String,
      value: null
    },
    user: {
      type: String,
      value: null
    },
    userAdmin:{
      type:Boolean
    },
    message: {
      type: String,
      value: null
    },
    hide: {
      type: Boolean,
      value: true
    },
    method: {
      type: String,
      value: null
    },
    url: {
      type: String,
      value: null
    },
    ocultar: {
      type: Boolean,
      value: true
    },
    ocultarUser: {
      type: Boolean,
      value: true
    },
    formEdit: {
      type: Object,
      value: {}
    },
    userItem: {
      type: Number,
      notify: true
    }, 
    userDelete:{
      type: Array,
      value: []
    }
  },
  behaviors: [
    AppBehavior
  ],
  observers: [
    '_selectedItemChanged(selectedItems.splices)'
  ],


  ready: function() {
    var ls = window.localStorage.getItem("my-app-storage");
    var admin = JSON.parse(ls);
    this.userAdmin = admin.admin
    this.$.toolbar.style.color = '#FAFAFA';
    this.$.toolbar.updateStyles();
  },

  attached: function(){
        this.async(function(){
          if(!this.userAdmin){
            this.$$('#grid1').multiSelection= false;
          }
        }.bind(this),50)
  },

  _toggleDrawer: function(e) {
    if(this.userItem === 0){
      this.drawerOpened = !this.drawerOpened;
    }else if(this.userItem.length === 1){
      var user = this.userItem[0];
      this.$.firstname.value = user.nom_usu;
      this.$.lastname.value = user.ape_usu;
      this.$.username.value = user.log_usu;
      this.$.password.value = user.pas_usu;
      this.drawerOpened = !this.drawerOpened;
    }else{
      this.$.formUser.reset();
      this.drawerOpened = !this.drawerOpened;

    }

  },

  formReset: function() {
    this.$.formUser.reset();
    this.drawerOpened = this.drawerOpened;
  },

  closeToolbarSearch: function() {
    this.$.toolbar.style.backgroundColor = '#AA00FF';
    this.$.toolbar.style.color = '#FFFFFF';
    this.$.toolbar.updateStyles();
    this.ocultar = true;
    this.$.searching.value = null;
  },

  changeTheme: function() {
    this.ocultar = false;
    this.$.toolbar.style.backgroundColor = '#FAFAFA';
    this.$.toolbar.style.color = '#BDBDBD';
    this.$.toolbar.updateStyles();
  },

  getQuote: function() {
    this.$.getQuoteAjax.generateRequest();
  },

  tipoRol: function(item) {
    var ret;
    if (item == false) {
      ret = 'Digitalizador';
    } else {
      ret = 'Administrador';
    }
    return ret;
  },

  _selectedItemChanged: function(ob) { 

    var me = this;

      if(this.userAdmin){
        var fab = me.$$('#icon');
      }

     if(ob !== undefined){
      var items = ob.indexSplices[0].object;
      me.userItem = items;

      if (items.length > 0) {
        me.hide = false;
      } else {
        me.hide = true;
      }

      if (items.length === 1 ){
        fab.icon = "create"
        me.$.textIcon.textContent = "MODIFICAR USUARIO";
      }else{
        me.$.textIcon.textContent = "AGREGAR NUEVO USUARIO";
        fab.icon = "add"
      }
    }else{
      me.userItem = 0;
    }

  },


  sendForm: function(){
    var question = confirm('Seguro que desea guardar estos datos');

    if (question == true) {
      var me = this;
      var form = me.$.formUser;
      if (form.validate()) {
        var encodedForm = [];
        var serializeForm = form.serialize();

        for (var i in serializeForm) {
          var encodedKey = encodeURIComponent(i);
          var encodedValue = encodeURIComponent(serializeForm[i]);
          encodedForm.push(encodedKey + "=" + encodedValue);
        }

        encodedForm = encodedForm.join("&");

        if (this.userItem !== 0) {
          this.method = 'PUT';
          this.baseUrl = 'http://192.168.1.7:9021/users/'+this.userItem[0].id_usu;
        } else {
          this.method = 'POST';
          this.baseUrl = 'http://192.168.1.7:9021/users';
        }

        fetch(this.baseUrl, {
          method: this.method,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          body: encodedForm
        })
        .then(function(res) { return res.json(); })
        .then(me.userSuccess.bind(me))
        .catch(me.userError.bind(me));
        setTimeout(function(){ 
          window.location.reload()
        }, 5000);
      }
    } else {
      return false
    }             
  },

  userSuccess: function(json){
    this.message = json.messages;
    this.$.formUser.reset();
    this.$.toast0.open();   
    this.$.appDrawer.close(); 
  },

  userError: function(error){
    this.message = error;
    this.$.toast0.open();
  },

  toastToggle: function() {
    this.$.toast0.toggle();
    window.location.reload();   
  },

  deleteData: function() {
    var encodedForm = {};    
    var i;
    for (i = 0; i < this.userItem.length; i++) {
     this.userDelete.push(this.userItem[i].id_usu);
    }

    encodedForm = JSON.stringify({
      users: this.userDelete
    });
    var question = confirm('Seguro que quiere eliminar este Usuario?');

    if (question == true) {
      var me = this;

      me.method = 'DELETE';
      me.baseUrl = 'http://192.168.1.7:9021/users';
      fetch(me.baseUrl, {
        method: me.method,
        headers: { 'Content-Type': 'application/json' },
        body: encodedForm
      })
      .then(function(res) { return res.json();})
      .then(me.userSuccess.bind(me))
      .catch(me.userError.bind(me));  
      setTimeout(function(){ 
        window.location.reload()
      }, 5000);
    } else {
      return false;
    }
  },

  search: function() {
    var me = this;
    var busqueda =  me.searchItem;  
    me.method = 'GET';
    me.baseUrl = 'http://192.168.1.7:9021/search?busqueda='+ busqueda ;
    setTimeout(function() {
      fetch(me.baseUrl, {
        method: me.method,
      })
      .then(function(res) { return res.json() })
      .then(me.listCompare.bind(me))
      .catch(me.userError.bind(me));
    }, 400);
  },

  listCompare: function(json) {
     this.$$('#grid1').items = json.data;
  }

});



