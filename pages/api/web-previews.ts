import { withWebPreviewsEdge } from 'dato-nextjs-utils/hoc';

export const config = {
  runtime: 'edge'
}

export default withWebPreviewsEdge(async ({ item, itemType }) => {

  let path = null;

  const { api_key } = itemType.attributes
  const slug = typeof item.attributes.slug === 'object' ? item.attributes.slug.sv : item.attributes.slug

  switch (api_key) {
    case 'general':
      path = `/`
      break;
    case 'start':
      path = `/`
      break;
    case 'about':
      path = `/om/${slug}`
      break;
    case 'interview':
      path = `/intervju/${slug}`
      break;
    case 'news':
      path = `/nyheter/${slug}`
      break;
    case 'youth':
      path = `/unga/${slug}`
      break;
    case 'recipe':
      path = `/recept/${slug}`
      break;
    case 'tip':
      path = `/tips/${slug}`
      break;
    case 'contact':
      path = `/kontakt`
      break;
    case 'in_english':
      path = `/in-english`
      break;
    default:
      break;
  }

  return path
})