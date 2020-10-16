import moment from 'moment'

const getTimeDiff = (startTime = '', endTime = '') => {
  if (startTime === '') {
    return 0
  }

  if (endTime === '') {
    return 0
  }

  if (startTime && endTime) {
    const now = new Date(startTime)
    const end = new Date(endTime)
    return Math.abs((now.getTime() - end.getTime()) / 1000)
  }
  return 0
}

const timeConverter = (UNIX_timestamp) => {
  let a = new Date(UNIX_timestamp)
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let year = a.getFullYear()
  let month = months[a.getMonth()]
  let date = a.getDate()
  let time = `${date}-${month}-${year}`
  return time
}

const normalTime = (time) => {
  if (!time) return 'not define'
  return moment(time, 'YYYY-MM-DD').format('DD MMMM YYYY')
}

const convertTimeStampToDate = (timestamp) => {
  if (!timestamp) return 'not define'
  return moment(timestamp).format('YYYY-MM-DD')
}

const convertDateToTimeStamp = (timestamp) => {
  return moment(timestamp, 'YYYY-MM-DD')
}

function pad (n, width, z) {
  z = z || '0'
  n = `${n}`
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

const dateTimeConverter = (UNIX_timestamp) => {
  let a = new Date(UNIX_timestamp)
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const current = new Date()
  const currentDate = current.getDate()
  const currentMonth = months[current.getMonth()]
  const currentYear = current.getFullYear()

  let year = a.getFullYear()
  let month = months[a.getMonth()]
  let date = a.getDate()
  let hours = a.getHours()
  let minute = a.getMinutes()
  if (currentDate === date && currentMonth === month && currentYear === year) {
    return `Today ${pad(hours, 2)}:${pad(minute, 2)}`
  }
  if (currentDate === date + 1 && currentMonth === month && currentYear === year) {
    return `Yesterday ${pad(hours, 2)}:${pad(minute, 2)}`
  }

  if (currentDate === date - 1 && currentMonth === month && currentYear === year) {
    return `Tommorow ${pad(hours, 2)}:${pad(minute, 2)}`
  }

  return `${date} ${month} ${year} ${pad(hours, 2)}:${pad(minute, 2)}`
}

export {
  getTimeDiff,
  timeConverter,
  dateTimeConverter,
  normalTime,
  convertDateToTimeStamp,
  convertTimeStampToDate
}
