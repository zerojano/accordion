CKEDITOR.plugins.add( 'accordion', {
    icons: 'accordion',
    init: function( editor ) {
        editor.addCommand( 'accordion', new CKEDITOR.dialogCommand( 'accordionDialog' ) );
        editor.ui.addButton( 'accordion', {
            label: 'Insertar Acordion',
            command: 'accordion',
            toolbar: 'insert'
        });

        CKEDITOR.dialog.add( 'accordionDialog', this.path + 'dialogs/accordion.js' );
    }
});