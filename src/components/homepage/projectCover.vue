<template>
  <div id="project-cover">
    <div style="margin-left: 10px; margin-top: 15px; width: 450px">
      {{projectName}}
    </div>
    <div style="float: right; margin-top: 16px">
      <el-popover
          placement="right"
          width="200"
          trigger="hover">
        <el-button size="small" plain @click="newProjectNameDialogVisible = true">修改名称</el-button>
        <el-button size="small" type="danger" plain @click="deleteProjectDialogVisible = true">删除项目</el-button>
        <i class="el-icon-more" slot="reference"></i>
      </el-popover>
    </div>

    <el-dialog
        title="修改项目名称"
        :visible.sync="newProjectNameDialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form :model="newProjectNameForm" :rules="newProjectNameRules" ref="newProjectNameForm" label-width="100px">
        <el-form-item label="项目名称" prop="newProjectName">
          <el-input
              maxlength="10"
              show-word-limit
              :rows="1"
              v-model="newProjectNameForm.newProjectName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newProjectNameDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newProjectNameDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="删除项目"
        :visible.sync="deleteProjectDialogVisible"
        width="30%"
        :before-close="handleClose">
      <span>确认删除项目xxx?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="deleteProjectDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteProjectDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "projectCover",
  data(){
    return{
      newProjectNameDialogVisible: false,
      newProjectNameForm: {
        newProjectName: '',
      },
      newProjectNameRules: {
        newProjectName: [
          {required: true, message: '请输入项目名称', trigger: 'blur'}
        ],
      },
      deleteProjectDialogVisible: false,
    }
  },
  methods: {
    handleClose() {
      console.log('projectClose')
    }
  },
  props:{
    projectName:{default:'项目名称'}
  },
}
</script>

<style>
#project-cover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 20px;
  width: 500px;
  height: 50px;
  display: flex;
  flex-direction: row;
  text-align: left;
  cursor: pointer;
}
#project-cover:hover {
  border: solid 2px deepskyblue;
}
</style>
