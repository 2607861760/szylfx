import {apiUrl} from '@/common/js/Base.js'
// 注册api方法集
export const register = {
    Register (user) {
        return $ajax.post(apiUrl.apiUrl+'auth/register', user).then(function(res){
            return Promise.resolve(res.data)
        });
    }
};