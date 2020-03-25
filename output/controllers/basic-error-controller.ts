import axios from "axios"

export function apiGetErrorHtml() {
  return axios.request({
    url: `/v1/error`,
    method: `get`,
  })
}
export function apiHeadErrorHtml() {
  return axios.request({
    url: `/v1/error`,
    method: `head`,
  })
}
export function apiPostErrorHtml() {
  return axios.request({
    url: `/v1/error`,
    method: `post`,
  })
}
export function apiPutErrorHtml() {
  return axios.request({
    url: `/v1/error`,
    method: `put`,
  })
}
export function apiDeleteErrorHtml() {
  return axios.request({
    url: `/v1/error`,
    method: `delete`,
  })
}
export function apiOptionsErrorHtml() {
  return axios.request({
    url: `/v1/error`,
    method: `options`,
  })
}
export function apiPatchErrorHtml() {
  return axios.request({
    url: `/v1/error`,
    method: `patch`,
  })
}
