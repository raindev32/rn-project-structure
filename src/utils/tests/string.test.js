import {
  currencyFormatter,
  numberFormatter,
  composeData
} from '../string'

describe('Testing price text rendering', () => {
  it('should render an Rp 200.000 tag input with number', () => {
    const value = currencyFormatter(200000)
    expect(value).toEqual('Rp 200.000')
  })

  it('should render an Rp 200.000 tag input with string', () => {
    const value = currencyFormatter(undefined)
    expect(value).toEqual('Rp 0')
  })
})

describe('Testing number text rendering', () => {
  it('should render an 200.000 tag input with number', () => {
    const value = numberFormatter(200000)
    expect(value).toEqual('200.000')
  })

  it('should render an 0 tag input with undefined', () => {
    const value = numberFormatter(undefined)
    expect(value).toEqual('0')
  })
})

describe('Testing compose data', () => {
  it('should render an Rp 200.000 tag input with number', () => {
    const value = composeData('key', 'value')
    expect(value).toEqual({
      id: 'key', value: 'value'
    })
  })
})
