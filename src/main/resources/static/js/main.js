var viewModel;
var viewManipulator;
var dataManipulator;
var dataRetriever;
var multiSelect;

var ViewModel = function() {
    this.allJobNames = [];
    this.stacks = [];
    this.selectedStack = null;
};

var StackModel = function(name, jobNames) {
    this.name = name;
    this.jobNames = jobNames;
    this.selectedJobNames = [];
};

$(document).ready(function() {
    viewModel = new ViewModel();
    viewManipulator = new ViewManipulator();
    dataManipulator = new DataManipulator();
    dataRetriever = new DataRetriever();
    multiSelect = new MultiSelect();
    bindEvents();
    viewManipulator.initTabLayout();
    retrieveStacks();
});

function deleteSelectedStack() {
    for (var i = 0; i < viewModel.stacks.length; i++) {
        if (viewModel.stacks[i].name === viewModel.selectedStack.name) {
            viewModel.stacks.splice(i);
        }
    }
}

function bindEvents() {
    $('#stacklist').on('change', function() {
        viewModel.selectedStack = stackByName($('#stacklist').val());
        refreshTabs();
    });
    $('#template').on('change', viewManipulator.changeUploadTemplateFileName);
    $('#saveJobsForStack').on('click', function() {
        dataManipulator.saveJobsForStack(
            viewModel.selectedStack,
            function() {
                viewModel.selectedStack.jobNames = viewModel.selectedStack.selectedJobNames;
                viewManipulator.showSuccess('jobs attached');
            }, function() {
                viewManipulator.showSuccess('unable to attach jobs');
            }
        );
    });
    $('#addStack').on('click', function() {
        dataManipulator.addStack(function(stackName){
            viewModel.stacks.push(new StackModel(stackName, []));
            retrieveStacks();
            viewManipulator.showSuccess('stack added');
        }, function() {
            viewManipulator.showError('unable to add stack');
        });
    });
    $('#deleteStack').on('click', function() {
        dataManipulator.deleteStack(
            viewModel.selectedStack,
            function() {
                deleteSelectedStack();
                retrieveStacks();
                viewManipulator.showSuccess('stack deleted');
            }, function() {
                viewManipulator.showError('unable to delete stack');
            }
        );
    });
    $('#addTemplate').on('click', function() {
        dataManipulator.addTemplate(function() {
            viewManipulator.showSuccess('template attached to stack');
        }, function() {
            viewManipulator.showError('unable to add template');
        });
        viewManipulator.resetFileUploadField();
    });
    $('#downloadTemplate').on('click', function() {
        dataRetriever.downloadTemplate(function(stackName) {
            viewManipulator.showError('no template available for stack: ' + stackName);
        })
    });
    $('#createReleaseDocument').on('click', function() {
        dataManipulator.createReleaseDocument(function() {
            viewManipulator.showSuccess('release document created');
        }, function() {
            viewManipulator.showError('unable to create document');
        });
    });
    $('#downloadReleaseDocument').on('click', function() {
        dataRetriever.downloadReleaseDocument(function(stackName, sprintNr) {
            viewManipulator.showError('no release document available for stack: ' + stackName + ' and sprint ' + sprintNr);
        });
    });
    $('#checkForRequiredReleases').on('click', function() {
        dataRetriever.checkForRequiredReleases(
            viewManipulator.retrieveJobNames(),
            function(data) {
                viewManipulator.updateJobListStatus($('#attachedJobs'), data);
            }, function() {
                viewManipulator.showError('unable to check for required releases');
            }
        );
    });
    $('#triggerReleaseBuilds').on('click', function() {
        dataManipulator.triggerReleaseBuilds(viewManipulator.retrieveCheckedJobNames(), function() {
            viewManipulator.showSuccess('release builds triggered and completed');
        }, function() {
            viewManipulator.showError('unable to trigger and / or wait for release builds');
        })
    });
}

function stackByName(stackName) {
    for (var i = 0; i < viewModel.stacks.length; i++) {
        if (stackName.toLowerCase() === viewModel.stacks[i].name.toLowerCase()) {
            return viewModel.stacks[i];
        }
    }
    return null;
}

function setStacks(stackData, fetchedFromServer) {
    if (fetchedFromServer) {
        viewModel.stacks = newStacksByStackData(stackData);
    }
    viewManipulator.populateStackSelect(viewModel.stacks);
    viewModel.selectedStack = stackByName($('#stacklist').val());
    refreshTabs();
}

function newStacksByStackData(stackData) {
    var stacks = [];
    for (var i = 0; i < stackData.length; i++) {
        stacks.push(new StackModel(stackData[i].name, stackData[i].jobNames));
    }
    return stacks;
}

function retrieveStacks() {
    if (viewModel.stacks.length === 0) {
        dataRetriever.retrieveStacks(
            setStacks,
            function() {
                viewManipulator.showError('unable to retrieve stacks');
            }
        );
    } else {
        setStacks(viewModel.stacks, false);
    }
}

function populateMultiSelect() {
    if (viewModel.selectedStack !== null) {
        multiSelect.populate(
            viewModel.selectedStack,
            viewModel.allJobNames,
            function (values) {
                viewModel.selectedStack.selectedJobNames = removeDuplicates(viewModel.selectedStack.selectedJobNames.concat(values));
            },
            function (values) {
                if (values !== null) {
                    viewModel.selectedStack.selectedJobNames = distractArrays(viewModel.selectedStack.selectedJobNames, values);
                }
            }
        );
        viewManipulator.addCheckboxes($('#attachedJobs'), viewModel.selectedStack.jobNames);
        viewManipulator.resetTabFormFields();
    }
    //TODO: else => show warning instead of selectbox?
}

function refreshTabs() {
    if (viewModel.allJobNames.length === 0) {
        dataRetriever.retrieveJobNames(
            function (jobNames) {
                viewModel.allJobNames = jobNames;
                populateMultiSelect();
            }, function () {
                viewManipulator.showError('unable to retrieve job names');
            }
        );
    } else {
        populateMultiSelect();
    }
}

function distractArrays(array1, array2) {
    var result = [];
    for (var i = 0; i < array1.length; i++) {
        if ($.inArray(array1[i], array2) === -1) {
            result[result.length] = array1[i];
        }
    }
    return result;
}

function removeDuplicates(items) {
    var uniqueItems = [];
    $.each(items, function(i, el){
        if($.inArray(el, uniqueItems) === -1) {
            uniqueItems.push(el);
        }
    });
    return uniqueItems;
}