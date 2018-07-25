<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 日志</el-breadcrumb-item>
                <el-breadcrumb-item>设备日志记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="日期">
            </el-table-column>
            <el-table-column prop="deviceId" label="设备">
            </el-table-column>
            <el-table-column prop="event" label="事件">
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="this.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {
        getAllLog
    } from '@/api/device'
    export default {
        name: "AllLog",
        data () {
            return {
                tableData:[],
                cur_page: 0,
                page_size:10,
                total:0
            }
        },
        mounted() {
            this.getLog();
        },
        methods: {
            handleCurrentChange(val) {
                this.cur_page = val - 1;
                this.getLog();
            },
            getLog(){
                getAllLog(this.cur_page,this.page_size).then((res) => {
                    this.total = res.data.totalElements;
                    this.tableData = res.data.data;
                })
            }
        }
    }
</script>

<style scoped>
    
</style>