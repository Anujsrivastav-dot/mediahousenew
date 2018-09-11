  var enable_tools = [{
      name: 'document',
      groups: ['mode', 'document', 'doctools']
    }, {
      name: 'clipboard',
      groups: ['clipboard', 'undo']
    }, {
      name: 'editing',
      groups: ['find', 'selection', 'spellchecker']
    }, {
      name: 'forms'
    },
    '/', {
      name: 'basicstyles',
      groups: ['basicstyles', 'cleanup']
    }, {
      name: 'paragraph',
      groups: ['list', 'indent', 'blocks', 'align', 'bidi']
    }, {
      name: 'links'
    }, {
      name: 'insert'
    },
    '/', {
      name: 'styles'
    }, {
      name: 'colors'
    }, {
      name: 'tools'
    }, {
      name: 'others'
    }, {
      name: 'about'
    }
  ];


  (function() {
    'use strict';
    app.service('editorService', editor);

    function editor() {
      this.showEditor = function() {
        CKEDITOR.replace('ckeditor', {
          width: '100%',
          height: 350,
          // Define the toolbar groups as it is a more accessible solution.
          toolbarGroups: enable_tools,
          // Remove the redundant buttons from toolbar groups defined above.
          removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar'
        });
      }

    }
  })();