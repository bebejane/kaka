import { withRevalidate } from 'dato-nextjs-utils/hoc'
import { allYears, translatePath } from '/lib/utils';
import { defaultLocale } from '/lib/i18n'

export default withRevalidate(async (record, revalidate) => {

  const { api_key: apiKey, } = record.model;
  const { slug } = record
  const paths = []


  switch (apiKey) {
    case 'year':
      paths.push(`/${record.title}`)
      break;
    case 'general':
      paths.push(`/`)
      break;
    case 'start':
      paths.push('/')
      break;
    case 'about':
      paths.push(`/om/${slug}`)
      break;
    case 'program':
      paths.push('/program')
      paths.push(`/program/${slug}`)
      break;
    case 'program_category':
      paths.push('/program')
      break;
    case 'participant':
      paths.push('/medverkande')
      paths.push(`/medverkande/${slug}`)
      break;
    case 'news':
      paths.push('/nyheter')
      paths.push(`/nyheter/${slug}`)
      break;
    case 'youth':
      paths.push('/platser')
      paths.push(`/platser/${slug}`)
      break;
    case 'exhibition':
      paths.push('/recept')
      paths.push(`/recept/${slug}`)
      break;
    case 'tip':
      paths.push('/tips')
      paths.push(`/tips/${slug}`)
      break;
    case 'contact':
      paths.push(`/kontakt`)
      break;
    case 'in_english':
      paths.push(`/in-english`)
      break;
    default:
      break;
  }

  console.log(paths)
  revalidate(paths)
})