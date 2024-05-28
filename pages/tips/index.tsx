import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllTipsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";
import { useRouter } from "next/router";
import { DatoSEO } from "dato-nextjs-utils/components";

import { pageSlugs } from "/lib/i18n";

export type Props = {
  tips: TipRecord[]

}

export default function Tips({ tips }: Props) {

  const { asPath } = useRouter()

  return (
    <>
      <DatoSEO title={'Tips'} />
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

export const getStaticProps = withGlobalProps({ queries: [AllTipsDocument] }, async ({ props, revalidate }: any) => {

  return {
    props: {
      ...props,
      page: {
        section: 'tips',
        title: 'Tips',
        slugs: pageSlugs('tips')
      } as PageProps
    },
    revalidate
  };
});