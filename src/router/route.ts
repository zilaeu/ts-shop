import { RouteConfig } from 'vue-router';

import rt from './list';
console.log(rt);
// 截取/cs/index => /cs
function spIndex(str: string): string {
    // 最后一个'/'的索引
    const index = str.lastIndexOf('/');

    // /cs/index -> index
    const ltName = str.substring(index + 1);

    // 如果是index /cs/index => /cs
    if (ltName == 'index') {
        return str.substring(index, -1);
    }
    return str;
}

// 加工router
function setRouter(arr: Array<any>) {
    for (let i = 0; i < arr.length; i++) {
        // 如果没有component 直接返回
        if (!arr[i].component) return;

        // 截取component
        const val = spIndex(arr[i].component);

        // 生成path
        arr[i].path = arr[i].path || `/${val}`;

        // 生成name
        arr[i].name = arr[i].name || val.replace(/\//g, '_');
        console.log(arr[i].name);
        // 改造component -------
        // 拼接对应的模块
        const componentFunC = import(`@/views/${arr[i].component}.vue`);

        // 替换component
        arr[i].component = () => componentFunC;

        // 递归
        if (arr[i].children && arr[i].children.length > 0) {
            setRouter(arr[i].children);
        }
    }
}

// 获取路由
function getRouter(routes: Array<any>): Array<RouteConfig> {
    setRouter(routes);
    console.log(routes);
    return routes;
}

export default getRouter(rt);
