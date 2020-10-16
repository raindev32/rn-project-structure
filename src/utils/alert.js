import { Toast } from 'native-base'

const success = (response) => {
  Toast.show({
    text: typeof response === 'object' ? response.message : response,
    buttonText: 'Okay',
    position: 'top',
    type: 'success',
    duration: 2000
  })
}

const warning = (response) => {
  Toast.show({
    text: typeof response === 'object' ? response.message : response,
    buttonText: 'Okay',
    position: 'top',
    type: 'warning',
    duration: 2000
  })
}

export default {
  success,
  warning
}
