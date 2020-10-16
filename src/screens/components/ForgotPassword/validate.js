const validate = ({
  account,
  type
}) => {
  const errors = {
    account: '',
    type: ''
  }

  errors.account = !account
    ? 'Required'
    : account.length > 255
      ? 'Email / Phone max 255 character'
      : undefined

  errors.type = !type
    ? 'Required'
    : undefined

  return errors
}

export default validate
