import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllInterviewsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { DatoSEO } from "dato-nextjs-utils/components";
import { pageSlugs } from "/lib/i18n";

export type Props = {
  interviews: (InterviewRecord & ThumbnailImage)[]
}

export default function Interview({ interviews }: Props) {

  const { asPath } = useRouter()

  return (
    <>
      <DatoSEO title={'Intervjuer'} />
      <CardContainer key={asPath}>
        {interviews.map(({ id, image, title, intro, slug }) =>
          <Card key={id}>
            <Thumbnail
              title={title}
              image={image}
              intro={intro}
              titleRows={1}
              slug={`/intervjuer/${slug}`}
            />
          </Card>
        )}
      </CardContainer>
    </>
  );
}

export const getStaticProps = withGlobalProps({ queries: [AllInterviewsDocument] }, async ({ props, revalidate }: any) => {

  return {
    props: {
      ...props,
      page: {
        section: 'interviews',
        title: 'Intervjuer',
        slugs: pageSlugs('interviews')
      } as PageProps
    },
    revalidate
  };
});