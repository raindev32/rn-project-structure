import Dataset from 'impagination'

const pagination = (params) => {
  const {
    pageSize,
    fetch,
    receive,
    success,
    failed,
    api
  } = params
  let dataset = new Dataset({
    pageSize,
    observe: datasetState => receive(datasetState),
    fetch: async (pageOffset) => {
      fetch()
      try {
        const response = await api(pageOffset)

        const { data } = response
        success()
        return data
      } catch (error) {
        const { message } = error
        failed(message)
      }
    }
  })
  dataset.setReadOffset(0)
  return dataset
}

export default pagination
