<template>
    <div class="rights-list-content mt-2">
        <!-- 列表 -->
        <el-table :data="rightsList" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="权限名称" prop="authName"></el-table-column>
            <el-table-column label="路径" prop="path"></el-table-column>
            <el-table-column label="权限等级" prop="level">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                    <el-tag type="success" v-else-if="scope.row.level === '1'"
                        >二级</el-tag
                    >
                    <el-tag type="warning" v-else>三级</el-tag>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rightsList: []
        };
    },
    mounted() {
        this.getRightsList();
    },
    methods: {
        async getRightsList() {
            const { data: res } = await this.$api.right.getList('list');
            console.log(res);
            if (res.meta.status !== 200)
                return this.$message.error('获取权限列表失败：' + res.meta.msg);

            this.rightsList = res.data;
        }
    }
};
</script>
