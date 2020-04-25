/**
 * user 模块
 */
import axios from '../http';

const user = {
    login(username: string, password: string) {
        return axios.post('/login', {
            username,
            password
        });
    }
};

export default user;
