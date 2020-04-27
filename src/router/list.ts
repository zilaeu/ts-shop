const rt: Array<any> = [
    {
        path: '/login',
        component: 'user/login'
    },
    {
        path: '/',
        component: 'Home',
        redirect: { name: 'index' },
        children: [
            {
                meta: { title: '后台首页' },
                component: 'index/index'
            },
            {
                meta: { title: '用户列表' },
                component: 'user/list'
            },
            {
                meta: { title: '角色列表' },
                component: 'roles/list'
            },
            {
                meta: { title: '权限列表' },
                component: 'rights/list'
            }
        ]
    }
];

export default rt;
