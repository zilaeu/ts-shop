import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import {
    Button,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    MenuItem,
    Submenu,
    Avatar,
    Form,
    FormItem,
    Input,
    Message
} from 'element-ui';

Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Avatar);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.prototype.$message = Message;
