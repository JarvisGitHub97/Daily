define(['Route', 'saleman/index', 'saleman/add'], function(Route, salemanIndex, salemanAdd) {
    var router = new Route({
        routes:[
            {path: "/saleman", component:salemanIndex},
            {path: "/saleman/add", component:salemanAdd}
        ]
    });
})