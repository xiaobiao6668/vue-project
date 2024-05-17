import * as API from './index'

export default {
    list(params: {} | undefined) {
        return API.POST_JSON('/user/page', params)
    },
    delete(id: number) {
        return API.DELETE(`/user/${id}`)
    }
}