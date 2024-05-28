import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { TipDocument, AllTipsDocument } from "/graphql";
import { Article, Related, BackButton, MetaSection } from '/components';
import { useTranslations } from "next-intl";
import { DatoSEO } from "dato-nextjs-utils/components";
import { pageSlugs } from "/lib/i18n";

export type Props = {
  tip: TipRecord
}

export default function Tip({ tip: {
  id,
  image,
  name,
  intro,
  content,
  _seoMetaTags
} }: Props) {

  const t = useTranslations()

  return (
    <>
      <DatoSEO title={name} description={intro} seo={_seoMetaTags} />
      <Article
        id={id}
        key={id}
        title={name}
        image={image}
        intro={intro}
        content={content}
        onClick={(imageId) => { }}
      />
      <BackButton href={'/tips'}>{t('BackButton.showAllTips')}</BackButton>
    </>
  )
}

export async function getStaticPaths() {
  const { tips } = await apiQueryAll(AllTipsDocument)
  const paths = tips.map(({ slug }) => ({ params: { tip: slug } }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.tip;
  const { tip } = await apiQuery(TipDocument, { variables: { slug, locale: context.locale }, preview: context.preview })

  if (!tip)
    return { notFound: true }

  return {
    props: {
      ...props,
      tip,
      page: {
        section: 'tips',
        parent: true,
        overview: '/tips',
        title: tip.name,
        slugs: pageSlugs('tips', tip._allSlugLocales)
      } as PageProps
    },
    revalidate
  };
});