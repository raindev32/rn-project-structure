const validate = ({
  code
}) => {
  const errors = {
    code: ''
  }
  errors.code = !code
    ? 'Required'
    : code.length > 4
      ? 'Code max 4 character'
      : undefined

  return errors
}

export default validate
