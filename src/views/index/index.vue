<template>
    <div>index</div>
</template>

<script>
export default {
    data() {
        return {};
    },
    created() {
        const lg = this.$api.user.login('111', 'aaa');
        console.log(lg);
    }
};
</script>
