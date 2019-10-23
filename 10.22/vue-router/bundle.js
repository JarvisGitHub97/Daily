/*
//Vue.use(VueRouter)
//1. 定义路由组件
const Foo = {template: `<div>hello foo</div>`};
const Bar = {template: `<div>hi bar</div>`};
//2. 定义路由，每个路由映射一个路由组件
const routes = [
    {path: '/foo', component: Foo},
    {path: '/bar', component: Bar}
];
//3. 创建路由实例
const router = new VueRouter({
    routes: routes
});
//4.  创建和挂载根还实例
const app = new Vue({
    router
}).$mount("#app");
*/

//动态路由匹配
/*
    const User = {
        template: `<div>User
        <p>{{$route.params.id}}</p>
        </div>
        `
    }
  
    const router = new VueRouter({
        routes: [
        // 动态路径参数 以冒号开头
        { path: '/user/:id', component: User }
        ]
    })

    const app = new Vue({
        router
    }).$mount('#app');
*/

//嵌套路由
/*
const User = {
    template: `
    <div class="user">
        <h2>User {{$route.params.id}}</h2>
        <router-view></router-view>
    </div>
    `,
};

const UserProfile = {
    template: `<h2>profile whh</h2>`
};

const UserPosts = {
    template: `<h2>posts lsd</h2>`
}

const router = new VueRouter({
    routes: [
        { path: '/user/:id', component: User,
          children: [
              { 
                path: 'profile',
                component: UserProfile
              },
              {
                path: 'posts',
                component: UserPosts
              }
          ]        
        }
    ]
});

const app = new Vue({
    router
}).$mount("#app");

*/