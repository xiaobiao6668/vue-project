import * as API from './index'

export default {
    list(params: { userId: number }) {
        return API.GET(`/image/historyList/${params.userId}`)
    }
}
