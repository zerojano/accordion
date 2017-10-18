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
                            id: 'typeAccordion',
                            label: 'Tipo Acordeon:',
                            items: [ ['tabs'], ['tabs2'] ],
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
                            'default': '#FFFFFF',
                            validate: CKEDITOR.dialog.validate.notEmpty( "No has seleccionado un tipo de acordeon." )
                        }]
                    },{
                    type: "hbox",
                    widths: ["50%", "50%"],
                    children: [{
                            type: 'text',
                            id: 'content-color',
                            label: 'Background-color contenido:',
                            'default': '#FFFFFF',
                        }, {
                            type: 'text',
                            id: 'content-color-text',
                            label: 'Color-text contenido:',
                            'default': '#FFFFFF',
                        }]
                    }
                ]
            }
        ],
        onOk: function() {
            var dialog = this;
            var selection = editor.getSelection();
            var element = selection.getStartElement();

            var typeAccordion = dialog.getValueOf( 'tab-basic', 'typeAccordion' );
            var numberOfTabs = dialog.getValueOf( 'tab-basic', 'number-of-tabs' );
            var headerColor = dialog.getValueOf( 'tab-basic', 'header-color' );
            var headerColorText = dialog.getValueOf( 'tab-basic', 'header-color-text' );
            var headerColorCont = dialog.getValueOf( 'tab-basic', 'content-color' );
            var headerColorTextCont = dialog.getValueOf( 'tab-basic', 'content-color-text' );    
            
            //var cssHtml = '<style>.tab-content {max-height:0;overflow: hidden;-webkit-transition:max-height .35s;-o-transition:max-height .35s;transition:max-height .35s;}input:checked ~ .tab-content {max-height:10em;}label::after {position: absolute;right: 0;top: 0;display: block;width: 3em;height: 3em;line-height: 3;text-align: center;-webkit-transition: all .35s;-o-transition: all .35s;transition: all .35s;}input[type=checkbox] + label::after {content: "+";}input[type=radio] + label::after { content: "\25BC";}input[type=checkbox]:checked + label::after {transform:rotate(315deg);}input[type=radio]:checked + label::after { transform:rotateX(180deg);}</style>';
            var tabsHtml = '<div class="half" style="float: left;width: 95%;padding: 0 1em;"><ul class="mj_acortion" id="accordion"></ul></div>';
            var tabsElement = CKEDITOR.dom.element.createFromHtml( tabsHtml );
            //var cssElement = CKEDITOR.dom.element.createFromHtml( cssHtml );
            
            var numRandom;
            //Ramdon
            numRandom = Math.floor((Math.random() * 1000) + 1);
            
            for ( var i = 1; i <= numberOfTabs; i++ ) {
              appendTabToElement(editor, dialog, tabsElement, numberOfTabs, i, typeAccordion, headerColor, headerColorText, headerColorCont, headerColorTextCont, numRandom);
            };

            editor.insertElement( tabsElement );
        }
    };
});

function appendTabToElement(editor, dialog, tabsElement, numberOfTabs, i, typeAccordion, headerColor, headerColorText, headerColorCont, headerColorTextCont, numRandom) {

    var tabSetTitle = 'Comentario sección';
    var tabName       = 'acordeon ' + i;
    var tabIdentifier = generateTabIdentifer(tabSetTitle, tabName);
    var tabPanelContentHtml = '<div class="tab-pane-content">' + tabName + ' Content</div>';

    if( typeAccordion == 'tabs' ) {
        var type='checkbox';
    }else{
        var type='radio';
    }

    var tabHtml = '<div class="'+typeAccordion+'" style="position:relative;margin-bottom:1px;width:100%;color:#666666;overflow:hidden;"><input id="tab-'+numRandom+'-'+i+'" type="'+type+'" name="tabs" style="position: absolute !important;opacity: 0 !important; z-index: -1 !important;"><label style="  position: relative;display: block;padding: 0 0 0 1em;font-weight: bold;line-height: 3;cursor: pointer;background-color:'+headerColor+'; color:'+headerColorText+';"for="tab-'+numRandom+'-'+i+'">Seccion_ '+i+'</label><div class="tab-content" style="background-color:'+headerColorCont+';color:'+headerColorTextCont+';"><p style="margin: 1em;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, architecto, explicabo perferendis nostrum, maxime impedit atque odit sunt pariatur illo obcaecati soluta molestias iure facere dolorum adipisci eum? Saepe, itaque.</p></div></div>';

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
