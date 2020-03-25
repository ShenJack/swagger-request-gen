import axios from "axios"

export function apiGetGetTags() {
  return axios.request({
    url: `/v1/tag/`,
    method: `get`,
  })
}
