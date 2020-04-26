<template>
    <div class="login-content">
        <div class="login-main">
            <!-- logo -->
            <div class="login-logo">
                <img :src="userImage" alt="" />
            </div>
            <!-- from -->
            <el-form
                class="login-form"
                :model="loginForm"
                :rules="loginFormRules"
                ref="loginFormRef"
            >
                <el-form-item prop="username">
                    <el-input
                        prefix-icon="iconfont icon-nickname"
                        v-model="loginForm.username"
                    ></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input
                        type="password"
                        prefix-icon="iconfont icon-kidslock"
                        v-model="loginForm.password"
                    ></el-input>
                </el-form-item>

                <el-form-item style="text-align: center;">
                    <el-button type="primary" @click="login" style="width:61%"
                        >登录</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import valid from '@/assets/js/valid';
export default {
    data() {
        const validUserName = (rule, value, callback) => {
            const validName = valid.isSpecial(value);
            console.log(validName);
            if (!validName) callback('用户名格式错误');
            const user = [
                {
                    uid: '0',
                    username: 'admin',
                    userImage: '//inews.gtimg.com/newsapp_bt/0/9158126933/640'
                },
                {
                    uid: '1',
                    username: 'admin1',
                    userImage: '//inews.gtimg.com/newsapp_bt/0/9158127474/640'
                }
            ];

            const item = user.filter(item => {
                return item.username === value;
            });
            console.log('item', item[0]);

            if (item.length) {
                this.userImage = item[0].userImage;

                callback();
            } else {
                this.userImage =
                    '//inews.gtimg.com/newsapp_bt/0/9158126787/640';
                callback('用户不存在');
            }
        };
        return {
            userImage: '//inews.gtimg.com/newsapp_bt/0/9158126933/640',
            // 登录数据
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            // 登录数据 验证
            loginFormRules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        validator: validUserName,
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
                ]
            }
        };
    },
    methods: {
        //重置console.log(this)
        resetLoginForm() {
            // console.log(this);
            this.$refs.loginFormRef.resetFields();
            (this.username == this.password) == '';
        },

        //登录
        login() {
            this.$refs.loginFormRef.validate(async valid => {
                console.log('valid', valid);
                //判断表单是否正确
                if (!valid) return;

                // 发送login请求 并解构赋值
                console.log(this.loginForm);
                const { data: res } = await this.$api.user.login(
                    this.loginForm
                );

                console.log(res);

                // 根据状态码 判断登录成功与否
                if (res.meta.status != 200)
                    return this.$message.error('登录失败：' + res.meta.msg);

                this.$message.success('登录成功');
                window.sessionStorage.setItem('token', res.data.token);
                this.$router.push('/');
            });
        }
    }
};
</script>
