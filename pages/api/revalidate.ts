import { withRevalidate } from 'dato-nextjs-utils/hoc'

export default withRevalidate(async (record, revalidate) => {

  const { api_key: apiKey, } = record.model;
  const { slug } = record
  const paths = []


  switch (apiKey) {
    case 'general':
      paths.push(`/`)
      break;
    case 'start':
      paths.push('/')
      break;
    case 'about':
      paths.push(`/om/${slug}`)
      break;
    case 'interview':
      paths.push('/intervju')
      paths.push(`/intervju/${slug}`)
      break;
    case 'news':
      paths.push('/nyheter')
      paths.push(`/nyheter/${slug}`)
      break;
    case 'youth':
      paths.push('/unga')
      paths.push(`/unga/${slug}`)
      break;
    case 'recipe':
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

  revalidate(paths)
})