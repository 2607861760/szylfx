import {apiUrl} from '@/common/js/Base.js'
// 登录api方法集
export const task = {
    /**
     * [task  任务管理]
     * @param  {[type]} param [cookie]
     * @return {[type]}   list
     */
    getTaskList (obj) {
        return $ajax.post(apiUrl.apiUrl+'job/getJobList',obj).then(function(res){
                return Promise.resolve(res.data)
            })
    },
    /**
     * [task  任务管理-根据具体的任务获得而对应数据]
     * @param  {[type]} param [cookie]
     * @return {[type]}   obj
     */
    getTaskInfoById (obj) {
        return $ajax.post(apiUrl.apiUrl+'workflow/getJobProgressInfoById',obj).then(function(res){
                return Promise.resolve(res.data)
            })
    },
    /**
     * [task  任务管理-编辑任务]
     * @param  {"idList":["870f5aecdd8e4ae5b422bb5601a49dea"]}任务id
     * @return true/fasle
     */
    mergeJobById (obj) {
        return $ajax.post(apiUrl.apiUrl+'job/deleteJobById',obj).then(function(res){
                return Promise.resolve(res.data)
            })
    },
    /**
     * [task  任务管理-终止任务]
     * @param  {"idList":["870f5aecdd8e4ae5b422bb5601a49dea"]}任务id
     * @return true/fasle
     */
    mergeStopJob (obj) {
        return $ajax.post(apiUrl.apiUrl+'job/stopJob',obj).then(function(res){
                return Promise.resolve(res.data)
            })
    },
    /**
     * [task  任务管理-变异位点可视化]
     * @param  obj = {"path":"","jobid":""}
     * @return list
     */
    getJobRowse (obj) {
        return $ajax.post(apiUrl.apiUrl+'jbrowse/jbrowse',obj).then(function(res){
                return Promise.resolve(res.data)
            })
    },
    /**
     * [task  任务管理-新建任务-获取样本批次]
     * @param  obj = {"userId":""}
     * @return list
     */
    getBatchList (obj) {
        return $ajax.post(apiUrl.apiUrl+'sample/getBatchList',obj).then(function(res){
                return Promise.resolve(res.data)
            })
    },
    /**
     * [task  任务管理-新建任务-获取样本列表]
     * @param  obj = {"batchId":"","pageSize":"","pageIndex":""}
     * @return list
     */
    getSampleByBatchId (obj) {
        return $ajax.post(apiUrl.apiUrl+'sample/getSampleByBatchId',obj).then(function(res){
                return Promise.resolve(res.data)
            })
    },
    /**
     * [task  任务管理-新建任务-批量执行任务]
     * @param  obj = {"sampleIds":["aaaaa","bbbb"]}
     * @return list
     */
    executeJobBySampleIds (obj) {
        return $ajax.post(apiUrl.apiUrl+'job/executeJobBySampleIds',obj).then(function(res){
                return Promise.resolve(res.data)
            })
    },
    /**
     * [task  任务管理-流程监控]
     * @param  obj = {"jobid":""}
     * @return list
     */
    getCurrentStep (obj) {
        return $ajax.post(apiUrl.apiUrl+'job/getCurrentStep',obj).then(function(res){
                return Promise.resolve(res.data)
            })
    },
    /**
     * [task  任务管理-下载vcf]
     * @param  obj = {"jobid":"","path":''}
     * @return true
     */
    ftpUpdate (obj) {
        return $ajax.get(apiUrl.apiUrl + 'data/ftpupdate', { params:obj }).then(function(res){
                return Promise.resolve(res.data)
            })
    }
};