<style lang="scss" scope>
</style>
<template>
    <img :src="src" :width="width" :height="height?height:width">
</template>
<script>
import {
    icons
} from 'common/js/icons.js';
const iconMap = M.indexBy(icons.tool, "name");
export default {
    name: "image-icon",
    data() {
        return {
            iconMap: iconMap,
        }
    },
    props: {
        name: null,
        width: null,
        height: null,
    },
    computed: {
        src() {
            return iconMap[this.name]['value'];
        }
    }

}
</script>
