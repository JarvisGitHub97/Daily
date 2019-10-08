// var app = new Vue({
//     el: "#app",
//     data: {
//         name: null,
//         age: null,
//     }
// });

// var two = new Vue({
//     el: "#two",
//     data: {
//         foodList: [
//             {
//                 name: '蒜',
//                 price: 1,
//                 discount:.5 
//             },
//             {
//                 name: '姜',
//                 price: 2,
//                 discount: .1
//             }
//         ]
//     }
// });

// var app = new Vue({
//     el: '#app',
//     data: {
//         url: 'http://baidu.com',
//         isActive: false
//     }
// });

// var app = new Vue({
//     el: "#app",
//     methods: {
//         onClick: function() {
//           console.log('clicked');  
//         },
//         onEnter: function() {
//             console.log('entered');
//         },
//         onOut: function() {
//             console.log('outed')
//         },
//         onSubmit: function() {
//             console.log('submited')
//         },
//     }
// });

// var app = new Vue({
//     el: "#app",
//     data: {
//         name: "whh"
//     }
// });

// var app = new Vue({
//     el: "#app",
//     data: {
//         sex: [],
//         from: [],
//         role: 'super_admin',
//         math: 90,
//         english: 95
//     },
//     computed: {
//         sum: function() {
//             return parseFloat(this.math) + parseFloat(this.english);
//         },
//         avrage: function() {
//             return Math.round(this.sum/2);
//         }
//     }
// });

// Vue.component('alert', {
//     template: '<button @click="on_click">helo</button>',
//     methods: {
//         on_click: function() {
//             alert('yo');
//         }
//     }
// });



// var Alert = {
//     template: '<button @click="on_click">helo</button>',
//     methods: {
//         on_click: function() {
//             alert('yo');
//         }
//     }
// }

// new Vue({
//     el: '#app',
//     component: {
//         alert: Alert
//     }
// });

// Vue.component('like', {
//     template: '<button :class="{liked: liked}" @click="toggle_like()">like{{like_count}}</button>',
//     data: function() {
//         return {
//             like_count: 20,
//             liked: false,
//         }
//     },
//     methods: {
//         toggle_like: function() {
//             if(!this.liked)
//                 this.like_count++;
//             else this.like_count--;
//             this.liked = !this.liked
//         }
//     }
// })

// new Vue({
//     el: '#app'
// });

// Vue.component('alert', {
//     template: '<button @click="on_click">halo</button>',
//     props: ['msg'],
//     methods: {
//         on_click: function() {
//             alert(this.msg);
//         }
//     }
// });

// Vue.component('balance', {
//     template: `
//     <div>
//         <show @show_balance="show_balance">
//         </show>
//         <div v-if="show">
//         您的余额为22
//         </div>
//     </div>
//     ` ,
//     methods: {
//         show_balance: function(data) {
//             this.show = true;
//             console.log("data", data);
//         }
//     },
//     data: function() {
//         return {
//             show: false
//         }
//     }
// })
// Vue.component('show', {
//     template: '<button @click="on_click()">显示余额</button>',
//     methods: {
//         on_click: function() {
//             this.$emit('show_balance', {a: 1, b: 2})
//         }
//     }
// })

// new Vue({
//     el: "#app",
// });

// var Event = new Vue();      //事件调度器

// Vue.component('amy', {
//     template: `<div>
//         我说：<input @keyup="on_change" v-model="i_said"/>
//     </div>`,
//     data: function() {
//         return {
//             i_said: ''
//         }
//     },
//     methods: {
//         on_change: function() {
//             Event.$emit('amy-said-something', this.i_said)
//         }
//     }
    
// })

// Vue.component('bill', {
//     template: `<div>
//         amy说: {{amy_said}}
//     </div>`,
//     data: function() {
//         return {
//             amy_said: ''
//         }
//     },
//     mounted: function() {
//         var me = this;
//         Event.$on('amy-said-something', function(data) {
//             me.amy_said = data; 
//         })
//     }
// })

// new Vue({
//     el: '#app'
// });


// Vue.filter('currency', function(val, unit) {
//     val = val || 0;
//     unit = unit || '元'
//     return val + unit;
// })



// Vue.filter('meter', function(val, unit) {
//     val = val || 0;
//     unit = unit || 'm';
//     return (val/1000).toFixed(2) + unit;
// })

// new Vue({
//     el: '#app',
//     data: {
//         price: 10,
//         length: 1000
//     }
// })

// Vue.directive('pin', function(el,binding) {
//     var pinned = binding.value;
//     var position = binding.modifiers;
//     var warning = binding.arg;
//     console.log(position)
//     if (pinned) {
//         el.style.position = 'fixed';
//         for(var key in position) {
//             if(position[key]) {
//               el.style[key] = '10px';  
//             }
//         }
//         if(warning === 'true') {
//             el.style.background = 'yellow'
//         }
//         // el.style.top = '10px';
//         // el.style.left = '10px';
//     }
//     else {
//         el.style.position = 'static'
//     }
// })

// new Vue({
//     el: '#app',
//     data: {
//         card1: {
//             pinned: false
//         },
//         card2: {
//             pinned: false
//         }
//     }
// })

// var base = {
//     methods: {
//         show: function() {
//             this.visible = true;
//         },
//         hide: function() {
//             this.visible = false;
//         },
//         toggle: function() {
//             this.visible = !this.visible;
//         }
//     },
//     data: function() {
//         return {
//             visible: false
//         }
//     }
// };

// Vue.component('tooltip', {
//     template: `
//     <div>
//         <span @mouseenter="show" @mouseleave="hide">vue</span>
//         <div v-if="visible">渐进式框架</div>
//     </div>
//     `,
//     mixins:[base]
// })

// Vue.component('popup', {
//     template: `
//     <div>
//         <button @click="toggle">Popup</button>
//         <div v-if="visible">
//             <span @click="hide">x</span>
//             <h4>title</h4>
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//         </div>
//     </div>
//     `,
//     mixins: [base],
//     data: function() {
//         return {
//             visible: true
//         }
//     }, 
// })

// new Vue({
//     el: '#app'
// })

Vue.component('panel', {
    template: '#panel-tpl'
})
new Vue({
    el: '#app'
})