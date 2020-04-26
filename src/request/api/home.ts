/**
 * user 模块
 */
import axios from '../http';

const home = {
    menus() {
        return axios.get('/menus');
    }
};

export default home;
