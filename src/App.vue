<template lang="pug">
  #app
    HeaderLayout
    .container(class="mx-auto my-4 flex flex-col gap-6 relative min-h-[1200px] px-8")
      .column-selector.mb-4
        el-checkbox-group(v-model="selectedColumns")
          el-checkbox(
            v-for="column in availableColumns"
            :key="column.prop"
            :label="column.prop"
            :disabled="['no', 'name', 'author', 'tags', 'wordCount', 'completed'].includes(column.prop)"
          ) {{ column.label }}
      el-table(
        ref="dataTable"
        :data="caitviList"
        border
        stripe
        style="width: max-content; table-layout: fixed;"
      )
        el-table-column(
          v-if="selectedColumns.includes('no')"
          prop="no"
          label=""
          width="46"
        )
          template(#default="scope")
            span(class="whitespace-nowrap") {{ scope.row.no }}
        el-table-column(
          v-if="selectedColumns.includes('name')"
          prop="name"
          label="名稱"
          width="200"
        )
          template(#default="scope")
            span(
              class="cursor-pointer hover:text-blue-400 font-bold"
              @click="openUrl(scope.row.url)"
            ) {{ scope.row.name }}
        el-table-column(
          v-if="selectedColumns.includes('author')"
          prop="author"
          label="作者"
          width="100"
          :filter-method="(value, row) => filterByEqual(value, row, 'author')"
          :filters="authorFilters"
        )
        el-table-column(
          v-if="selectedColumns.includes('chapters')"
          label="章節"
          width="80"
        )
          template(#default="scope")
            span {{ scope.row.completedChapters }} / {{ scope.row.allChapters }}
        el-table-column(
          v-if="selectedColumns.includes('wordCount')"
          prop="wordCount"
          label="字數"
          width="100"
          :filter-method="filterWordCount"
          :filters="wordCountFilters"
        )
        el-table-column(
          v-if="selectedColumns.includes('completed')"
          prop="completed"
          label="狀態"
          width="100"
          :filter-method="(value, row) => filterByEqual(value, row, 'completed')"
          :filters="[{ text: CONST_COMMON.completedStatus.COMPLETED, value: 'COMPLETED' }, { text: CONST_COMMON.completedStatus.WORK_IN_PROGRESS, value: 'WORK_IN_PROGRESS' }, { text: CONST_COMMON.completedStatus.ONE_SHOT, value: 'ONE_SHOT'}, { text: CONST_COMMON.completedStatus.DISCONTINUED, value: 'DISCONTINUED'}]"
        )
          template(#default="scope")
            el-tag(effect="dark" :type="getCompletedStatusColor(scope.row.completed)" class="rounded-full") {{ CONST_COMMON.completedStatus[scope.row.completed] }}
        el-table-column(
          v-if="selectedColumns.includes('lastUpdated')"
          prop="lastUpdated"
          label="最後一次更新"
          width="120"
        )
        el-table-column(
          v-if="selectedColumns.includes('tags')"
          prop="tags"
          label="標籤"
          width="200"
          :filters="tagList.map(tag => ({ text: tag.name, value: tag.name }))"
          :filter-method="filterTags"
        )
          template(#default="scope")
            .flex.flex-wrap.gap-2(v-if="scope.row.tags.length > 0")
              el-tooltip(
                v-for="tag, index in scope.row.tags"
                :key="index"
                :content="tag.name"
                effect="dark"
                placement="top"
              )
                el-tag(
                  :color="tag.color"
                  :effect="tag.effect"
                  class="rounded-full"
                ) {{ tag.name }}
        el-table-column(
          v-if="selectedColumns.includes('read')"
          label="閱讀"
          width="100"
          :filter-method="(value, row) => filterByEqual(value, row, 'read')"
          :filters="[{ text: CONST_COMMON.readStatus.READ, value: 'READ' }, { text: CONST_COMMON.readStatus.UNREAD, value: 'UNREAD' }, { text: CONST_COMMON.readStatus.DROPPED, value: 'DROPPED'}]"
        )
          template(#default="scope")
            el-tag(effect="dark" :type="getReadStatusColor(scope.row.read)") {{ CONST_COMMON.readStatus[scope.row.read] }}
        el-table-column(
          v-if="selectedColumns.includes('rate')"
          prop="rate"
          label="評分"
          width="120"
        )
          template(#default="scope")
            el-rate(v-model="scope.row.rate" disabled)
        el-table-column(
          v-if="selectedColumns.includes('storySetting')"
          prop="storySetting"
          label="簡介/心得"
          width="400"
        )
        el-table-column(
          v-if="selectedColumns.includes('hotChapters')"
          prop="hotChapters"
          label="hot"
          width="100"
        )
    FooterLayout
</template>

<script>
import { getList } from './api/common';
import { CONST_COMMON } from './constants/common'
export default {
  name: 'App',
  components: {
    HeaderLayout: () => import('./components/HeaderLayout.vue'),
    FooterLayout: () => import('./components/FooterLayout.vue'),
  },
  data() {
    return {
      CONST_COMMON,
      caitviList: [],
      tagColorList: [
        // 藍色系
        { color: '#143D60', effect: 'dark' },
        { color: '#153243', effect: 'dark' },
        { color: '#041E2B', effect: 'dark' },
        { color: '#315A75', effect: 'dark' },
        { color: '#5E96BF', effect: 'plain' },
        { color: '#5EB1BF', effect: 'plain' },
        { color: '#CDEDF6', effect: 'plain' },

        // 綠色系
        { color: '#042A2B', effect: 'dark' },
        { color: '#27667B', effect: 'dark' },
        { color: '#316E75', effect: 'dark' },
        { color: '#A0C878', effect: 'plain' },
        { color: '#DDEB9D', effect: 'plain' },

        // 紅色系
        { color: '#9F3D60', effect: 'dark' },
        { color: '#B96A7C', effect: 'dark' },
        { color: '#D84727', effect: 'dark' },
        { color: '#EF7B45', effect: 'plain' },

        // 灰色系
        { color: '#657577', effect: 'dark' },
        { color: '#8EA2A6', effect: 'plain' },
        { color: '#B4B8AB', effect: 'plain' }
      ],
      availableColumns: [
        { prop: 'no', label: '編號' },
        { prop: 'name', label: '名稱' },
        { prop: 'author', label: '作者' },
        { prop: 'chapters', label: '章節' },
        { prop: 'wordCount', label: '字數' },
        { prop: 'completed', label: '狀態' },
        { prop: 'lastUpdated', label: '最後一次更新' },
        { prop: 'read', label: '閱讀' },
        { prop: 'rate', label: '評分' },
        { prop: 'storySetting', label: '簡介/心得' },
        { prop: 'tags', label: '標籤' },
        { prop: 'hotChapters', label: 'hot' },
      ],
      selectedColumns: [
        'no',
        'name',
        'author',
        'chapters',
        'wordCount',
        'completed',
        'storySetting',
        'tags',
      ],
      wordCountFilters: [
        { text: '<5,000', value: '0-5000' },
        { text: '5,001~10,000', value: '5001-10000' },
        { text: '10,001~50,000', value: '10001-50000' },
        { text: '50,001~100,000', value: '50001-100000' },
        { text: '100,001~150,000', value: '100001-150000' },
        { text: '150,001~200,000', value: '150001-200000' },
        { text: '>200,000', value: '200001-' }
      ],
      tagList: [],
    }
  },
  computed: {
    authorFilters() {
      const uniqueAuthors = [...new Set(this.caitviList.map(item => item.author))]
        .filter(author => author)
        .sort();
      
      return uniqueAuthors.map(author => ({
        text: author,
        value: author
      }));
    },
  },
  mounted() {
    this.initList();
    const savedColumns = localStorage.getItem('selectedColumns');
    if (savedColumns) {
      const parsedColumns = JSON.parse(savedColumns);
      const requiredColumns = ['no', 'name', 'author'];
      this.selectedColumns = [
        ...new Set([...requiredColumns, ...parsedColumns])
      ];
      this.refreshTable();
    }
  },
  watch: {
    selectedColumns: {
      handler(newColumns) {
        localStorage.setItem('selectedColumns', JSON.stringify(newColumns));
      },
      deep: true
    }
  },
  methods: {
    async initList() {
      const data = await getList();
      this.caitviList = data
        .filter(item => item.no && item.name && item.url)
        .map(item => ({
          ...item,
          rate: Number(item.rate) || 0
        }));
      const allTags = this.caitviList
        .map(item => item.tags)
        .filter(tags => tags)
        .flatMap(tags => tags.split(','))
        .map(tag => tag.trim())
        .filter(tag => tag);
     
      const uniqueTags = [...new Set(allTags)]
        .sort((a, b) => {
          const isAPartOf = a.startsWith('Part of');
          const isBPartOf = b.startsWith('Part of');

          if (isAPartOf && !isBPartOf) return 1;
          if (!isAPartOf && isBPartOf) return -1;

          return a.localeCompare(b);
        });
     
      this.tagList = uniqueTags.map((tag, index) => {
        const colorInfo = this.tagColorList[index % this.tagColorList.length];
        return {
          name: tag,
          color: colorInfo.color,
          effect: colorInfo.effect
        };
      });

      this.caitviList = this.caitviList.map(item => ({
       ...item,
       tags: item.tags
         ? item.tags
             .split(',')
             .map(tag => tag.trim())
             .filter(tag => tag)
             .map(tag => this.tagList.find(t => t.name === tag))
         : []
      }));
    },
    openUrl(url) {
      window.open(url, '_blank');
    },
    getReadStatusColor(read) {
      const upperRead = String(read).toUpperCase();
      switch (upperRead) {
        case 'READ':
          return 'success';
        case 'UNREAD':
          return 'info';
        case 'DROPPED':
          return 'danger';
        case 'READING':
          return 'warning';
      }
    },
    getCompletedStatusColor(completed) {
      const upperCompleted = String(completed).toUpperCase();
      switch (upperCompleted) {
        case 'COMPLETED':
          return 'success';
        case 'WORK_IN_PROGRESS':
          return 'warning';
        case 'DISCONTINUED':
          return 'danger';
        case 'ONE_SHOT':
          return '';
        case 'STATUS_UNKNOWN':
          return 'info';
      }
    },
    // 通用的篩選方法(作者、狀態、閱讀)
    filterByEqual(value, row, prop) {
      return row[prop] === value;
    },
    // 字數篩選
    filterWordCount(value, row) {
      const wordCount = Number(row.wordCount.replace(/,/g, '')) || 0;
      const [min, max] = value.split('-').map(Number);
      if (max) {
        return wordCount >= min && wordCount <= max;
      } else {
        return wordCount > min;
      }
    },
    // 標籤篩選
    filterTags(value, row) {
      return row.tags.some(tag => tag.name === value);
    },
    refreshTable() {
      this.$nextTick(() => {
        if (this.$refs.dataTable) {
          this.$refs.dataTable.doLayout();
          this.$refs.dataTable.store.updateColumns();
          this.$refs.dataTable.store.updateAllSelected();
        }
      });
    }
  }
}
</script>

<style scoped>
#app {
  height: 100vh;
  height: 100dvh;
}
::v-deep .el-rate__icon {
  margin-right: 0;
}
.el-tag {
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-tag--dark {
  border-color: transparent;
}
.el-tag--plain {
  border-color: transparent;
  color: #000;
}
@media screen and (max-width: 1024px) {
  .el-table {
    font-size: 12px;
  }
}
</style>
