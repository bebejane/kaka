type PageSlug = {
  value: string
  parent: string

}

type PageProps = {
  year: YearExtendedRecord
  title?: string
  isHome: boolean
  slugs?: PageSlugs[]
  section: SectionId
  parent?: boolean
  overview?: string
}

type YearExtendedRecord = YearRecord & {
  isArchive: boolean
}

type SectionId = 'home' | 'contact' | 'interviews' | 'news' | 'about' | 'youths' | 'recipes' | 'tips' | 'search' | 'in-english'

type ThumbnailImage = {
  thumb: FileField
}

type Messages = typeof import('../lib/i18n/en.json');
declare interface IntlMessages extends Messages { }


