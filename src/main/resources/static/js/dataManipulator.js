DataManipulator = function(){};

DataManipulator.prototype.saveJobsForStack = function(stack, successCallback, errorCallback) {
    $.ajax({
        url: '/rest/stacks/' + stack.name + '/attachjobs',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(stack.selectedJobNames),
        success: successCallback,
        error: errorCallback
    });
};

DataManipulator.prototype.deleteStack = function(stack, successCallback, errorCallback) {
    $.ajax({
        url: '/rest/stacks/' + stack.name + '/delete',
        type: 'delete',
        success: function() {
            successCallback();
        },
        error: errorCallback
    });
};

DataManipulator.prototype.addStack = function(successCallback, errorCallback) {
    var name = prompt("StackModel name", "");
    if (name !== null && name !== '') {
        var dataObject = {'name': name};
        $.ajax({
            url: '/rest/stacks/add',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(dataObject),
            success: function() {
                successCallback(name);
            },
            error: errorCallback
        });
    }
};

DataManipulator.prototype.addTemplate = function(successCallback, errorCallback) {
    var stackName = $('#stacklist').val();
    var templateSelector = '#template';
    var templateFile = $(templateSelector).get(0).files[0];
    if (stackName !== null && templateFile !== null && $(templateSelector).val() !== '') {
        var formData = new FormData();
        formData.append('template', templateFile);
        $.ajax({
            url: '/rest/stacks/' + stackName + '/template/add',
            type: 'post',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function() {
                successCallback();
            },
            error: function() {
                errorCallback();
            }
        });
    }
};

DataManipulator.prototype.createReleaseDocument = function(successCallback, errorCallback) {
    var stackName = $('#stacklist').val();
    var sprintNr = $('#sprintNr').val();
    var changeNr = prompt("Change number", "");
    if (sprintNr !== '' && changeNr !== '') {
        $.ajax({
            url: '/rest/stacks/' + stackName + '/doc/create/sprint/' + sprintNr + '/change/' + changeNr,
            type: 'put',
            success: function() {
                successCallback();
            },
            error: function() {
                errorCallback();
            }
        });
    }
};

DataManipulator.prototype.triggerReleaseBuilds = function(selectedJobNames, successCallback, errorCallback) {
    $.ajax({
        url: '/rest/packages/triggerjobs',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(selectedJobNames),
        success: function() {
            successCallback();
        },
        error: function() {
            errorCallback();
        }
    });
};