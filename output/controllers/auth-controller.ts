import axios from "axios"

import { DataUserLogin } from "../definitions/DataUserLogin"

export function apiPostUserLogin(dataUserLogin: DataUserLogin) {
  return axios.request({
    url: `/v1/auth/login`,
    method: `post`,
  })
}
