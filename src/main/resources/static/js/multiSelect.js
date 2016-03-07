MultiSelect = function(){};

MultiSelect.prototype.populate = function(selectedStack, allJobNames, afterSelectFunc, afterDeselectFunc) {
    var elJobList = $('#releasepackagelist');
    elJobList.multiSelect({
        selectableHeader: '<input type="text" id="autocomplete1" autocomplete="off" placeholder="unattached" />',
        selectionHeader: '<input type="text" id="autocomplete2" autocomplete="off" placeholder="attached" />',
        afterInit: this.initAutoComplete,
        afterSelect: afterSelectFunc,
        afterDeselect: afterDeselectFunc
    });
    elJobList.multiSelect('deselect_all');
    $(allJobNames).each(function(idx) {
        elJobList.multiSelect('addOption', {
            value: allJobNames[idx],
            text: allJobNames[idx]
        });
    });
    elJobList.multiSelect('select', selectedStack.jobNames);
};

MultiSelect.prototype.initAutoComplete = function() {
    $('#autocomplete1').autocomplete({
        lookup: function(query, done) {
            var suggestions = [];
            $.each($('#ms-releasepackagelist').find('.ms-elem-selectable:not(.ms-selected) > span'), function(idx, value) {
                suggestions[suggestions.length] = {'value': $(value).text(), 'data': $(value).text()};
            });
            done({suggestions: suggestions});
        },
        onSelect: function(suggestion) {
            $('#releasepackagelist').multiSelect('select', suggestion.value);
        }
    });

    $('#autocomplete2').autocomplete({
        lookup: function(query, done) {
            var suggestions = [];
            $.each($('#ms-releasepackagelist').find('.ms-elem-selection.ms-selected > span'), function(idx, value) {
                suggestions[suggestions.length] = {'value': $(value).text(), 'data': $(value).text()};
            });
            done({suggestions: suggestions});
        },
        onSelect: function(suggestion) {
            $('#releasepackagelist').multiSelect('deselect', suggestion.value);
        }
    });
};