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
            }
        ]
    }
];

export default rt;
