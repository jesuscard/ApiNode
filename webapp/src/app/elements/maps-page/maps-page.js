  Polymer({
    is: 'maps-page',
    properties: {
    state: {
      type: Array
    }

    },
    behaviors: [
      AppBehavior
    ],
      observers: [
    '_selectedChangedMunicipalities(selectedState)',
    '_selectedChangedParishes(selectedMunicipalities)'
    ],

    statesSort: function(a, b) {      
      var statesA = a.nom_edo.toUpperCase();
      var statesB = b.nom_edo.toUpperCase();

      if (statesA < statesB) {
        return -1;
      }
      if (statesA > statesB) {
        return 1;
      }
      return 0;
    },

    municipalitiesSort: function(a, b) {
      var municipalitiesA = a.nom_mun.toUpperCase();
      var municipalitiesB = b.nom_mun.toUpperCase();
      if (municipalitiesA < municipalitiesB) {
        return -1;
      }
      if (municipalitiesA > municipalitiesB) {
        return 1;
      }
      return 0;
    },

    parishesSort: function(a, b) {
      var parishesA = a.nom_par.toUpperCase();
      var parishesB = b.nom_par.toUpperCase();
      if (parishesA < parishesB) {
        return -1;
      }
      if (parishesA > parishesB) {
        return 1;
      }
      return 0;
    },

    toastToggle: function() {
      this.$.toast0.toggle();
     // window.location.reload(); 
    },
  
    _toggleDrawer: function(e) {
      this.drawerOpened = !this.drawerOpened;
    },

    municipalitieError: function(error, res){
      this.message = error;
      this.$.toast0.open();
      this.$$('#listMunucialities').selected = "0";
      this.$$('#listParishes').selected = "0";
      setTimeout(function(){ 
        this.message = "";
      }, 4000);

    },

    parishesError: function(error){
      if(this.$$('#listMunucialities').selected !== undefined){
        this.message = error;
        this.$.toast0.open();
        this.$$('#listParishes').selected = "0";
      }
      setTimeout(function(){ 
        this.message = "";
      }, 4000);

    },

    _selectedChangedMunicipalities: function(ob) { 
    this.stateItem = ob;
    this.searchMunicipalities(this.stateItem)

    },   

    searchMunicipalities: function(state) {
    var me = this;
    //var busqueda =  state;  
    me.method = 'GET';
    me.baseUrl = 'http://192.168.1.7:9021/municipios/'+ state;

    fetch(me.baseUrl, {
    method: me.method,
    }).then(function(res){return res.json();})
      .then(function(res){
        if(res.data.length > 0){
          me.listCompareMunicipalities(res.data);
        }else{
          me.municipalitieError(res.messages);   
          me.listCompareMunicipalities(res.data);      
        }
      })
    },

    listCompareMunicipalities: function(json) {
      var arrayMunicipalities = json;
      this.$$('#munucipiosTemplate').items = json;
    },

    _selectedChangedParishes: function(ob) { 
      this.municipalitiesItem = ob;
      this.searchParishes(this.municipalitiesItem)

    },   

    searchParishes: function(Municipalities) {
      var me = this;
      //var busqueda =  Municipalities;  
      me.method = 'GET';
      me.baseUrl = 'http://192.168.1.7:9021/parroquias/'+ Municipalities;
      fetch(me.baseUrl, {
        method: me.method,
      }).then(function(res){return res.json();})
      .then(function(res){
        if(res.data.length > 0){
          me.listCompareParishes(res.data);
        }else{
          me.listCompareParishes(res.data);      
          me.parishesError(res.messages); 
        }
      })
    },

    listCompareParishes: function(json) {
       console.log(json);
       this.$$('#parroquiasTemplate').items = json;
    }


  });