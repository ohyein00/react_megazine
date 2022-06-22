import {authInstance} from './httpClient';

const resource = '/posts';

export default {
  get() {
    return authInstance.get(resource).then((res) => res.data);
  },
  async getPage(page = 0 ,size = 4) {

    const res = await authInstance.get(`${resource}/?page=${page}&size=${size}&sort=createdAt,desc`)
    return res.data
  },
  async post(payload: FormData) {
    const res = await authInstance.post(`${resource}`, payload,
      {headers: {'Content-Type': 'multipart/form-data'}}
    );
    return res
  },
  async modifyPost(payload: FormData) {
    console.log(payload)
    const res = await authInstance.put(`${resource}/${payload.get('postId')}`, payload,
      {headers: {'Content-Type': 'multipart/form-data'}}
    );
    return res
  },
  async likePost(payload:any) {
    const res = await authInstance.post(`${resource}/${payload}/like`);
    return res
  },
  async delete(payload:any) {
    const res = await authInstance.delete(`${resource}/${payload}`);
    return res
  },
};
