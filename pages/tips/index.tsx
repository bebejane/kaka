import s from "./index.module.scss";
import cn from 'classnames'
import withGlobalProps from "/lib/withGlobalProps";
import { AllYouthsDocument, AllTipsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail, Link } from "/components";
import { useRouter } from "next/router";
import { DatoSEO } from "dato-nextjs-utils/components";
import { useTranslations } from "next-intl";
import { pageSlugs } from "/lib/i18n";

export type Props = {
  tips: TipRecord[]

}

export default function Tips({ tips }: Props) {

  const t = useTranslations()
  const { asPath } = useRouter()

  return (
    <>
      <DatoSEO title={t('Menu.tips')} />
      <CardContainer key={`${asPath}-tips`}>
        {tips.map(({ id, image, name, intro, slug }) =>
          <Card key={id}>
            <Thumbnail
              title={name}
              image={image}
              intro={intro}
              titleRows={1}
              slug={`/tips/${slug}`}
            />
          </Card>
        )}
      </CardContainer>
    </>
  );
}

export const getStaticProps = withGlobalProps({ queries: [AllTipsDocument, AllYouthsDocument] }, async ({ props, revalidate }: any) => {

  return {
    props: {
      ...props,
      page: {
        section: 'tips',
        slugs: pageSlugs('tips')
      } as PageProps
    },
    revalidate
  };
});