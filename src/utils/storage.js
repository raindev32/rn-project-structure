import AsyncStorage from '@react-native-community/async-storage'

const getUserToken = async () => {
  let data = await AsyncStorage.getItem('userToken')
  const parsed = JSON.parse(data) || null
  return parsed
}

const get = async (key) => {
  let data = []
  try {
    data = await AsyncStorage.getItem(key)
    return data
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const set = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data)
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const remove = async (key) => {
  try {
    const removeProgress = await AsyncStorage.removeItem(key)
    return removeProgress
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

export {
  getUserToken,
  get,
  set,
  remove
}
