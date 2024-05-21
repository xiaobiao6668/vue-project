import * as API from './index'

export default {
    getData() {
        return API.GET('/message')
    },
    del(id: any) {
        return API.DELETE(`/message/${id}`)
    },
    add(data: any) {
        return API.POST_JSON('/message', data)
    }
}
