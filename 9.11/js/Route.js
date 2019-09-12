define([], function() {
    function Route(option) {
        this.routes = option.routes;
        this.init();
    }
    Route.prototype = {
        constructor:Route,
        init() {
            var my = this;
            window.addEventListener("hashchange", function(){
                var hash = location.hash.substring(1);
                
                var route = my.routes.find(item=>{
                    return item.path === path;
                })
                if(route) {
                    route.component();
                }
            })
            
        },
        push({path}) {
            var route = this.routes.find(item=>{
            return item.path === path; 
            })
            if(route) {
                route.component();
            }
        }
    }
    return Route;
})