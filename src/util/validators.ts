import { validEmail } from 'Entities/interfaces/Common'

const isValidEmail = (email: string) => {
  return validEmail.test(email)
}

export default isValidEmail
