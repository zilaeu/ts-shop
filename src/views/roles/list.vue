<template>
    <div class="roles-list-content mt-2">
        <el-card>
            <el-row class="mb-2">
                <el-col>
                    <el-button
                        type="primary"
                        @click="addRoleDialogVisible = true"
                        >添加角色</el-button
                    >
                </el-col>
            </el-row>

            <!-- 列表 -->
            <el-table :data="rolesList" style="width: 100%" border stripe>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-row
                            v-for="(v1, i1) in props.row.children"
                            :key="v1.id"
                            :class="[
                                'rowbdb',
                                i1 === 0 ? 'rowbdt' : '',
                                'vcenter',
                                'py-1'
                            ]"
                        >
                            <!-- 一级 -->
                            <el-col :span="5">
                                <el-tag
                                    closable
                                    class="v1-tag"
                                    @close="delItem(props.row, v1.id)"
                                    >{{ v1.authName }}</el-tag
                                >

                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 二级 三级 -->
                            <el-col :span="19">
                                <el-row
                                    v-for="(v2, i2) in v1.children"
                                    :key="v2.id"
                                    :class="[
                                        i2 === 0 ? '' : 'rowbdt',
                                        'vcenter',
                                        'py-1'
                                    ]"
                                >
                                    <!-- 二级 -->
                                    <el-col :span="6">
                                        <el-tag
                                            closable
                                            @close="delItem(props.row, v2.id)"
                                            type="success"
                                            class="v2-tag"
                                            >{{ v2.authName }}
                                        </el-tag>

                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <!-- 三级 -->
                                    <el-col :span="18">
                                        <el-tag
                                            closable
                                            @close="delItem(props.row, v3.id)"
                                            type="danger"
                                            class="v2-tag"
                                            v-for="(v3, i3) in v2.children"
                                            :key="v3.id"
                                            :class="[i3 === 0 ? '' : 'rowbdt']"
                                            >{{ v3.authName }}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column
                    label="角色名称"
                    prop="roleName"
                ></el-table-column>
                <el-table-column
                    label="角色描述"
                    prop="roleDesc"
                ></el-table-column>
                <el-table-column label="操作" prop="level">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="mini"
                            icon="el-icon-edit"
                            @click="editRolesVisible(scope.row)"
                            >编辑</el-button
                        >

                        <el-button
                            type="success"
                            size="mini"
                            icon="el-icon-delete"
                            @click="delRole(scope.row)"
                            >删除</el-button
                        >

                        <el-button
                            type="danger"
                            size="mini"
                            icon="el-icon-setting"
                            @click="showSetRightDialogVisible(scope.row)"
                            >分配权限</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 分配权限弹框 -->
        <el-dialog
            title="分配权限"
            :visible.sync="setRightDialogVisible"
            width="40%"
        >
            <el-tree
                :data="rightList"
                :props="rightProps"
                show-checkbox
                node-key="id"
                :default-expand-all="true"
                :default-checked-keys="delKey"
                ref="treeRef"
            >
            </el-tree>

            <span slot="footer" class="dialog-footer">
                <el-button @click="setRightDialogVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="setRight">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加角色 -->
        <el-dialog
            title="添加角色"
            :visible.sync="addRoleDialogVisible"
            width="40%"
            @close="addRoleDialogClosed"
        >
            <el-form :model="addRoleForm" ref="addRoleRef" label-width="70px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addRoleForm.roleName"></el-input>
                </el-form-item>

                <el-form-item label="角色介绍" prop="roleDesc">
                    <el-input v-model="addRoleForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="addRole">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑角色 -->
        <el-dialog
            title="编辑角色"
            :visible.sync="editRoleDialogVisible"
            width="40%"
        >
            <el-form :model="editRoleForm" ref="editRoleRef" label-width="70px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="editRoleForm.roleName"></el-input>
                </el-form-item>

                <el-form-item label="角色介绍" prop="roleDesc">
                    <el-input v-model="editRoleForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editRoleDialogVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="editRole">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 角色列表
            rolesList: [],
            // 分配权限弹窗开关
            setRightDialogVisible: false,
            // 所有权限列表
            rightList: [],
            // 树形节点
            rightProps: {
                children: 'children',
                label: 'authName'
            },
            // 默认选中的权限数组
            delKey: [],
            //需要分配权限的用户
            setRightUserId: '',
            addRoleForm: {
                roleName: '',
                roleDesc: ''
            },
            editRoleId: 0,
            editRoleForm: {
                roleName: '',
                roleDesc: ''
            },
            addRoleDialogVisible: false,
            editRoleDialogVisible: false
        };
    },
    mounted() {
        this.getRolesList();
    },
    methods: {
        async getRolesList() {
            const { data: res } = await this.$api.role.getList();
            console.log(res);
            this.rolesList = res.data;
        },
        // 删除该项
        async delItem(role, rightId) {
            const res = await this.$confirm(
                '此操作将永久删除该项, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).catch(err => err);

            //确认confirm 取消cancel
            // console.log(res);
            if (res == 'cancel') return;
            //
            console.log(role.id + '----------------' + rightId);

            const { data: delRes } = await this.$api.role.deleteItem(
                role.id,
                rightId
            );

            if (delRes.meta.status != 200)
                return this.$message.error('删除失败：' + delRes.meta.msg);

            this.$message.success('删除成功');

            role.children = delRes.data;
        },
        // 打开分配权限的开关，并渲染出所有权限
        async showSetRightDialogVisible(rowRoles) {
            //记录当前用户的id
            this.setRightUserId = rowRoles.id;

            //每次先重置delkey
            this.delKey = [];
            console.log(rowRoles.children);

            //获取所有权限
            const { data: res } = await this.$api.right.getList('tree');
            // console.log(res);

            if (res.meta.status !== 200)
                return this.$message.error('获取权限列表失败：' + res.meta.msg);
            this.rightList = res.data;

            //递归默认权限
            this.forRoles(rowRoles, this.delKey);
            console.log(this.delKey);

            //默认分配权限渲染完毕 展示出页面
            this.setRightDialogVisible = true;
        },
        // 遍历所有角色权限
        forRoles(node, arr) {
            // 如果是最后一个节点
            if (!node.children) {
                //return 出去 并把id 赋值到数组中
                return arr.push(node.id);
            }

            //如果不是 继续向下遍历每一个children继续寻找
            node.children.forEach(item => {
                this.forRoles(item, arr);
            });
        },
        async setRight() {
            // 拿到选中与版选中的id
            const arrKey = [
                ...this.$refs.treeRef.getCheckedKeys(),
                ...this.$refs.treeRef.getHalfCheckedKeys()
            ];

            // console.log(arrKey);
            // 转字符串
            const strKey = arrKey.join(',');
            console.log(strKey);

            const { data: res } = await this.$api.role.setRoles(
                this.setRightUserId,
                strKey
            );

            console.log(res);

            if (res.meta.status !== 200)
                return this.$message.error('设置权限失败：' + res.meta.msg);
            this.getRolesList();
            this.setRightDialogVisible = false;
            this.$message.success('设置权限成功');
        },
        addRoleDialogClosed() {
            console.log('1111');
        },
        // 添加角色
        async addRole() {
            console.log(this.addRoleForm);
            const { data: res } = await this.$api.role.addRoles(
                this.addRoleForm
            );

            if (res.meta.status !== 201)
                return this.$message.error('添加角色失败：' + res.meta.msg);

            this.$message.success('添加角色成功');
            this.getRolesList();
            this.addRoleDialogVisible = false;
            this.addRoleForm.roleName = this.addRoleForm.roleDesc = '';
        },
        // 编辑校色数据写入
        async editRolesVisible(row) {
            console.log(row.id);
            this.editRoleId = row.id;
            const { data: res } = await this.$api.role.getRoleById(row.id);
            console.log(res);
            if (res.meta.status !== 200)
                return this.$message.error('获取角色失败：' + res.meta.msg);

            this.editRoleDialogVisible = true;
            console.log('res.data', res.data);
            // 绑定数据
            this.editRoleForm.roleName = res.data.roleName;
            this.editRoleForm.roleDesc = res.data.roleDesc;
        },
        // 编辑校色
        async editRole() {
            const { data: res } = await this.$api.role.editRoles(
                this.editRoleId,
                this.editRoleForm
            );
            console.log(res);
            if (res.meta.status !== 200)
                return this.$message.error('编辑角色失败：' + res.meta.msg);
            this.$message.success('编辑角色成功');
            this.editRoleDialogVisible = false;
            this.getRolesList();
            this.editRoleForm.roleName = this.editRoleForm.roleDesc = '';
        },
        async delRole(row) {
            const warning = await this.$confirm(
                `此操作将永久删除角色：<span style="color:red">${row.roleName}</span>, 是否继续?`,
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    dangerouslyUseHTMLString: true
                }
            ).catch(err => err);

            if (warning == 'cancel') return;

            const { data: res } = await this.$api.role.deleteRole(row.id);
            if (res.meta.status !== 200)
                return this.$message.error('删除角色失败：' + res.meta.msg);
            this.$message.success('删除角色成功');
            this.getRolesList();
        }
    }
};
</script>
