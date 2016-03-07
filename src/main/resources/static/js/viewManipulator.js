ViewManipulator = function(){};

ViewManipulator.prototype.initTabLayout = function() {
    $('ul.tabs li:first').addClass('active');
    $('.block article').hide();
    $('.block article:first').show();
    $('ul.tabs li').on('click', function() {
        $('ul.tabs li').removeClass('active');
        $(this).addClass('active');
        $('.block article').hide();
        var activeTab = $(this).find('a').attr('href');
        $(activeTab).show();
        return false;
    });
};

ViewManipulator.prototype.showError = function(message) {
    this.showNotification('error', 'error', message);
};

ViewManipulator.prototype.showSuccess = function(message) {
    this.showNotification('success', 'success', message);
};

ViewManipulator.prototype.showNotification = function(aType, aTitle, aMessage) {
    notify({
        type: aType, //alert | success | error | warning | info
        title: aTitle,
        theme: 'dark-theme',
        position: {
            x: 'center', //right | left | center
            y: 'center' //top | bottom | center
        },
        closeBtn: false,
        autoHide: true,
        delay: 2600,
        icon: '<img src="gfx/plane.png" />',
        message: aMessage
    });
};

ViewManipulator.prototype.changeUploadTemplateFileName = function() {
    var templateFile = $('#template').get(0).files[0];
    if (typeof templateFile !== 'undefined') {
        $('#templateFileName').html(templateFile.name);
    }
};

ViewManipulator.prototype.addCheckboxes = function(container, jobNames) {
    container.html('');
    for (var i = 0; i < jobNames.length; i++) {
        $('<li><input id="' + jobNames[i] + '" name="jobNames" type="checkbox" /><label for="' + jobNames[i] + '">' + jobNames[i] + '</label>', {}).appendTo(container);
    }
};

ViewManipulator.prototype.updateJobListStatus = function(container, requiredReleases) {
    var self = this;
    var checkboxes = container.find('li');
    $(checkboxes).each(function() {
        if (self.newReleaseRequired(requiredReleases, $(this).find('label').html())) {
            $(this).find('input').show();
        } else {
            $(this).find('input').hide();
        }
    });
};

ViewManipulator.prototype.newReleaseRequired = function(labels, label) {
    return ($.inArray(label, labels) !== -1);
};

ViewManipulator.prototype.resetFileUploadField = function() {
    var templateUpload = $('#template');
    templateUpload.replaceWith(templateUpload.val('').clone(true));
    $('#templateFileName').html('');
};

ViewManipulator.prototype.populateStackSelect = function(stacks) {
    $('#stacklist').find('option').remove();
    $.each(stacks, function(i, item) {
        $('#stacklist').append($('<option>', {
            value: item.name,
            text: item.name
        }));
    });
};

ViewManipulator.prototype.resetTabFormFields = function() {
    this.resetFileUploadField();
    $('#sprintNr').val('');
};

ViewManipulator.prototype.retrieveCheckedJobNames = function() {
    var checkedJobNames = [];
    $('input[name=jobNames]:checked').each(function() {
        checkedJobNames.push($(this).attr('id'));
    });
    return checkedJobNames;
};

ViewManipulator.prototype.retrieveJobNames = function() {
    var jobNames = [];
    $('input[name=jobNames]').each(function() {
        jobNames.push($(this).attr('id'));
    });
    return jobNames;
};