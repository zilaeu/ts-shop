/**
 * role 模块
 */
import axios from '../http';

const role = {
    getList() {
        return axios.get('/roles');
    },
    putUser(uid: string, rid: string) {
        return axios.put(`users/${uid}/role`, { rid });
    }
};

export default role;
