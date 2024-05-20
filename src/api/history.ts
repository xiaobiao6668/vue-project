import * as API from './index'

export default {
    list() {
        return API.GET(`/image/historyList`)
    }
}
