define(["jquery", "service/salemanService", "saleman/add"], function($, salemanService, salemanAdd) {
    return function() {
        console.log("数据服务:", salemanService);
        var str = `
        <div>
            <div>
                <button class = "add">添加</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    ${salemanService.getList().map(item=>{
                        return `<tr><td>${item.name}</td><td>${item.age}</td><td><button>编辑</button></td></tr>`
                        }).join("")
                    }
                </tbody>
            </table>
        </div>
        `;

        var $saleman = $(str);

        $saleman.on("click", ".add", function(){
            salemanAdd();
        })

        $("#main .content").html($saleman);
    }
})