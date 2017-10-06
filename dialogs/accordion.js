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
                        style: "width:100%",
                        label: 'Cantidad Secciones',
                        items: [ ['2'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8'], ['9'] ],
                        // Validation for empty values.
                        //validate: CKEDITOR.dialog.validate.notEmpty( editor.lang.bootstrapTabs.invalidNumberOfTabs ),
                        setup: function( element ) {
                          var tabsElement = element,
                              oldNumberOfTabs = tabsElement.find( '.nav.nav-tabs li a.tab-link' ).count();
                          this.setValue( oldNumberOfTabs );
                        }
                    },
                    {
                    type: "hbox",
                    widths: ["25%", "75%"],
                    children: [{
                            id: "seccion_title_1",
                            type: "text",
                            label: "Sección",
                            accessKey: "C",
                            /*style: "width:100px",*/
                            setText: "Sección 1",
                            validate: CKEDITOR.dialog.validate.notEmpty( "El campo de abreviatura no puede estar vacío." ),
                            /*setup: function(a) {
                                a = a.hasAttribute("cols") && a.getAttribute("cols");
                                this.setValue(a || "")
                            },
                            commit: function(a) {
                                this.getValue() ? a.setAttribute("cols", this.getValue()) : a.removeAttribute("cols")
                            }*/
                        }, {
                            id: "seccion_coment_1",
                            type: "textarea",
                            //abel: "Contenido",
                            accessKey: "R",
                            //cols: "2",
                            rows: "2",
                            /*style: "width:500px",*/
                            validate: CKEDITOR.dialog.validate.notEmpty( "El campo de abreviatura no puede estar vacío." ),
                            /*setup: function(a) {
                                a = a.hasAttribute("rows") && a.getAttribute("rows");
                                this.setValue(a || "")
                            },
                            commit: function(a) {
                                this.getValue() ? a.setAttribute("rows",
                                    this.getValue()) : a.removeAttribute("rows")
                            }*/
                        }]
                    }
                ]
            },
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
            }
        ],
        onOk: function() {
            var dialog = this;
            var type = 'tab2';
            var selection = editor.getSelection();
            var element = selection.getStartElement();

            var numberOfTabs = dialog.getValueOf( 'tab-basic', 'number-of-tabs' );
            
            //var listaAcordeon = editor.document.createElement( 'ul' );
            
            //accordion.setAttribute( 'title', dialog.getValueOf( 'tab-basic', 'title' ) );
            //listaAcordeon.setAttribute( 'id', 'acordion_'+Math.round(Math.random()*1000000) );
            //listaAcordeon.setAttribute( 'id', 'acordeon' );
            
            //listaAcordeon.setText( dialog.getValueOf( 'tab-basic', 'seccion_coment_1' ) );

            //var tabsHtml = '<div class="lista-acordeon"><ul class="mj_acortion" id="accordion"></ul></div>';
            var tabsHtml = '<div class="half" style="float: left;width: 95%;padding: 0 1em;"><ul class="mj_acortion" id="accordion"></ul></div>';
            var tabsElement = CKEDITOR.dom.element.createFromHtml( tabsHtml );

            for ( var i = 1; i <= numberOfTabs; i++ ) {
              appendTabToElement(editor, dialog, tabsElement, numberOfTabs, i, type);
            };

            /*var id = dialog.getValueOf( 'tab-adv', 'id' );
            if ( id )
                accordion.setAttribute( 'id', id );*/

            editor.insertElement( tabsElement );
        }
    };
});

function appendTabToElement(editor, dialog, tabsElement, numberOfTabs, i, type) {

  // Get the new tab-set-title from the dialog input.
  var tabSetTitle   = dialog.getValueOf( 'tab-basic', 'seccion_coment_1' );
  // Text for the tab name and dynamically assigned attributes for the tab and tab-panels
  var tabName       = 'acordeon ' + i;
  var tabIdentifier = generateTabIdentifer(tabSetTitle, tabName);

  // This div template contains the content that a user will edit.
  // Without this extra div inide the tab-pane, editing the tab contents produces unexpected results.
  var tabPanelContentHtml = '<div class="tab-pane-content">' + tabName + ' Content</div>';

  // Template html for a tab and tabPanel (http://getbootstrap.com/javascript/#tabs-examples).
  //var tabHtml             = '<li><a href="#' + tabIdentifier + '" aria-controls="' + tabIdentifier + '" >' + tabName + ' Name</a></li>';
  //var tabPanelHtml        = '<div role="tabpanel" class="tab-pane" id="' + tabIdentifier + '">' + tabPanelContentHtml + '</div>';
  //<div class="mj_accordion_item active">Sección #'+ i +'</div><div class="mj_accordion_content">Contenido '+ i +'</div>';

  var tabHtml = '<div class="'+type+'" style="position:relative;margin-bottom:1px;width:100%;color:#666666;overflow:hidden;"><input id="tab-one" type="checkbox" name="tabs"><label for="tab-one">Seccion '+i+'</label><div class="tab-content" style=""><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, architecto, explicabo perferendis nostrum, maxime impedit atque odit sunt pariatur illo obcaecati soluta molestias iure facere dolorum adipisci eum? Saepe, itaque.</p></div></div>';


  var tabElement      = new CKEDITOR.dom.element.createFromHtml( tabHtml );
      //tabPanelElement = new CKEDITOR.dom.element.createFromHtml( tabPanelHtml );

  // add the active class to the last tab of the element
  if (i == numberOfTabs) {
    tabElement.addClass( 'active' );
    //tabPanelElement.addClass( 'active' );
  }

  // From the tabsElement, find the appropriate place to insert a new tab and its tab content.
  var navTabsElement    = tabsElement.findOne( 'ul.mj_acortion' );
      //tabContentElement = tabsElement.findOne( 'div.tab-content' );

  // Append number-of-tabs nav-tabs (the clickable tabs in Bootstrap tabs)
  navTabsElement.append( tabElement );
  // Append number-of-tabs tab-panels (the area where content is displayed in Bootstrap tabs)
  //tabContentElement.append( tabPanelElement );
}


function generateTabIdentifer(tabSetTitle, tabName) {
    // prepend the tab tabSetTitle for tab id uniqueness and replace non-alpha-numeric and whitespace with a dash
    // 'TeSt Title StRing !! .* !@# $$ %^&  () __-- += with non-alpha-num'.replace(/(\W+|\s+|_|-+)/g, '-').replace(/-+/g, '-')
    return (tabSetTitle + ' ' + tabName).replace(/(\W+|\s+|_|-+)/g, '-').replace(/-+/g, '-').toLowerCase();
}
