<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>




        <div class="handle-box">
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-select v-model="select_cate" placeholder="筛选群组" class="handle-select mr10">
                <el-option key="1" label="群组1" value="群组1"></el-option>
                <el-option key="2" label="群组2" value="群组2"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="id" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
            <el-button style="float: right" type="default" icon="el-icon-plus" @click="search">新建</el-button>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="设备ID" sortable width="150">
            </el-table-column>
            <el-table-column prop="name" label="设备名称" width="120">
            </el-table-column>
            <el-table-column prop="describe" label="备注" width="120">
            </el-table-column>
            <el-table-column prop="location.describe" label="地址" width="120">
            </el-table-column>
            <el-table-column label="操作" :formatter="formatter">
                <template scope="scope" align="right">
                    <el-button size="small" type="primary"
                               @click="handleEdit(scope.$index, scope.row)">状态</el-button>
                    <el-button size="small"
                               @click="dialogFormVisible = true">编辑</el-button>
                    <el-button size="small" type="danger"
                               @click="closeDialogVisible(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>



        <el-dialog   title="编辑" :visible.sync="dialogFormVisible" >
            <el-form :model="form" style="width:70%">
                <el-form-item label="id"  :label-width="formLabelWidth">
                    <el-input v-model="form.id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="前缀" :label-width="formLabelWidth">
                    <el-input v-model="form.prefix" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item  label="分组" :lable-width="formLabelWidth" >
                    <el-select v-model="form.grope" auto-complete="off"></el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog

                title="提示"
                :visible.sync="is_delete"
                width="30%"
                :before-close="handleClose">
            <div>您确定删除  {{delete_messgae}}  吗？</div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="is_delete = false">取 消</el-button>
    <el-button type="primary" @click="deleteConfirm()" >确 定</el-button>
  </span>
        </el-dialog>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>
    </div>


</template>


<script>


    import ElSelectDropdown from "element-ui/packages/select/src/select-dropdown";
    export default {
        components: {ElSelectDropdown},
        data() {
            return {
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '50%',
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                delete_messgae:{},
                is_delete:false,
                delete_id:'',
                scope:[]

            }
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(d){
                    return d;
                })
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                self.url = '/api/user/getAllDevices/0/10';
                self.$axios.get(self.url).then((res) => {
                    console.log(res.data.data.data);
                    self.tableData = res.data.data.data;
                })
            },
            search(){
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
                console.log(row);
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            closeDialogVisible(scope){
                let row=scope.row;
                this.delete_messgae=row.name;
                this.is_delete=true;
                this.delete_id=row.id;
            },
            deleteConfirm(){
                let self = this;
                console.log(self.delete_id);
                self.url = '/api/user/delete/'+self.delete_id;
                this.is_delete=false;
                this.$message({
                    showClose: true,
                    message: '成功删除设备:'+self.delete_id,
                    type: 'success'
                });
                self.$axios.delete(self.url).then((res) => {
                    this.tableData.splice(this.scope.index, 1);
                })
            },
            createADevice(){

            }
        }
    }
</script>

<style scoped>
    .handle-box{
        margin-bottom: 20px;
    }
    .handle-select{
        width: 120px;
    }
    .handle-input{
        width: 300px;
        display: inline-block;
    }
</style>