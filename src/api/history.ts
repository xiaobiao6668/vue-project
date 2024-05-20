import * as API from './index'

export default {
    list(type) {
        return API.GET(`/image/historyList`, { type })
    },
    note(params) {
        return API.PUT(`/image/${params.historyId}`, params)
    }
}
