const validate = ({
  full_name,
  address,
  province,
  city,
  subdistrict
}) => {
  const errors = {
    full_name: '',
    address: '',
    province: '',
    city: '',
    subdistrict: ''
  }

  errors.full_name = !full_name
    ? '*'
    : full_name.length < 3
      ? 'Nama lengkap min 3 karakter'
      : undefined

  errors.address = !address
    ? '*'
    : address.length < 12
      ? 'Alamat min 12 karakter'
      : undefined

  errors.province = !province ? '*' : undefined
  errors.city = !city ? '*' : undefined
  errors.subdistrict = !subdistrict ? '*' : undefined

  return errors
}

export default validate
