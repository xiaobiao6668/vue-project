import * as API from './index'

export default {
    getData() {
        return API.GET('/image')
    },
    del(id: any) {
        return API.DELETE(`/image/${id}`)
    },
    add(data: any) {
        return API.POST_JSON('/image', data)
    }
}
