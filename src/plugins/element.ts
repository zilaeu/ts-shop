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
    Message,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Dialog,
    Pagination,
    Tooltip,
    Select,
    MessageBox,
    Option
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
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Tooltip);
Vue.use(Select);
Vue.prototype.$confirm = MessageBox;
Vue.use(Option);
