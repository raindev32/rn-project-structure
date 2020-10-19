const validate = ({ email, password }) => {
  const errors = {
    email: '',
    password: ''
  }
  errors.email = !email
    ? 'Required'
    : email.length > 255
      ? 'Email max 255 character'
      : undefined

  errors.password = !password ? 'Required' : undefined

  return errors
}

export default validate
