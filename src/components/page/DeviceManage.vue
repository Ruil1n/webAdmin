<template>
    <div class="table">

        <!-- TODO:需要修改 -->
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
            <el-button style="float: right" type="default" icon="el-icon-plus" @click="dialogCreateFormVisible = true">新建</el-button>
        </div>

        <!-- 显示设备 -->
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
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
                        <!-- TODO:调用方法名称建议修改 -->
                        <el-button size="small" type="primary"
                                   @click="handleEdit(scope.$index, scope.row)">状态</el-button>
                        <!-- TODO:此处应该调用方法先获取当前选择设备的信息 -->
                        <el-button size="small"
                                   @click="dialogEditFormVisible = true">编辑</el-button>
                        <el-button size="small" type="danger"
                                   @click="closeDelDialogVisible(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <!-- TODO:编辑设备 -->
        <el-dialog  title="编辑" :visible.sync="dialogEditFormVisible" >
            <el-form :model="editForm" style="width:70%">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="前缀" :label-width="formLabelWidth">
                    <el-input v-model="editForm.prefix" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="editForm.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item  label="分组" :lable-width="formLabelWidth" >
                    <el-select v-model="editForm.groups" auto-complete="off"></el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogEditFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 新建设备 -->
        <!-- TODO:居中问题需要解决 -->
        <el-dialog  title="新建" :visible.sync="dialogCreateFormVisible" >
            <el-form :model="createForm" style="width:70%">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="createForm.deviceName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="createForm.deviceDescribe" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="前缀" :label-width="formLabelWidth">
                    <el-input v-model="createForm.deviceNamePrefix" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="createForm.locationDescribe" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item  label="分组" :lable-width="formLabelWidth">
                    <el-select v-model="createForm.groupId" auto-complete="off">
                        <el-option
                            v-for="item in this.groups"
                            :key="item.id"
                            :label="item.comment"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCreateFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="createDevice()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 删除确认 -->
        <el-dialog
                title="提示"
                :visible.sync="is_delete"
                width="30%">
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
                    :total="total">
            </el-pagination>
        </div>
    </div>


</template>


<script>
    import ElSelectDropdown from "element-ui/packages/select/src/select-dropdown";
    import {getAllDevices, createADevice, delADevice} from "@/api/user/device"
    import {getAllGroups} from "@/api/user/group"
    export default {
        components: {
            ElSelectDropdown
        },
        data() {
            return {
                dialogTableVisible: false,
                dialogEditFormVisible: false,
                dialogCreateFormVisible: false,
                createForm: {
                    deviceDescribe: '',
                    deviceName: '',
                    deviceNamePrefix: '',
                    // 经度纬度先确定 后期可以考虑获取方法
                    latitude :"N39°54′6.74″",
                    longitude : "E116°23′29.52″",
                    locationDescribe: '',
                    groupId:''
                },
                editForm: {
                    // 类似上面 我还没看接口需要什么数据
                },
                groups:[],
                formLabelWidth: '50%',
                tableData: [],
                cur_page: 0,
                page_size:10,
                total:0,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                is_delete: false,
                delete_messgae: {},
                delete_id: '',
                scope: []
    
            }
        },
        created() {
            this.getData();
            this.fetchAllGroups();
        },
        methods: {
            handleCurrentChange(val) {
                this.cur_page = val - 1;
                this.getData();
            },
            getData() {
                getAllDevices(this.cur_page,this.page_size).then((res) => {
                    this.total = res.data.totalElements
                    this.tableData = res.data.data;
                })
            },
            fetchAllGroups() {
                getAllGroups().then((res) => {
                    this.groups=res.data
                })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第' + (index + 1) + '行');
            },
            handleDelete(index, row) {
                this.$message.error('删除第' + (index + 1) + '行');
            },
            delAll() {
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                    delADevice(self.multipleSelection[i].id)
                }
                this.getData();
                self.$message.error('删除了' + str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            closeDelDialogVisible(scope) {
                let row = scope.row;
                this.delete_messgae = row.name;
                this.is_delete = true;
                this.delete_id = row.id;
            },
            deleteConfirm() {
                delADevice(this.delete_id).then((res) => {
                    this.$message({
                    showClose: true,
                    message: '成功删除设备ID:' + this.delete_id,
                    type: 'success'
                    });
                    this.getData();
                    this.is_delete = false;
                })
            },
            createDevice() {
                this.$confirm('确认新建设备？')
                    .then(_ => {
                        createADevice(this.createForm).then((res) => {
                            this.getData();
                        })
                        this.getData();
                        this.dialogCreateFormVisible = false;
                        this.$message({
                            showClose: true,
                            message: '新建设备成功！',
                            type: 'success'
                        });
                    })
                    .catch(_ => {});
            }
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
    
    .handle-select {
        width: 120px;
    }
    
    .handle-input {
        width: 300px;
        display: inline-block;
    }
</style>