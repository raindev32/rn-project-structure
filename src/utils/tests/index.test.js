import {
  getFileExtensionByUri,
  trimString
} from '../index'

describe('Testing trim string', () => {
  it('should render an trimed string', () => {
    const value = trimString(' Add ')
    expect(value).toEqual('Add')
  })

  it('should render an empty string', () => {
    const value = trimString()
    expect(value).toEqual('')
  })
})

describe('Testing file extension', () => {
  it('should render an file extension', () => {
    const value = getFileExtensionByUri('content:///file/content/image.jpg')
    expect(value).toEqual('jpg')
  })

  it('should render an file extension', () => {
    const value = getFileExtensionByUri()
    expect(value).toEqual('')
  })
})
