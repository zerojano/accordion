CKEDITOR.dialog.add( 'accordionDialog', function( editor ) {
    return {
        title: 'Propiedades de Acordion',
        minWidth: 500,
        minHeight: 200,
        contents: [
            {
                id: 'tab-basic',
                label: 'Configuración Básica',
                elements: [
                    {
                        type: 'text',
                        id: 'accordion',
                        label: 'Abbreviation',
                        validate: CKEDITOR.dialog.validate.notEmpty( "El campo de abreviatura no puede estar vacío." )
                    },


                    {
                    type: "hbox",
                    widths: ["50%", "50%"],
                    children: [{
                            id: "cols",
                            type: "text",
                            label: "Titulo Sección",
                            accessKey: "C",
                            style: "width:100px",
                            validate: CKEDITOR.dialog.validate.notEmpty( "El campo de abreviatura no puede estar vacío." ),
                            setup: function(a) {
                                a = a.hasAttribute("cols") && a.getAttribute("cols");
                                this.setValue(a || "")
                            },
                            commit: function(a) {
                                this.getValue() ? a.setAttribute("cols", this.getValue()) : a.removeAttribute("cols")
                            }
                        }, {
                            id: "rows",
                            type: "textarea",
                            label: "Contenido",
                            accessKey: "R",
                            style: "width:400px",
                            validate: CKEDITOR.dialog.validate.notEmpty( "El campo de abreviatura no puede estar vacío." ),
                            setup: function(a) {
                                a = a.hasAttribute("rows") && a.getAttribute("rows");
                                this.setValue(a || "")
                            },
                            commit: function(a) {
                                this.getValue() ? a.setAttribute("rows",
                                    this.getValue()) : a.removeAttribute("rows")
                            }
                        }]
                    },


                    {
                    type: "hbox",
                    widths: ["50%", "50%"],
                    children: [{
                            id: "cols",
                            type: "text",
                            label: "Titulo Sección",
                            accessKey: "C",
                            style: "width:100px",
                            validate: CKEDITOR.dialog.validate.notEmpty( "El campo de abreviatura no puede estar vacío." ),
                            setup: function(a) {
                                a = a.hasAttribute("cols") && a.getAttribute("cols");
                                this.setValue(a || "")
                            },
                            commit: function(a) {
                                this.getValue() ? a.setAttribute("cols", this.getValue()) : a.removeAttribute("cols")
                            }
                        }, {
                            id: "rows",
                            type: "textarea",
                            label: "Contenido",
                            accessKey: "R",
                            style: "width:400px",
                            validate: CKEDITOR.dialog.validate.notEmpty( "El campo de abreviatura no puede estar vacío." ),
                            setup: function(a) {
                                a = a.hasAttribute("rows") && a.getAttribute("rows");
                                this.setValue(a || "")
                            },
                            commit: function(a) {
                                this.getValue() ? a.setAttribute("rows",
                                    this.getValue()) : a.removeAttribute("rows")
                            }
                        }]
                    }



                    
                ]
            },
            {
                id: 'tab-adv',
                label: 'Configuración Básica',
                elements: [
                    {
                        type: 'text',
                        id: 'id',
                        label: 'Id'
                    }
                ]
            }
        ],
        onOk: function() {
            var dialog = this;

            var accordion = editor.document.createElement( 'textarea' );
            accordion.setAttribute( 'title', dialog.getValueOf( 'tab-basic', 'title' ) );
            accordion.setText( dialog.getValueOf( 'tab-basic', 'test' ) );

            var id = dialog.getValueOf( 'tab-adv', 'id' );
            if ( id )
                accordion.setAttribute( 'id', id );

            //Creando un nuevo elemento
            var contenido = editor.document.createElement( 'accordion1' );
            //contenido.setAttribute( 'title', dialog.getValueOf( 'tab-basic', 'title' ) );
            //contenido.setText( dialog.getValueOf( 'tab-basic', 'contenido' ) );

            editor.insertElement( accordion, contenido );
        }
    };
})