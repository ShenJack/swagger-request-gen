import axios from "axios"

export function apiGetGetPosts(
  page: number,

  size: number,

  title: string
) {
  return axios.request({
    url: `/v1/post/`,
    method: `get`,
  })
}
