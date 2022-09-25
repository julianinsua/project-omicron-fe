import FormSelect from 'presentation/FormSelect'
import { FC, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  big?: boolean
  small?: boolean
  [props: string]: any
}

const LanguageChangeSelect: FC<Props> = ({ big, small, ...props }) => {
  const { t, i18n } = useTranslation('common')
  const options = useMemo(
    () => [
      { label: t('english'), value: 'en' },
      { label: t('spanish'), value: 'es' },
    ],
    []
  )

  const [lang, setLang] = useState(options.filter((option) => option.value === 'en'))

  const handleChangeLanguage = useCallback(({ value }) => {
    setLang(options.filter((option) => option.value === value))
    i18n.changeLanguage(value)
  }, [])

  return (
    <FormSelect
      label={t('language')}
      placeholder={t('language')}
      value={lang}
      options={options}
      onChange={handleChangeLanguage}
      {...props}
    />
  )
}

LanguageChangeSelect.defaultProps = {
  small: false,
  big: false,
}

export default LanguageChangeSelect
