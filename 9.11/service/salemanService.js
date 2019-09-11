define([], function() {
    var salemanList = [
        {name:"Jame",age:26},
        {name:"Amy", age:27},
        {name:"Bob", age:30},
    ];
    return {
        getList() {
        return salemanList;
        },
        add(name,age) {
            salemanList.push({name,age});
        }
    }
})