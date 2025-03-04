<template lang="pug">
  #app
    HeaderLayout
    .container(class="w-[1400px] mx-auto my-4 flex flex-col gap-6 relative min-h-[1200px]")
      el-table(
        :data="caitviList"
        height="1500px"
        border
        stripe
        class="w-full"
      )
        el-table-column(prop="no" label="" width="40px")
        el-table-column(prop="name" label="名稱" width="200px")
          template(#default="scope")
            span(class="cursor-pointer hover:text-blue-500 font-bold" @click="openUrl(scope.row.url)") {{ scope.row.name }}
        el-table-column(prop="author" label="作者" width="100px")
        el-table-column(label="章節" width="100px")
          template(#default="scope")
            span {{ scope.row.completedChapters }} / {{ scope.row.allChapters }}
        el-table-column(prop="lastUpdated" label="最後一次更新" width="100px")
        el-table-column(prop="wordCount" label="字數" width="100px")
        el-table-column(prop="completed" label="狀態" width="100px")
        el-table-column(label="閱讀" width="100px")
          template(#default="scope")
            el-tag(effect="dark" :type="getReadStatusColor(scope.row.read)") {{ CONST_COMMON.readStatus[scope.row.read] }}
        el-table-column(prop="rate" label="評分" width="100px")
        el-table-column(prop="comments" label="簡介/心得" width="200px")
        el-table-column(prop="tags" label="標籤" width="200px")
        el-table-column(prop="hotChapters" label="hot" width="100px")
    FooterLayout
</template>

<script>
import { getList } from './api/friendCodes';
import { CONST_COMMON } from './constants/common'
import HeaderLayout from './components/HeaderLayout.vue'
import FooterLayout from './components/FooterLayout.vue'
export default {
  name: 'App',
  components: {
    HeaderLayout,
    FooterLayout,
  },
  data() {
    return {
      CONST_COMMON,
      caitviList: []
    }
  },
  mounted() {
    this.initList();
  },
  watch: {
    
  },
  methods: {
    async initList() {
      const data = await getList();
      this.caitviList = data;
      console.log('caitviList', this.caitviList);
    },
    openUrl(url) {
      window.open(url, '_blank');
    },
    getReadStatusColor(read) {
      console.log('read', read);
      const upperRead = String(read).toUpperCase();
      switch (upperRead) {
        case 'READ':
          return 'success';
        case 'UNREAD':
          return 'info';
      }
    }
  }
}
</script>

<style>
.code-input .el-textarea__inner {
  height: 120px;
}
</style>
