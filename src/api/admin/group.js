import request from '@/utils/fetch'

export function delAGroup(id) {
    return request.delete('/admin/deleteGroup/'+id)
}