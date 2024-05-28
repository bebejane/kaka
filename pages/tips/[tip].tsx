import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { PartnerDocument, AllPartnersDocument } from "/graphql";
import { Article, Related, BackButton, MetaSection } from '/components';
import { formatDate } from "/lib/utils";
import { useTranslations } from "next-intl";
import { DatoSEO } from "dato-nextjs-utils/components";
import { pageSlugs } from "/lib/i18n";

export type Props = {
  tip: PartnerRecord
}

export default function Partner({ tip: {
  id,
  image,
  title,
  intro,
  content,
  address,
  city,
  webpage,
  _seoMetaTags
} }: Props) {

  const t = useTranslations()

  return (
    <>
      <DatoSEO title={title} description={intro} seo={_seoMetaTags} />
      <Article
        id={id}
        key={id}
        title={title}
        image={image}
        intro={intro}
        content={content}
        onClick={(imageId) => { }}
      />
      <MetaSection
        key={`${id}-meta`}
        items={[
          { title: t('MetaSection.city'), value: city },
          { title: t('MetaSection.address'), value: address },
          { title: t('MetaSection.link'), value: webpage ? t('MetaSection.webpage') : undefined, link: webpage }
        ]}
      />
      {/*
      <Related header={t('Menu.participants')} items={tips} />
      */}
      <BackButton>{t('BackButton.showAllPartners')}</BackButton>
    </>
  )
}

export async function getStaticPaths() {
  const { tips } = await apiQueryAll(AllPartnersDocument)
  const paths = tips.map(({ slug }) => ({ params: { tip: slug } }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.tip;
  const { tip } = await apiQuery(PartnerDocument, { variables: { slug, locale: context.locale }, preview: context.preview })

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
        title: tip.title,
        slugs: pageSlugs('tips', props.year.title, tip._allSlugLocales)
      } as PageProps
    },
    revalidate
  };
});