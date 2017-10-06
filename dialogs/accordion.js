CKEDITOR.dialog.add( 'accordionDialog', function( editor ) {
    return {
        title: 'Propiedades de Acordion',
        minWidth: 600,
        minHeight: 200,
        contents: [
            {
                id: 'tab-basic',
                label: 'Configuración Básica',
                elements: [
                    {
                        type: 'select',
                        id: 'number-of-tabs',
                        style: "width:50%",
                        label: 'Cantidad Secciones',
                        items: [ ['2'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8'], ['9'] ],
                        //validate: CKEDITOR.dialog.validate.notEmpty( editor.lang.bootstrapTabs.invalidNumberOfTabs ),
                        validate: CKEDITOR.dialog.validate.notEmpty( "No has seleccionado la cantidad de secciones." )
                        /*setup: function( element ) {
                          var tabsElement = element,
                              oldNumberOfTabs = tabsElement.find( '.nav.nav-tabs li a.tab-link' ).count();
                          this.setValue( oldNumberOfTabs );
                        }*/
                    },
                    {
                        type: 'select',
                        id: 'tipo-of-tabs',
                        style: "width:50%",
                        label: 'Tipo Acordeon',
                        items: [ ['Unico'], ['Multiple'] ],
                        validate: CKEDITOR.dialog.validate.notEmpty( "No has seleccionado un tipo de acordeon." )
                    },
                    {
                        type: 'text',
                        id: 'header-color',
                        label: 'Color header Sección'
                    }
                    /*,
                    {
                    type: "hbox",
                    widths: ["25%", "75%"],
                    children: [{
                            id: "seccion_title_1",
                            type: "text",
                            label: "Sección",
                            accessKey: "C",
                            //style: "width:100px",
                            setText: "Sección 1",
                            validate: CKEDITOR.dialog.validate.notEmpty( "El campo de abreviatura no puede estar vacío." ),
                            //setup: function(a) {
                            //    a = a.hasAttribute("cols") && a.getAttribute("cols");
                            //    this.setValue(a || "")
                            //},
                            //commit: function(a) {
                            //    this.getValue() ? a.setAttribute("cols", this.getValue()) : a.removeAttribute("cols")
                            //}
                        }, {
                            id: "seccion_coment_1",
                            type: "textarea",
                            //abel: "Contenido",
                            accessKey: "R",
                            //cols: "2",
                            rows: "2",
                            //style: "width:500px",
                            validate: CKEDITOR.dialog.validate.notEmpty( "El campo de abreviatura no puede estar vacío." ),
                            //setup: function(a) {
                            //    a = a.hasAttribute("rows") && a.getAttribute("rows");
                            //    this.setValue(a || "")
                            //},
                            //commit: function(a) {
                            //    this.getValue() ? a.setAttribute("rows",
                            //        this.getValue()) : a.removeAttribute("rows")
                            //}
                        }]
                    }*/
                ]
            }/*,
            {
                id: 'tab-adv',
                label: 'Configuración Acordion',
                elements: [
                    {
                        type: 'text',
                        id: 'id',
                        label: 'Color'
                    }
                ]
            }*/
        ],
        onOk: function() {
            var dialog = this;
            var selection = editor.getSelection();
            var element = selection.getStartElement();

            var type = dialog.getValueOf( 'tab-basic', 'tipo-of-tabs' );
            var numberOfTabs = dialog.getValueOf( 'tab-basic', 'number-of-tabs' );
            var headerColor = dialog.getValueOf( 'tab-basic', 'header-color' );        
            
            var tabsHtml = '<div class="half" style="float: left;width: 95%;padding: 0 1em;"><ul class="mj_acortion" id="accordion"></ul></div>';
            var tabsElement = CKEDITOR.dom.element.createFromHtml( tabsHtml );

            for ( var i = 1; i <= numberOfTabs; i++ ) {
              appendTabToElement(editor, dialog, tabsElement, numberOfTabs, i, type, headerColor);
            };

            /*var id = dialog.getValueOf( 'tab-adv', 'id' );
            if ( id )
                accordion.setAttribute( 'id', id );*/

            editor.insertElement( tabsElement );
        }
    };
});

function appendTabToElement(editor, dialog, tabsElement, numberOfTabs, i, type, headerColor) {

  var tabSetTitle = 'Comentario sección';
  var tabName       = 'acordeon ' + i;
  var tabIdentifier = generateTabIdentifer(tabSetTitle, tabName);

  var tabPanelContentHtml = '<div class="tab-pane-content">' + tabName + ' Content</div>';

  var tabHtml = '<div class="'+type+'" style="position:relative;margin-bottom:1px;width:100%;color:#666666;overflow:hidden;"><input id="tab-one" type="checkbox" name="tabs"><label style="background-color:'+headerColor+'"for="tab-one">Seccion '+i+'</label><div class="tab-content" style=""><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, architecto, explicabo perferendis nostrum, maxime impedit atque odit sunt pariatur illo obcaecati soluta molestias iure facere dolorum adipisci eum? Saepe, itaque.</p></div></div>';

  var tabElement = new CKEDITOR.dom.element.createFromHtml( tabHtml );

  if (i == numberOfTabs) {
    //tabElement.addClass( 'active' );
    //tabPanelElement.addClass( 'active' );
  }

  var navTabsElement    = tabsElement.findOne( 'ul.mj_acortion' );

  navTabsElement.append( tabElement );
}


function generateTabIdentifer(tabSetTitle, tabName) {
    return (tabSetTitle + ' ' + tabName).replace(/(\W+|\s+|_|-+)/g, '-').replace(/-+/g, '-').toLowerCase();
}
