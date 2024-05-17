import * as API from './index'

export default {
    login(params: {} | undefined) {
        return API.POST_JSON('/user/login', params)
    },
    register(params: {} | undefined) {
        return API.POST_JSON(`/user`, params)
    }
}
