/**
 * user 模块
 */
import axios from '../http';

interface LoginModel {
    username: string;
    password: string;
}

interface EmModel {
    email: string;
    mobile: string;
}

interface ListModel {
    query?: string;
    pagenum: number;
    pagesize: number;
}

interface AddModel extends LoginModel, EmModel {}

const user = {
    login(model: LoginModel) {
        console.log(model);
        return axios.post('/login', model);
    },
    getList(model: ListModel) {
        return axios.get('/users', {
            params: model
        });
    },
    updataState(row: any) {
        return axios.put(`/users/${row.id}/state/${row.mg_state}`);
    },
    add(model: AddModel) {
        return axios.post('/users', model);
    },
    updataUser(id: string, model: EmModel) {
        return axios.put(`/users/${id}`, model);
    },
    delete(id:string){
        return axios.delete(`/users/${id}`)
    }
};

export default user;
