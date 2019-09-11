define([
    "jquery", 
    "service/salemanService",
    "require",
    "saleman/index"
], function($,salemanService, require ) {
    return function() {
        var addStr = `
            <form>
                <label>姓名</label><input name="name"/>
                <label>年龄</label><input name="age"/>
                <button type="submit">提交</button>
            </form>
        `;
        var $add = $(addStr);
        $add.on('submit', function(e) {
            e.preventDefault();

            var name = $(this).find("input[name=name]").val();
            var age = $(this).find("input[name=age]").val();
            console.log(name,age);
            salemanService.add(name, age);

            require("saleman/index")();
        })
        $("#main .content").html($add);
    }
})