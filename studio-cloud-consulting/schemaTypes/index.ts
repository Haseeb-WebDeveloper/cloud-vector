import {blogPost} from './post'
import {blogCategory} from './blog-category'
import {blogPage} from './blog-page'
import {centerTextBlock} from './custom/center-text-block'
import {titleBlock} from './custom/title-block'
import {imageCarouselBlock} from './custom/image-carousel-block'
import {twoImagesBlock} from './custom/two-images-block'
import {textImageBlock} from './custom/text-image-block'
import {mediaBlock} from './custom/media-block'
import {infoBoxesBlock} from './custom/info-boxes-block'
import {testimonialBlock} from './custom/testimonial-block'
import {keyResultsBlock} from './custom/key-results-block'
import {testimonial} from './testimonial'
import {homePage} from './home-page'
import {ctoPage} from './cto-page'
import {
  button,
  stat,
  partnerLogo,
  offer,
  feature,
  animatedStat,
  valuePropCard,
  chip,
  faqItem,
} from './home-page-types'
import {
  painPoint,
  solution,
  ctoTab,
  ctoFeatureStep,
} from './cto-page-types'
import {
  industryFact,
  approachStep,
  costOptimisationStep,
} from './cost-optimisation-page-types'
import {costOptimisationPage} from './cost-optimisation-page'
import {contactUsPage} from './contact-us-page'

export const schemaTypes = [
  blogPost,
  blogCategory,
  blogPage,
  centerTextBlock,
  titleBlock,
  imageCarouselBlock,
  twoImagesBlock,
  textImageBlock,
  mediaBlock,
  infoBoxesBlock,
  testimonialBlock,
  keyResultsBlock,
  // Testimonial document (reusable across pages)
  // testimonial,
  // Homepage types (must be before homePage document)
  button,
  stat,
  partnerLogo,
  offer,
  feature,
  animatedStat,
  valuePropCard,
  chip,
  faqItem,
  // Homepage document
  homePage,
  // CTO Page types (must be before ctoPage document)
  painPoint,
  solution,
  ctoTab,
  ctoFeatureStep,
  // CTO Page document
  ctoPage,
  // Cost Optimisation Page types (must be before costOptimisationPage document)
  industryFact,
  approachStep,
  costOptimisationStep,
  // Cost Optimisation Page document
  costOptimisationPage,
  // Contact Us Page document
  contactUsPage,
]
