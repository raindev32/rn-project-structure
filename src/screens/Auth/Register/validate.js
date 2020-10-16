const validate = ({
  firstName,
  lastName,
  email,
  phone,
  password,
  confirmPassword
}) => {
  const errors = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  }

  errors.email = !email
    ? 'Required'
    : email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
      ? 'Invalid email address'
      : email.length > 60
        ? 'Email max 60 character'
        : undefined

  errors.phone = !phone
    ? 'Required'
    : phone.length > 12
      ? 'Phone No max 12 character'
      : undefined

  errors.password = !password
    ? 'Required'
    : password.length < 6
      ? 'Password min 6 character'
      : undefined

  errors.confirmPassword = !confirmPassword
    ? 'Required'
    : confirmPassword !== password
      ? 'Password Doesnt Match!'
      : undefined

  errors.firstName = !firstName
    ? 'Required'
    : firstName.length < 3
      ? 'First Name min 3 character'
      : firstName.length > 255
        ? 'First Name max 255 character'
        : undefined

  errors.lastName = !lastName
    ? 'Required'
    : lastName.length < 3
      ? 'Last Name min 3 character'
      : lastName.length > 255
        ? 'Last Name max 255 character'
        : undefined

  return errors
}

export default validate
