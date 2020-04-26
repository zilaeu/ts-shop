/**
 * user 模块
 */
import axios from '../http';

interface Model {
    username: string;
    password: string;
}

const user = {
    login(model: Model) {
        console.log(model);
        return axios.post('/login', model);
    }
};

export default user;
