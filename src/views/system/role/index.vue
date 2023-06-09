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
          @click="handleAdd"
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

    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form label-width="100px" :model="form" ref="form"  :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input placeholder="请输入角色名称" v-model="form.roleName"/>
        </el-form-item>
        <el-form-item  prop="roleKey">
          <span slot="label">
            <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
            权限字符
          </span>
          <el-input placeholder="请输入权限字符" v-model="form.roleKey"/>
        </el-form-item>
        <el-form-item label="角色顺序" prop="roleSort">
          <el-input-number controls-position="right" :min="0" v-model="form.roleSort"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio>正常</el-radio>
            <el-radio>停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">展开/折叠</el-checkbox>
          <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event,'menu')">全选/全不选</el-checkbox>
          <el-checkbox v-model="menuCheckStrictly" @change="handleCheckedTreeConnect($event,'menu')">父子联动</el-checkbox>
          <el-tree
            :data="menuOptions"
            show-checkbox
            class="tree-border"
            empty-text="加载中，请稍候"
            :props="defaultProps"
            ref="menu"
            node-key="id"
            :check-strictly="!menuCheckStrictly"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" placeholder="请输入内容" v-model="form.remark"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, treeselect as menuTreeselect } from '@/api/system'

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
      total: 0,
      title: '',
      open: false,
      form: {},
      rules: {
        roleName: [
          {required: true, message: '角色名称不能为空', trigger: 'blur'}
        ],
        roleKey: [
          {required: true, message: '权限字符不能为空', trigger: 'blur'}
        ],
        roleSort: [
          {required: true, message: '角色排序不能为空', trigger: 'blur'}
        ]
      },
      menuOptions: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      menuExpand: false,
      menuNodeAll: false,
      menuCheckStrictly: false
    }
  },
  created() {
    this.getRoleListFn()
  },
  methods: {
    handleUpdate () {},
    async getRoleListFn() {
      const params = this.addDateRange(this.queryParams, this.dateRange)
      const {data: {rows, total}} = await getRoleList(params)

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
      this.dateRange = []
      this.resetForm('roleForm')
      this.queryParams.pageNum = 1
      this.getRoleListFn()
    },
    handleAdd () {
      this.open = true
      this.title = '添加角色'

      this.$nextTick(() => this.resetForm('form'))

      this.getMenuTreeselect()
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if(valid) {
          console.log('gogo', this.form)
        }
      })
    },
    cancel() {
      this.open = false
      this.resetForm('form')
    },
    async getMenuTreeselect () {
      const {data: {data}} = await menuTreeselect()

      this.menuOptions = data
    },
    handleCheckedTreeExpand (val, type) {
      if (type === 'menu') {
        let treeList = this.menuOptions

        for (let i = 0; i < treeList.length; i++) {
          this.$refs.menu.store.nodesMap[treeList[i].id].expanded = val
        }
      }
    },
    handleCheckedTreeNodeAll (val, type) {
      if (type === 'menu') {
        this.$refs.menu.setCheckedNodes(val ? this.menuOptions: [])
      }
    },
    handleCheckedTreeConnect (val, type) {
      if (type === 'menu') {
        this.menuCheckStrictly = val
      }
    }
  }
}
</script>

<style lang="scss">
.tree-border {
  border: 1px solid #e5e6e7;
  background: #fff;
  border-radius: 4px;
}
</style>
