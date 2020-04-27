/**
 * role 模块
 */
import axios from '../http';

interface AddRolesModel {
    roleName: string;
    roleDesc?: string;
}

const role = {
    getList() {
        return axios.get('/roles');
    },
    getRoleById(id: string) {
        return axios.get(`/roles/${id}`);
    },
    putUser(uid: string, rid: string) {
        return axios.put(`users/${uid}/role`, { rid });
    },
    deleteItem(roleId: string, rightId: string) {
        return axios.delete(`roles/${roleId}/rights/${rightId}`);
    },
    setRoles(roleId: string, rightId: string) {
        return axios.post(`roles/${roleId}/rights`, { rids: rightId });
    },
    addRoles(model: AddRolesModel) {
        return axios.post('roles', model);
    },
    editRoles(id: number, model: AddRolesModel) {
        return axios.put(`roles/${id}`, model);
    },
    deleteRole(id: number) {
        return axios.delete(`roles/${id}`);
    }
};

export default role;
