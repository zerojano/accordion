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
                    type: "hbox",
                    widths: ["50%", "50%"],
                    children: [{
                            type: 'select',
                            id: 'number-of-tabs',
                            //style: "width:100%",
                            label: 'Cantidad Secciones:',
                            items: [ ['2'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8'], ['9'] ],
                            'default': '2',
                            //validate: CKEDITOR.dialog.validate.notEmpty( editor.lang.bootstrapTabs.invalidNumberOfTabs ),
                            validate: CKEDITOR.dialog.validate.notEmpty( "No has seleccionado la cantidad de secciones." )
                            //validate: CKEDITOR.dialog.validate.notEmpty( editor.lang.accordion.msgValidateHeaderColor )
                        }, {
                            type: 'select',
                            id: 'tipo-of-tabs',
                            label: 'Tipo Acordeon:',
                            items: [ ['tab'], ['tab2'] ],
                            'default': 'tab',
                            validate: CKEDITOR.dialog.validate.notEmpty( "No has seleccionado un tipo de acordeon." )
                        }]
                    },{
                    type: "hbox",
                    widths: ["50%", "50%"],
                    children: [{
                            type: 'text',
                            id: 'header-color',
                            label: 'Background-color Sección:',
                            'default': '#CCCCCC'
                        }, {
                            type: 'text',
                            id: 'header-color-text',
                            label: 'Color-text header:',
                            validate: CKEDITOR.dialog.validate.notEmpty( "No has seleccionado un tipo de acordeon." )
                        }]
                    },{
                    type: "hbox",
                    widths: ["50%", "50%"],
                    children: [{
                            type: 'text',
                            id: 'content-color',
                            label: 'Background-color contenido:'
                        }, {
                            type: 'text',
                            id: 'content-color-text',
                            label: 'Color-text contenido:'
                        }]
                    }
                ]
            }
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
