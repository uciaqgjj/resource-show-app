<template>
  <div class="resource-list-wrapper">
    <div class="top-panel">
      <el-select v-model="resourceType" slot="prepend" placeholder="请选择" title="资源库类型">
        <el-option
          v-for="item in resourceTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input placeholder="请输入内容" v-model="searchTerm" style="margin-left: 16px;">
        <el-button slot="append" icon="el-icon-search" @click="doReFetchCorpusResourceList"></el-button>
      </el-input>
    </div>
    <div class="data-panel">
      <el-table :data="corpusResourceList" style="width: 100%" @row-dblclick="onTableDbClick">
        <el-table-column label="发布时间" width="120">
          <template slot-scope="scope">{{scope.row.docPublishTime | dateTime}}</template>
        </el-table-column>
        <el-table-column prop="docTitle" label="标题"></el-table-column>
        <el-table-column prop="docSourceName" label="来源"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <i class="el-icon-document view-btn" @click="onToLabelCorpusClick(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom-panel">
      <el-pagination
        background
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="corpusResourceCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import api from "@/api/resourceApi";
import dateUtil from "element-ui/src/utils/date";

export default {
  filters: {
    dateTime(date, format = "yyyy-MM-dd") {
      if (!date && date != 0) {
        return "";
      }
      return dateUtil.format(date, format);
    }
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      corpusResourceCount: 0,
      corpusResourceList: [],
      resourceTypeList: [
        { value: "", label: "全部" },
        { value: "ywyz", label: "原文原著" },
        { value: "hd", label: "活动" },
        { value: "lszb", label: "论述摘编" }
      ],
      resourceType: "",
      searchTerm: ""
    };
  },
  methods: {
    handleSizeChange() {
      this.doReFetchCorpusResourceList();
    },
    handleCurrentChange() {
      this.doReFetchCorpusResourceList();
    },
    onTableDbClick(rowObj) {
      this.toDetail(rowObj.docId);
    },
    doReFetchCorpusResourceList() {
      api
        .fetchResourceList({
          docChannel: this.resourceType,
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          queryParam: this.searchTerm
        })
        .then(
          resp => {
            this.corpusResourceCount = resp.recordsTotal;
            this.corpusResourceList = resp.data;
          },
          () => {
            this.$message.warning("请求出错");
          }
        );
    },
    onToLabelCorpusClick(rowObj) {
      this.toDetail(rowObj.docId);
    },
    toDetail(resourceId) {
      this.$router.push({
        name: "resource-detail",
        params: { resourceId: resourceId }
      });
    }
  },
  mounted() {
    this.doReFetchCorpusResourceList();
  }
};
</script>

<style lang="scss" scoped>
.top-panel {
  padding: 16px;
  display: flex;
}
.bottom-panel {
  padding: 16px 0;
}
</style>
<style lang="scss">
.resource-list-wrapper {
  .view-btn {
    cursor: pointer;
    &::hover {
      opacity: 0.6;
    }
  }
}
</style>


