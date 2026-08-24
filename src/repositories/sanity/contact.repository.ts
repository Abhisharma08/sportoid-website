import { client } from '../../sanity/client'

export const getContactPageData = async () => {
  const query = `*[_type == "contactPage"][0]{
    _id,
    title,
    heroHeading,
    heroBackgroundImage,
    heroDescription,
    phone,
    email,
    address,
    officeHours
  }`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: ['contact'],
        revalidate: 3600,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (ContactPage):', error)
    return null
  }
}
