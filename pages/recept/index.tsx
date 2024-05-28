import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllRecipesDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";
import { formatDate } from "/lib/utils";
import { useRouter } from "next/router";
import { DatoSEO } from "dato-nextjs-utils/components";
import { useTranslations } from "next-intl";
import { pageSlugs } from "/lib/i18n";

export type Props = {
  recipes: (RecipeRecord & ThumbnailImage)[]
}

export default function Recipe({ recipes }: Props) {

  const t = useTranslations()
  const { asPath } = useRouter()

  return (
    <>
      <DatoSEO title={t('Menu.recipes')} />
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

  const { recipes } = props;

  return {
    props: {
      ...props,
      page: {
        section: 'recipes',
        slugs: pageSlugs('recipes')
      } as PageProps
    },
    revalidate
  };
});