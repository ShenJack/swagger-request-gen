import axios from "axios"

import { DataBatchSetTags } from "../definitions/DataBatchSetTags"

export function apiPostBatchSetTags(dataBatchSetTags: DataBatchSetTags) {
  return axios.request({
    url: `/v1/post/tag/batchSet`,
    method: `post`,
  })
}
