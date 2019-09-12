require.config({
    baseUrl:"js",
    paths:{
        jquery: "lib/jquery-3.3.1",
        service: "../service",
    }
})
require(["jquery", "saleman/index","Route"], function($, salemanIndex, Route) {
        $(".aside").on("click", ".aside-item", function(){
            if($(this).hasClass("a-saleman")){
                salemanIndex();
                // router.push({ path:"/saleman"} )
            }
            else if($(this).hasClass("a-product")){

            }
            else if($(this).hasClass("a-provide")){

            }
        })
        // $(".aside .aside-item:eq(0)").trigger("click");
})
