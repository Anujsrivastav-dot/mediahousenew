(function() {
    'use strict';
    app.config(Config).controller('privacyCtrl', Controller);

    function Config($stateProvider) {
        $stateProvider.state('header.privacy', {
            url: '/privacy',
            controller: 'privacyCtrl',
            controllerAs: 'vm',
            templateUrl: 'component/staticContent/privacy.html',
            data: {
                activeTab: 'privacy'
            }
        })
    }

    function Controller(editorService) {
        var vm = this;
        vm.policy = null;
        //set editor tool default value
        vm.readOnly = true;
        //enable disabel editor tool 
        vm.enableDisableEditorTool = enableDisableEditorTool;
        //Update privacy policy function
        vm.updateData = updateData;
        //Call this function after controller loaded
        vm.inItEditor = inItEditor;
        inItEditor();

        function inItEditor() {
            // GEt privacy policy data 
            // employeeService.getTermsOrPolicy('policy').then((objS) => {
            //     if (objS.responseCode == 200) {
            //         vm.policy = objS.result.privacyPolicy;
            //         // Attach editor on html 
            //         editorService.showEditor();
            //         //Set editor tool default value is readonly
            //         CKEDITOR.config.readOnly = vm.readOnly;
            //     }
            // })
            vm.policy = "<p>privacy</p>";
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
            vm.policy = CKEDITOR.instances.ckeditor.getData();
            // send updated privacy policy data object
            var sendObj = {
                privacyPolicy: vm.policy
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