function each_input(name, fn) {
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].name === name)
            fn.apply(inputs[i]);
    }
}

function loadOptions() {
    if ('open_in' in localStorage) {
        each_input('open_in', function() {
            this.checked = (this.value === localStorage['open_in']);
        });
    }
}

function saveOptions() {
    each_input('open_in', function() {
        if (this.checked)
            localStorage['open_in'] = this.value;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('input#save').addEventListener('click', saveOptions);
    loadOptions();
});
