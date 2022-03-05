import { FC } from 'react'
import FormSelect from 'presentation/FormSelect'

const SignIn: FC<PropTypes> = () => {
  const optionsArray = [{ id: '12345', label: 'pepito', value: 'pepitoValue' }]
  return (
    <div>
      <FormSelect label="pepito" value={null} options={optionsArray} placeholder="pepito" />
    </div>
  )
}

interface PropTypes {}

export default SignIn
