<template>
  <div class="app-container">
    <el-form :inline="true" ref="roleForm" :rules="rules" :model="queryParams">
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="queryParams.roleName"
          placeholder="请输入角色名称"
          size="small"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="权限字符" prop="roleKey">
        <el-input
          v-model="queryParams.roleKey"
          placeholder="请输入权限字符"
          size="small"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          size="small"
          style="width: 240px">
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          type="daterange"
          range-separator="-"
          value-format="yyyy-MM-dd"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="searchFn">搜索</el-button>
        <el-button size="mini" @click="resetFn">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10">
      <el-col :span="1.5">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-plus"
          plain
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          size="mini"
          icon="el-icon-edit"
          plain
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete"
          plain
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          size="mini"
          icon="el-icon-download"
          plain
        >导出</el-button>
      </el-col>

      <RightToolBar></RightToolBar>
    </el-row>

    <el-table class="table-list" :data="roleList">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="角色编号" prop="roleId" width="120"></el-table-column>
      <el-table-column label="角色名称" prop="roleName" width="150"></el-table-column>
      <el-table-column label="权限字符" prop="roleKey" width="150"></el-table-column>
      <el-table-column label="显示顺序" prop="roleSort" width="100"></el-table-column>
      <el-table-column label="状态" width="100" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180" prop="createTime"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >
            修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
          >
            删除
          </el-button>
          <el-dropdown
            size="mini"
            type="text"
            icon="el-icon-edit"
          >
            <span class="el-dropdown-link">
              <i class="el-icon-d-arrow-right"></i>更多
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-circle-check">数据权限</el-dropdown-item>
              <el-dropdown-item icon="el-icon-user">分配用户</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[3, 5, 10]"
      :page-size="10"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import { getRoleList } from '@/api/system'

export default {
  data () {
    return {
      dateRange: [],
      queryParams: {
        roleName: undefined,
        roleKey: undefined,
        status: undefined,
        pageNum: 1,
        pageSize: 10
      },
      roleList: [],
      rules: {
        roleName: [],
        roleKey: [],
        status: []
      },
      total: 0
    }
  },
  created() {
    this.getRoleListFn()
  },
  methods: {
    handleUpdate () {},
    async getRoleListFn() {
      const {data: {rows, total}} = await getRoleList(this.queryParams)

      this.roleList = rows
      this.total = total
    },
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.getRoleListFn()
    },
    handleCurrentChange(val) {
      this.queryParams.pageNum = val
      this.getRoleListFn()
    },
    searchFn() {
      this.queryParams.pageNum = 1
      this.getRoleListFn()
    },
    resetFn() {
      this.resetForm('roleForm')
      this.queryParams.pageNum = 1
      this.getRoleListFn()
    }
  }
}
</script>

<style>

</style>
