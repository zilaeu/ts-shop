import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Element-ui
import './plugins/element';

// 全局样式
import './assets/css/style.scss';

// config
import conf from './common/config/config';
Vue.prototype.$conf = conf;

// axios
import api from './request/api';
Vue.prototype.$api = api;

// 字体图标
import './assets/fonts/iconfont.css';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
