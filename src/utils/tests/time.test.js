import { getTimeDiff } from '../time'

describe('Testing time diff to get until', () => {
  it('should render 0 second input with start time undefined', () => {
    const until = getTimeDiff(undefined, 1556964309)
    expect(until).toEqual(0)
  })

  it('should render 0 second input with end time undefined', () => {
    const until = getTimeDiff(1556964189, undefined)
    expect(until).toEqual(0)
  })

  it('should render 0 second input with start time null', () => {
    const until = getTimeDiff(null, 1556964309)
    expect(until).toEqual(0)
  })

  it('should render 0 second input with end time null', () => {
    const until = getTimeDiff(1556964189, null)
    expect(until).toEqual(0)
  })
})
