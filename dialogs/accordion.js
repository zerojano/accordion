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
                        type: 'text',
                        id: 'accordion',
                        label: 'Abbreviation',
                        validate: CKEDITOR.dialog.validate.notEmpty( "El campo de abreviatura no puede estar vacío." )
                    },
                                {
                type: 'text',
                id: 'title',
                label: 'Explanation',
                validate: CKEDITOR.dialog.validate.notEmpty( "Explanation field cannot be empty." )
            },
                    {
                    type: "hbox",
                    widths: ["50%", "50%"],
                    children: [{
                            id: "cols",
                            type: "text",
                            label: "Sección",
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
                            //abel: "Contenido",
                            accessKey: "R",
                            //cols: "2",
                            rows: "2",
                            style: "width:500px",
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
                            label: "Sección",
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
                            //label: "Contenido",
                            accessKey: "R",
                            style: "width:500px",
                            //cols: "2",
                            rows: "2",
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
                            label: "Sección",
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
                            //label: "Contenido",
                            accessKey: "R",
                            style: "width:500px",
                            //cols: "2",
                            rows: "2",
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

            var accordion = editor.document.createElement( 'ul' );
            //accordion.setAttribute( 'title', dialog.getValueOf( 'tab-basic', 'title' ) );
            accordion.setAttribute( 'id', 'acordion_'+Math.round(Math.random()*1000000) );
            accordion.setText( dialog.getValueOf( 'tab-basic', 'accordion' ) );

            /*var id = dialog.getValueOf( 'tab-adv', 'id' );
            if ( id )
                accordion.setAttribute( 'id', id );*/

            editor.insertElement( accordion );
        }
    };
})