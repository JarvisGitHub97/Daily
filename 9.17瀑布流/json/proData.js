let fs = require('fs'),
    ary = [];
for (let i = 1; i <= 20 ; i++) {
    ary.push({
        id:i,
        pic: `img/${Math.round(Math.random()*12 + 1)}.jpg`,
        title:'艾薇儿·拉维尼（Avril Ramona Lavigne），1984年9月27日出生于加拿大安大略省贝尔维尔，加拿大女歌手、词曲作者、演员，拥有加拿大、法国双国籍',
        link:'https://baike.baidu.com/item/%E8%89%BE%E8%96%87%E5%84%BF%C2%B7%E6%8B%89%E7%BB%B4%E5%B0%BC/8566850?fromtitle=%E8%89%BE%E8%96%87%E5%84%BF&fromid=478366&fr=aladdin'
    });
}
fs.writeFileSync('data.json', JSON.stringify(ary), 'utf-8');

