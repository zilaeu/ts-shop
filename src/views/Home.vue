<template>
    <div class="home-content">
        <el-container>
            <el-header class="d-flex jc-between ai-center bg-gray-middle">
                <a href="/" class="hd-logo font-18 text-white">{{
                    $conf.logo
                }}</a>
                <el-menu
                    class="hd-menu bg-gray-middle"
                    mode="horizontal"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    router
                >
                    <el-menu-item>前台首页</el-menu-item>
                    <el-submenu class="text-white" index="100">
                        <template slot="title">
                            <el-avatar
                                size="small"
                                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                            ></el-avatar>
                            <span class="text-white ml-1">small</span>
                        </template>
                        <el-menu-item index="2-1">清除缓存</el-menu-item>
                        <el-menu-item index="2-2">修改密码</el-menu-item>
                        <el-menu-item index="2-3">退出登录</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-header>
            <el-container>
                <!-- 侧边栏  -->
                <el-aside width="200px">
                    <el-menu
                        style="box-sizing: border-box;"
                        router
                        unique-opened
                    >
                        <el-submenu
                            v-for="item in menuList"
                            :key="item.id"
                            :index="'/' + item.path"
                        >
                            <template slot="title">
                                <i :class="iconList[item.id]"></i>
                                <span>{{ item.authName }}</span>
                            </template>

                            <!-- 二级导航 -->
                            <el-menu-item
                                :index="'/' + subItem.path"
                                v-for="subItem in item.children"
                                :key="subItem.id"
                            >
                                <template slot="title">
                                    <i
                                        class="iconfont icon-icon_huabanfuben next-icon"
                                    ></i>
                                    <span>{{ subItem.authName }}</span>
                                </template>
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main class="bg-gray-light">
                    <el-breadcrumb
                        separator-class="el-icon-arrow-right pb-2"
                        style="border-bottom: 1px solid #ccc"
                        v-if="$route.path !== '/index'"
                    >
                        <el-breadcrumb-item
                            v-for="(item, index) in Breadcrumbs"
                            :key="index"
                            :to="{ path: item.path }"
                            >{{ item.title }}</el-breadcrumb-item
                        >
                    </el-breadcrumb>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            menuList: [],
            iconList: {
                '125': 'iconfont title-icon icon-groupctrl',
                '103': 'iconfont title-icon icon-quanxian',
                '101': 'iconfont title-icon icon-marks',
                '102': 'iconfont title-icon icon-edit',
                '145': 'iconfont title-icon icon-meeting'
            },
            isCollapse: false,
            activePath: '',
            Breadcrumbs: []
        };
    },
    created() {
        this.getMenuList();
        this.getRouterBran();
    },
    methods: {
        // 获取菜单
        async getMenuList() {
            const { data: res } = await this.$api.home.menus();
            console.log(res);
            if (res.meta.status != 200) return this.$router.push('/login');
            this.menuList = res.data;

            console.log(this.menuList);
        },
        // 获取面包屑
        getRouterBran() {
            const Breadcrumbs = this.$route.matched.filter(item => item.name);
            console.log('matched', this.$route.matched);
            const arr = [];
            Breadcrumbs.forEach((k, v) => {
                console.log(k, v);
                if (k.name === 'Home' || k.name === 'index') return;
                arr.push({ name: k.name, path: k.path, title: k.meta.title });
            });
            console.log('arr', arr);
            if (arr.length > 0) {
                arr.unshift({
                    name: 'index',
                    path: '/index',
                    title: '后台首页'
                });
            }
            this.Breadcrumbs = arr;
            console.log(this.Breadcrumbs);
        }
    }
};
</script>
