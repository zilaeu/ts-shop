/**
 * right 模块
 */
import axios from '../http';

const right = {
    getList(type?: string) {
        return axios.get(`rights/${type}`);
    }
};

export default right;
