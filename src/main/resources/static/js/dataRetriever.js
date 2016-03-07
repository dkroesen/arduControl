DataRetriever = function(){};

DataRetriever.prototype.retrieveStacks = function(succesCallback, errorCallback) {
    $.ajax({
        url: '/rest/stacks/list',
        success: function(data) {
            succesCallback(data, true);
        },
        error: function() {
            errorCallback();
        }
    });
};

DataRetriever.prototype.retrieveJobNames = function(successCallback, errorCallback) {
    $.ajax({
        url: '/rest/packages/jobnames',
        success: function(data) {
            successCallback(data);
        },
        error: function() {
            errorCallback();
        }
    });
};

DataRetriever.prototype.checkForRequiredReleases = function(jobNames, successCallback, errorCallback) {
    $.ajax({
        url: '/rest/packages/newreleaserequired',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(jobNames),
        success: function(data) {
            successCallback(data);
        },
        error: function() {
            errorCallback();
        }
    });
};

DataRetriever.prototype.downloadTemplate = function(errorCallback) {
    var stackName = $('#stacklist').val();
    $.fileDownload('/rest/stacks/' + stackName + '/template').fail(function() {
        errorCallback(stackName);
    });
};

DataRetriever.prototype.downloadReleaseDocument = function(errorCallback) {
    var stackName = $('#stacklist').val();
    var sprintNr = $('#sprintNr').val();
    if (stackName !== '' && sprintNr !== '') {
        if (sprintNr !== '') {
            $.fileDownload('/rest/stacks/' + stackName + '/doc/sprint/' + sprintNr).fail(function() {
                errorCallback(stackName, sprintNr);
            });
        }
    }
};