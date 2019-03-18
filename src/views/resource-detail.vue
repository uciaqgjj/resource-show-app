<template>
  <div class="resource-detail-wrapper">
    <div class="title">
      <h3>{{docObj.docTitle}}</h3>
    </div>
    <div class="content" v-html="docObj.docHtmlContent"></div>
    <div class="bottom-panel">
      <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>

<script>
import api from "@/api/resourceApi"

export default {
  name: 'ResourceDetail',
  data () {
    return {
      docObj: {}
    }
  },
  methods: {

  },
  mounted () {
    const routeParams = this.$route.params || {}
    api.fetchResourceContent(routeParams.resourceId).then(resp => {
      this.docObj = resp
    })
  }
}
</script>

<style lang="scss" scoped>
.resource-detail-wrapper {
  padding: 16px;
}
.bottom-panel {
  padding: 16px 0;
  text-align: center;
}
</style>

