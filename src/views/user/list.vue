<template>
    <div class="user-content">
        <!-- main -->
        <el-card class="box-card mt-2">
            <!-- 顶部搜索 与 按钮 -->
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input
                        placeholder="请输入内容"
                        class="input-with-select"
                        v-model="userListQuery.query"
                        clearable
                        @clear="getUserList"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="getUserList"
                        ></el-button>
                    </el-input>
                </el-col>

                <el-col :span="4"
                    ><el-button type="primary" @click="addDialogVisible = true"
                        >添加用户</el-button
                    ></el-col
                >
            </el-row>

            <!-- 列表 -->
            <el-table
                :data="userList"
                border
                stripe
                class="my-2"
                style="width: 100%;"
            >
                <el-table-column type="index" width="80"> </el-table-column>
                <el-table-column prop="username" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width="170">
                </el-table-column>
                <el-table-column prop="mobile" label="电话" width="170">
                </el-table-column>
                <el-table-column prop="role_name" label="角色" width="140">
                </el-table-column>
                <el-table-column prop="mg_state" label="状态" width="140">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.mg_state"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="updataState(scope.row)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- 编辑 -->
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="修改用户信息"
                            placement="top"
                            :enterable="false"
                        >
                            <el-button
                                type="primary"
                                size="mini"
                                icon="el-icon-edit"
                                @click="editUserDialog(scope.row)"
                            ></el-button>
                        </el-tooltip>

                        <!-- 删除 -->
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="删除用户"
                            placement="top"
                            :enterable="false"
                        >
                            <el-button
                                type="danger"
                                size="mini"
                                icon="el-icon-delete"
                                @click="deleteUser(scope.row)"
                            ></el-button>
                        </el-tooltip>

                        <!-- 分配权限 -->
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="分配权限"
                            placement="top"
                            :enterable="false"
                        >
                            <el-button
                                type="warning"
                                size="mini"
                                icon="el-icon-setting"
                                @click="setRightDialog(scope.row)"
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="userListQuery.pagenum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="userListQuery.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="userTotal"
            >
            </el-pagination>

            <!-- 添加用户弹窗 -->
            <el-dialog
                title="添加用户"
                :visible.sync="addDialogVisible"
                width="40%"
                @close="addDialogClosed"
            >
                <el-form
                    :model="addUserForm"
                    :rules="addUserRules"
                    ref="addUserRef"
                    label-width="70px"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="addUserForm.username"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input
                            type="password"
                            v-model="addUserForm.password"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱" prop="email">
                        <el-input
                            type="email"
                            v-model="addUserForm.email"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="手机" prop="mobile">
                        <el-input
                            type="mobile"
                            v-model="addUserForm.mobile"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="addUser">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 修改用户弹窗 -->
            <el-dialog
                title="修改用户"
                :visible.sync="editDialogVisible"
                width="40%"
                @close="editDialogClosed"
            >
                <el-form
                    :model="editUserForm"
                    :rules="editUserRules"
                    ref="editUserRef"
                    label-width="70px"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input
                            v-model="editUserForm.username"
                            disabled
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱" prop="email">
                        <el-input
                            type="email"
                            v-model="editUserForm.email"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="手机" prop="mobile">
                        <el-input
                            type="mobile"
                            v-model="editUserForm.mobile"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="editUser"
                        >确 定</el-button
                    >
                </span>
            </el-dialog>

            <!-- 分配角色 -->
            <el-dialog
                title="添加用户"
                :visible.sync="setRightDialogVisible"
                width="40%"
            >
                <el-form
                    :model="setRightForm"
                    ref="setRightRef"
                    label-width="70px"
                >
                    <el-form-item label="用户名">
                        <el-input
                            v-model="setRightForm.username"
                            disabled
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="当前角色">
                        <el-input
                            v-model="setRightForm.role_name"
                            disabled
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="新角色">
                        <el-select v-model="newRight" placeholder="请选择">
                            <el-option
                                v-for="item in rightsAll"
                                :key="item.id"
                                :label="item.roleName"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="setRightDialogVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="setRight"
                        >确 定</el-button
                    >
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //用户列表
            userList: [],
            //获取用户列表的参数
            userListQuery: {
                query: '',
                pagenum: 1,
                pagesize: 10
            },
            //总用户条数
            userTotal: 0,
            //添加用户弹窗的开关
            addDialogVisible: false,
            //添加用户表单
            addUserForm: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            //添加用户表单验证
            addUserRules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '长度在 3 到 10 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '长度在 3 到 10 个字符',
                        trigger: 'blur'
                    }
                ],
                email: [
                    {
                        required: true,
                        message: '请输入邮箱',
                        trigger: 'blur'
                    },
                    {
                        trigger: 'blur'
                    },
                    {
                        min: 8,
                        max: 22,
                        message: '长度在 8 到 22 个字符',
                        trigger: 'blur'
                    }
                ],

                mobile: [
                    {
                        required: true,
                        message: '请输入手机',
                        trigger: 'blur'
                    },
                    {
                        trigger: 'blur'
                    },
                    {
                        min: 11,
                        max: 11,
                        message: '长度为11位',
                        trigger: 'blur'
                    }
                ]
            },
            //修改用户弹窗开关
            editDialogVisible: false,
            //修改用户信息
            editUserForm: {
                username: '',
                password: '',
                mobile: ''
            },
            //修改用户表单验证
            editUserRules: {
                email: [
                    {
                        required: true,
                        message: '请输入邮箱',
                        trigger: 'blur'
                    },
                    {
                        trigger: 'blur'
                    },
                    {
                        min: 8,
                        max: 22,
                        message: '长度在 8 到 22 个字符',
                        trigger: 'blur'
                    }
                ],

                mobile: [
                    {
                        required: true,
                        message: '请输入手机',
                        trigger: 'blur'
                    },
                    {
                        trigger: 'blur'
                    },
                    {
                        min: 11,
                        max: 11,
                        message: '长度为11位',
                        trigger: 'blur'
                    }
                ]
            },
            // 设置角色的用户信息
            setRightForm: {},
            // 添加角色的弹窗
            setRightDialogVisible: false,
            //所有脚色
            rightsAll: [],
            //新脚色
            newRight: ''
        };
    },
    created() {
        this.getUserList();
        this.getAllRight();
    },
    methods: {
        //获取用户列表
        async getUserList() {
            const { data: res } = await this.$api.user.getList(
                this.userListQuery
            );
            console.log('用户列表', res);
            if (res.meta.status != 200)
                return this.$message.error(res.msg.data);
            this.userList = res.data.users;
            this.userTotal = res.data.total;
        },
        // 当改变每页条数的时候触发
        handleSizeChange(newSize) {
            // 参数为新的条数
            console.log(newSize);
            this.userListQuery.pagesize = newSize;
            this.getUserList(this.userListQuery);
        },
        //页数改变时触发
        handleCurrentChange(newPage) {
            // 参数为新的页数
            console.log(newPage);
            this.userListQuery.pagenum = newPage;
            this.getUserList(this.userListQuery);
        },
        //改变状态时触发
        async updataState(userinfo) {
            console.log(userinfo);
            const { data: res } = await this.$api.user.updataState(userinfo);
            console.log(res);
            if (res.meta.status != 200)
                return this.$message.error('修改失败：' + res.meta.msg);
            this.$message.success('修改成功');
        },
        //取消添加用户
        addDialogClosed() {
            this.$refs.addUserRef.resetFields();
        },
        //添加用户
        addUser() {
            this.$refs.addUserRef.validate(async valid => {
                console.log(valid);
                // this.addDialogVisible = false
                if (!valid) return this.$message.error('请输入正确的添加用户');
                const { data: res } = await this.$api.user.add(
                    this.addUserForm
                );

                if (res.meta.status != 201)
                    return this.$message.error('添加用户失败：' + res.meta.msg);
                this.addDialogVisible = false;
                this.getUserList();
                this.$message.success('添加用户成功');
            });
        },
        //展示修改用户弹窗
        editUserDialog(editUser) {
            this.editDialogVisible = true;
            this.editUserForm = editUser;
        },
        //取消修改用户
        editDialogClosed() {
            this.$refs.editUserRef.resetFields();
        },
        //修改用户
        editUser() {
            this.$refs.editUserRef.validate(async valid => {
                if (!valid) return this.$message.error('修改用户错误');

                const { data: res } = await this.$api.user.updataUser(
                    this.editUserForm.id,
                    {
                        email: this.editUserForm.email,
                        mobile: this.editUserForm.mobile
                    }
                );

                console.log(res);
                if (res.meta.status != 200)
                    return this.$message.error('修改用户失败：' + res.meta.msg);

                this.editDialogVisible = false;
                this.getUserList();
                this.$message.success('修改用户成功');
            });
        },
        //确认删除
        async deleteUser(row) {
            const res = await this.$confirm(
                `此操作将永久删除该用户:${row.username}, 是否继续?`,
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).catch(err => err);

            //确认confirm 取消cancel
            console.log(res);
            if (res == 'cancel') return;
            const { data: delRes } = await this.$api.user.delete(row.id);
            console.log(delRes);
            if (delRes.meta.status != 200)
                return this.$message.error('删除用户失败：' + delRes.meta.msg);

            this.getUserList();
            this.$message.success('删除成功');
        },
        //获取所有脚色
        async getAllRight() {
            const { data: res } = await this.$api.role.getList();
            if (res.meta.status != 200)
                return this.$message.error(
                    '获取所有角色列表失败：' + res.meta.msg
                );
            console.log(res);
            this.rightsAll = res.data;
        },
        //展示分配角色的弹框
        setRightDialog(user) {
            this.setRightDialogVisible = true;
            this.setRightForm = user;
            //每次展示弹窗时清空select
            this.newRight = '';
            console.log(this.setRightForm);
        },
        //分配叫色
        async setRight() {
            //判断用户是否选择新教色
            if (!this.newRight) {
                return this.$message.error('请选择新角色');
            }

            const uid = this.setRightForm.id;
            const { data: res } = await this.$api.role.putUser(
                uid,
                this.newRight
            );

            if (res.meta.status != 200)
                return this.$message.error('设置角色失败：' + res.meta.msg);
            console.log(res);

            this.setRightDialogVisible = false;
            this.$message.success('设置角色成功');
            this.getUserList();
        }
    }
};
</script>
