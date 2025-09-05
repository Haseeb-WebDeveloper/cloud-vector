export const getAllDigitalProductsSolutionsSlugQuery = () => `
*[_type == "studioDigitalProductsSolutions"] {
  "slug": slug.current,
  _updatedAt
}
`;
