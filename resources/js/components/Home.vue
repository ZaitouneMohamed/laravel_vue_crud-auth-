<template>
    <div>
        <h1>{{ itemId }}</h1>
    </div>
</template>

<script>
export default {
    computed: {
        itemId() {
            return this.$route.params.id;
        },
    },
};
</script>
