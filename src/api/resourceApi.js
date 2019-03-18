import axios from 'axios'

const BASE_PATH = '/rest'
const RESOURCE_LIST_API = `${BASE_PATH}/resource/list`
const RESOURCE_CONTENT_API = `${BASE_PATH}/resource`

async function fetchResourceList (query) {
  const resp = await axios.post(RESOURCE_LIST_API, {
    ...query
  })

  return resp.data.data
}

async function fetchResourceContent (docId) {
  const resp = await axios.get(`${RESOURCE_CONTENT_API}/${docId}`)
  return resp.data.data
}

export default {
  fetchResourceList,
  fetchResourceContent
}
