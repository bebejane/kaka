import withGlobalProps from "/lib/withGlobalProps";
import { AllYouthsDocument, } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";
import { useRouter } from "next/router";
import { DatoSEO } from "dato-nextjs-utils/components";
import { pageSlugs } from "/lib/i18n";

export type Props = {
  youths: YouthRecord[]
}

export default function Youths({ youths }: Props) {

  const { asPath } = useRouter()

  return (
    <>
      <DatoSEO title={'Unga'} />
      <CardContainer key={`${asPath}-youths`}>
        {youths.map(({ id, image, title, intro, slug }) =>
          <Card key={id}>
            <Thumbnail
              title={title}
              image={image}
              intro={intro}
              titleRows={1}
              slug={`/unga/${slug}`}
            />
          </Card>
        )}
      </CardContainer>
    </>
  );
}

export const getStaticProps = withGlobalProps({ queries: [AllYouthsDocument] }, async ({ props, revalidate }: any) => {

  return {
    props: {
      ...props,
      page: {
        section: 'youths',
        title: 'Unga',
        slugs: pageSlugs('youths')
      } as PageProps
    },
    revalidate
  };
});