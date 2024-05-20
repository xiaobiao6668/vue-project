import * as API from './index'

export default {
    getImgPath(id: string) {
        return API.GET_DOWN(`/image/preview/${id}`)
    }
}
