require.config({
    paths:{
        jquery: "jquery-3.3.1"
    }
});
require(['jquery'], function(jquery) {
    jquery('body').append('<div>hi</div>');
});