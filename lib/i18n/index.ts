import i18nPaths from './paths.json'
const locale = 'sv'

export const pageSlugs = (id: SectionId, slugs?: PageSlug[]): PageSlug[] => {

  return [locale].map((locale) => ({
    locale: locale as SiteLocale,
    value: `/${i18nPaths[id][locale]}${slugs ? `/${slugs.find((s) => s.locale === locale).value}` : ''}`,
    parent: id === 'home' ? null : `/${i18nPaths[id][locale]}`
  }))
}