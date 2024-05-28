import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllRecipesDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";
import { useRouter } from "next/router";
import { DatoSEO } from "dato-nextjs-utils/components";
import { pageSlugs } from "/lib/i18n";

export type Props = {
  recipes: (RecipeRecord & ThumbnailImage)[]
}

export default function Recipe({ recipes }: Props) {

  const { asPath } = useRouter()

  return (
    <>
      <DatoSEO title={'Recept'} />
      <CardContainer key={asPath} columns={3}>
        {recipes.map(({ id, image, title, slug }) =>
          <Card key={id}>
            <Thumbnail
              title={title}
              titleRows={2}
              image={image}
              slug={`/recept/${slug}`}
            />
          </Card>
        )}
      </CardContainer>

    </>
  );
}

export const getStaticProps = withGlobalProps({ queries: [AllRecipesDocument] }, async ({ props, revalidate }: any) => {

  return {
    props: {
      ...props,
      page: {
        section: 'recipes',
        title: 'Recept',
        slugs: pageSlugs('recipes')
      } as PageProps
    },
    revalidate
  };
});