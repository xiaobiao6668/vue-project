import * as API from './index'

export default {
    getImgPath(id: string) {
        return API.GET(`/image/preview/${id}`)
    }
}
