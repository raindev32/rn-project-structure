const validate = ({
  firstName,
  lastName
}) => {
  const errors = {
    firstName: '',
    lastName: ''
  }
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
