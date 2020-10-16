const validate = ({
  password
}) => {
  const errors = {
    password: ''
  }
  errors.password = !password
    ? 'Required'
    : password.length < 6
      ? 'Password min 6 character'
      : undefined

  return errors
}

export default validate
