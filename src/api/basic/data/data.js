import {apiUrl} from '@/common/js/Base.js'
export const data = {
    /**
     * [data  树形列表添加按钮]
     * @param  {[type]} param [path,fileName,userId,sampleid,productId]
     * @return {[type]}   obj
     */
    addFastq(obj){
        return $ajax.post(apiUrl.apiUrl+'upload/addFastq2Sample',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  创建病人]
     * @param  {[type]} param [病人信息,productId,userId,productname]
     * @return {[type]}   obj
     */
    addProject(obj){
        return $ajax.post(apiUrl.apiUrl+'project/addProject',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  创建样本]
     * @param  {[type]} param [样本信息,productId,userId,patientid]
     * @return {[type]}   obj
     */
    addSample(obj){
        return $ajax.post(apiUrl.apiUrl+'sample/addSample',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  删除病人]
     * @param  {[type]} param [productId,userId,idList]
     * @return {[type]}   obj
     */
    deletePatientById(obj){
        return $ajax.post(apiUrl.apiUrl+'patient/deletePatientById',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  删除样本]
     * @param  {[type]} param [productId,userId,idList]
     * @return {[type]}   obj
     */
    deleteSampleById(obj){
        return $ajax.post(apiUrl.apiUrl+'sample/deleteSampleById',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  运行fastq文件]
     * @param  {[type]} param [productId,userId,sampleid,pipeline,templateId]
     * @return {[type]}   obj
     */
    executeSample(obj){
        return $ajax.post(apiUrl.apiUrl+'sample/executeSample',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取疾病列表---癌症]
     * @param  {[type]} param [userId]
     * @return {[type]}   obj
     */
    getdiseaselist(obj){
        return $ajax.post(apiUrl.apiUrl+'disease/getdiseaselist',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取fastq文件]
     * @param  {[type]} param [userId,productId,pipeline,sampleId,fileGroupId,templateId]
     * @return {[type]}   obj
     */
    getFatsQList(obj){
        return $ajax.post(apiUrl.apiUrl+'sample/getFatsQList',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取样本文件信息]
     * @param  {[type]} param [userId,productId,sampleid]
     * @return {[type]}   obj
     */
    getFileList(obj){
        return $ajax.post(apiUrl.apiUrl+'sample/getFileList',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取树形文件列表]
     * @param  {[type]} param [userId,productId,path]
     * @return {[type]}   obj
     */
    getForldList(obj){
        return $ajax.post(apiUrl.apiUrl+'upload/getForldList',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取病人信息---点击病人编号]
     * @param  {[type]} param [userId,productId,patientcode,patientid]
     * @return {[type]}   obj
     */
    getProjectDetail(obj){
        return $ajax.post(apiUrl.apiUrl+'project/getProjectDetail',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取病人数据列表]
     * @param  {[type]} param [userId,productId,pageSize,pageIndex]
     * @return {[type]}   obj
     */
    getProjectList(obj){
        return $ajax.post(apiUrl.apiUrl+'project/getProjectList?t='+Date.now()+'',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取样本列表]
     * @param  {[type]} param [userId,productId,patientid]
     * @return {[type]}   obj
     */
    getSampleList(obj){
        return $ajax.post(apiUrl.apiUrl+'patient/getSampleList',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取样本下拉列表---测序区域/ek]
     * @param  {[type]} param [userId,productId]
     * @return {[type]}   obj
     */
    getTGexPara(obj){
        return $ajax.post(apiUrl.apiUrl+'sample/getTGexPara',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取xls列表]
     * @param  {[type]} param [userId,productId,filename]
     * @return {[type]}   obj
     */
    readExcel(obj){
        return $ajax.post(apiUrl.apiUrl+'upload/readExcel',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  更新病人信息]
     * @param  {[type]} param [userId,productId,patientid,病人信息]
     * @return {[type]}   obj
     */
    updatePatient(obj){
        return $ajax.post(apiUrl.apiUrl+'patient/updatePatient',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  创建样本]
     * @param  {[type]} param [样本信息,productId,userId,patientid,sampleid]
     * @return {[type]}   obj
     */
    updateSample(obj){
        return $ajax.post(apiUrl.apiUrl+'sample/updateSample',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  上传列表]
     * @param  {[type]} param [excelList,productId,userId]
     * @return {[type]}   obj
     */
    uploadExcelFile(obj){
        return $ajax.post(apiUrl.apiUrl+'upload/uploadExcelFile',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  vshoo接口]
     * @param  {[type]} param [excelList,productId,userId]
     * @return {[type]}   obj
     */
    vishuourl(obj){
        return $ajax.post(apiUrl.apiUrl+'job/vishuourl',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  vshoo接口]
     * @param  {[type]} param [paientId]
     * @return {[type]}   obj
     */
    createCaseByPaientId(obj){
        return $ajax.post(apiUrl.apiUrl+'workflow/createCaseByPaientId',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  退出接口]
     * @param  {[type]} param [userId]
     * @return {[type]}   obj
     */
    logout(obj){
        return $ajax.post(apiUrl.apiUrl+'auth/logout',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  根据样本批次获得病人信息接口]
     * @param  {[type]} param {"productId":"1" ,"batchId":"YM_102th",
     * "pageSize":10,"pageIndex":1}
     * @return {[type]}   obj
     */
    getProjectListByBatchId(obj){
        return $ajax.post(apiUrl.apiUrl+'project/getProjectListByBatchId',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  数据分配提交]
     * @param  {[type]} param { "patientidList":["a","b"],"useridList":["c"]}
     * @return {[type]}   obj
     */
    assignData(obj){
        return $ajax.post(apiUrl.apiUrl+'project/assignData',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  组成员列表]
     * @param  {[type]} cookie
     * @return {[type]}   obj
     */
    queryDeptAndUser(obj) {
        return $ajax.post(apiUrl.apiUrl+'usercenter/queryDeptAndUser',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  根据部门id获得成员列表]
     * @param  {[type]} cookie
     * @return {[type]}   obj
     */
    queryUserByDeptId(obj) {
        return $ajax.post(apiUrl.apiUrl+'usercenter/queryUserByDeptId',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
}