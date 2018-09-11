(function() {
    'use strict';
    app.config(Config).controller('termCtrl', Controller);

    function Config($stateProvider) {
        $stateProvider.state('header.term', {
            url: '/term',
            controller: 'termCtrl',
            controllerAs: 'vm',
            templateUrl: 'component/staticContent/term.html',
            data: {
                activeTab: 'term'
            }
        })
    }

    function Controller(editorService) {
        var vm = this;
        vm.terms = null;
        //set editor tool default value
        vm.readOnly = true;
        //enable disabel editor tool 
        vm.enableDisableEditorTool = enableDisableEditorTool;
        //Update terms and conditon function
        vm.updateData = updateData;
        //Call this function after controller loaded
        vm.inItEditor = inItEditor;
        inItEditor();

        function inItEditor() {
            // // GEt terms & conditon data 
            // employeeService.getTermsOrPolicy('terms').then((objS) => {
            //     if (objS.responseCode == 200) {
            //         vm.terms = objS.result.term;
            //         // Attach editor on html 
            //         editorService.showEditor();
            //         //Set editor tool default value is readonly
            //         CKEDITOR.config.readOnly = vm.readOnly;
            //     }
            // })
            vm.terms = "<p>terms</p>"
            // Attach editor on html 
            editorService.showEditor();
            //Set editor tool default value is readonly
            CKEDITOR.config.readOnly = vm.readOnly;
        }

        function enableDisableEditorTool() {
            // Destroy already running editor 
            CKEDITOR.instances.ckeditor.destroy(true);
            // change editor tool value
            vm.readOnly = !vm.readOnly;
            // draw new editor with updated data
            inItEditor();
        }

        function updateData() {
            // Get updated editor data
            vm.terms = CKEDITOR.instances.ckeditor.getData();
            // send updated terms data object
            var sendObj = {
                term: vm.terms
            }
            // employeeService.updateTermsAndPolicy(sendObj).then((objS) => {
            //     if (objS.responseCode == 200) {
            //         // Destroy already running editor 
            //         CKEDITOR.instances.ckeditor.destroy(true);
            //         // change editor tool value
            //         vm.readOnly = !vm.readOnly
            //         // draw new editor with updated data
            //         inItEditor()
            //     }
            // })
            CKEDITOR.instances.ckeditor.destroy(true);
            // change editor tool value
            vm.readOnly = !vm.readOnly
            // draw new editor with updated data
            inItEditor()
        }
    }
})()