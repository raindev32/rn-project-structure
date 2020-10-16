const validate = ({
  memo
}) => {
  const errors = {
    memo: ''
  }
  errors.memo = !memo
    ? 'Required'
    : undefined

  return errors
}

export default validate
