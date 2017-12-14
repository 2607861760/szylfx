import {apiUrl} from '@/common/js/Base.js'
// 登录api方法集
export const login = {
    /**
     * [login  用户登录]
     * @param  {[type]} params1 [用户名参数]
     * @param  {[type]} params2 [登录密码参数]
     * @return {[type]}   [登录验证，如果失败返回错误信息，登录成功模块选择]
     */
    login (obj) {
        return $ajax.post( apiUrl.apiUrl+'auth/login',obj).then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [login  用户跳转]
     * @param 
     * @return {[0],[1]}  
     */
    judge () {
        return $ajax.get(apiUrl.apiUrl+'auth/getSystemLoginType').then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [login  用户登录跳转]
     * @param 
     * @return {url}  
     */
    jump () {
        return $ajax.get(apiUrl.apiUrl+'auth/oauthLogin').then(function(res){
            return Promise.resolve(res.data)
        })
    },
    /**
     * [login  用户登录tagx]
     *
     * @param {
     * "passWord":"123456",
     *         "email":"test@163.com",
     *         "code":"XXX"
     *        }
     * @return {true}  
     */
    tgexLogin (url) {
        return $ajax.get(apiUrl.apiUrl+'auth/oauthcallback?code='+url).then(function(res){
            return Promise.resolve(res.data)
        })
    }
};




