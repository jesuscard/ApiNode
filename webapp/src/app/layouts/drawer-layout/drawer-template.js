/**
 *
 *
 * (c) copyright SIGIS Soluciones Integrales GIS ,C.A.
 */
Polymer({

      is: 'drawer-template',

      properties: {
        page: {
          type: String,
          reflectToAttribute: true,
          observer: '_pageChanged'
        },
        name: {
          value: 'Marco Villareal'
        },
        rol:
        {
          value: 'Digitalizador'
        },

        titulo:
        {
            type: String,
            value: 'APLICACION DE ENTRENAMIENTO'
        }    

      },

      behaviors: [
         AppBehavior
      ],
      observers: [
        '_routePageChanged(routeData.page)',

      ],

      _routePageChanged: function(page) {
        var me = this;
        me.page = page || 'view0';

        me.debounce('page',function() {
          var app_drawer_layout = me.$$("#app-drawer-layout");

          if(app_drawer_layout && app_drawer_layout.narrow){
            var app_drawer = me.$$("#app-drawer");
            app_drawer && app_drawer.toggle();
          }
        });
      },

      _pageChanged: function(page) {
        // load page import on demand.
        this.importHref(
        this.resolveUrl( '../../elements/'+page + '/'+page+'.html'), null, null, true);
      },

      userSelect: function(){
        this.$.drawer.close();
        this.show = true;
        this.titulo = 'Usuarios';
        this.$.toolbar.style.backgroundColor = '#AA00FF';
        this.$.toolbar.style.boxShadow = '0px 3px 2px #888888';
        this.$.toolbar.updateStyles();
      },

      mapsSelect: function(){
        this.$.drawer.close();
        this.show = false;
        this.titulo = 'Puntos de Referencia';
        this.$.toolbar.style.backgroundColor = '#43A047';
        this.$.toolbar.style.boxShadow = '0px 3px 2px #888888';
        this.$.toolbar.updateStyles();

      },

    toogle: function(e) {
      this.$$('maps-page')._toggleDrawer();
    }
  });
