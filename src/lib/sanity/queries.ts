export const getAllDigitalProductsSolutionsSlugQuery = () => `
*[_type == "studioDigitalProductsSolutions"] {
  "slug": slug.current,
  _updatedAt
}
`;



// Blog queries
export const getBlogPageQuery = () => `
*[_type == "blogPage"][0] {
  blogPosts[]->{
    _id,
    "title": title,
    "slug": slug.current,
    featuredImage {
      asset->{
        url
      }
    },
    category->{
      _id,
      "name": name,
      "slug": slug.current
    },
    "metaTitle": metaTitle,
    "metaDescription": metaDescription,
    _createdAt,
    _updatedAt,
  },
  "metaTitle": metaTitle,
  "metaDescription": metaDescription,
  ogImage {
    asset->{
      url
    }
  }
}
`;

export const getAllBlogCategoriesQuery = () => `
*[_type == "blogCategory"] {
  _id,
  "name": name,
  "slug": slug.current,
}
`;

export const getBlogPostBySlugQuery = (slug: string) => `
*[_type == "blogPost" && slug.current == "${slug}"][0] {
  _id,
  "title": title,
  "slug": slug.current,
  featuredImage {
    asset->{
      url
    }
  },
  category->{
    _id,
    "name": name,
    "slug": slug.current
  },
  "content": content[]{
    ...,
    // Handle different custom block types inline for each array member
    _type == "mediaBlock" => {
      width,
      height,
      gap,
      justifyContent,
      files[]{
        file {
          asset->{
            url
          }
        },
        rounded,
        autoplay,
        loop,
        muted
      }
    },
    _type == "titleBlock" => {
      layout,
      text[]{
        content,
        tag
      }
    },
    _type == "centerTextBlock" => {
      text,
      isItalic
    },
    _type == "textImageBlock" => {
      layout,
      height,
      text[]{
        content,
        tag
      },
      image {
        asset->{
          url
        }
      }
    },
    _type == "image" => {
      asset->{
        url
      }
    },
    _type == "imageCarouselBlock" => {
      media[]{
        ...,
        _type == "image" => {
          asset->{
            url
          }
        },
        _type == "file" => {
          asset->{
            url
          }
        }
      }
    },
    _type == "infoBoxesBlock" => {
      items[]{
        icon{
          asset->{
            url
          }
        },
        text
      }
    },
    _type == "testimonialBlock" => {
      text,
      personName,
      designation,
      company,
      photo{
        asset->{
          url
        }
      }
    },
    _type == "keyResultsBlock" => {
      items
    },
    _type == "twoImagesBlock" => {
      images[]{
        asset->{
          url
        }
      }
    }
  },
  relatedPosts[]->{
    _id,
    "title": title,
    "slug": slug.current,
    featuredImage {
      asset->{
        url
      }
    },
    category->{
      _id,
      "name": name,
      "slug": slug.current
    },
    _updatedAt
  },
  "metaTitle": metaTitle,
  "metaDescription": metaDescription,
  ogImage {
    asset->{
      url
    }
  },
  _createdAt,
  _updatedAt,
}
`;

export const getAllBlogPostsSlugsQuery = () => `
*[_type == "blogPost"] {
  "slug": slug.current
}
`;

// Homepage query
export const getHomePageQuery = () => `
*[_type == "homePage"][0] {
  _id,
  heroSection {
    mainHeading,
    animatedTexts,
    subheading,
    ctaButtons[] {
      label,
      url,
      openInNewTab,
      buttonType
    }
  },
  clientSection {
    title,
    stats[] {
      title,
      description
    },
    partnerLogos[] {
      name,
      alt,
      logo {
        asset-> {
          url
        }
      }
    }
  },
  animatedSections {
    mainTitle,
    offers[] {
      title,
      headline,
      tagline,
      subTagline,
      features[] {
        icon,
        text
      },
      afterFeaturesText
    },
    statsTitle,
    statsSubtitle,
    stats[] {
      value,
      label,
      icon
    },
    centerImage {
      asset-> {
        url
      }
    },
    stepImages[] {
      asset-> {
        url
      }
    }
  },
  valuePropsSection {
    title,
    cards[] {
      icon,
      title,
      description
    }
  },
  getStartedSection {
    logo {
      asset-> {
        url
      }
    },
    heading,
    bodyText,
    chips[] {
      icon,
      text
    },
    ctaButtons[] {
      label,
      url,
      openInNewTab,
      buttonType
    },
    backgroundImage {
      asset-> {
        url
      }
    }
  },
  testimonialsSection {
    title,
    testimonials[] {
      quote,
      name,
      title,
      company,
      image {
        asset-> {
          url
        }
      },
      savings
    }
  },
  faqSection {
    title,
    faqs[] {
      question,
      answer
    }
  },
  metaTitle,
  metaDescription,
  ogImage {
    asset-> {
      url
    }
  }
}
`;

// CTO Page query
export const getCTOPageQuery = () => `
*[_type == "ctoPage"][0] {
  _id,
  heroSection {
    mainHeading,
    animatedTexts,
    subheading,
    animatedTextLabel,
    ctaButtons[] {
      label,
      url,
      openInNewTab,
      buttonType
    }
  },
  clientSection {
    title,
    stats[] {
      title,
      description
    },
    partnerLogos[] {
      name,
      alt,
      logo {
        asset-> {
          url
        }
      }
    }
  },
  howWeSolveSection {
    title,
    subtitle,
    painPoints[] {
      title,
      description,
      color
    },
    solutions[] {
      title,
      description,
      color
    },
    video {
      asset-> {
        url
      }
    },
    videoUrl
  },
  howItWorksSection {
    mainTitle,
    subtitle,
    tabs[] {
      id,
      label,
      iconName,
      heading,
      oneLiner,
      benefitsHeading,
      benefits,
      features[] {
        heading,
        oneLiner,
        details,
        image {
          asset-> {
            url
          }
        },
        isReversed
      }
    }
  },
  statsSection {
    title,
    subtitle,
    stats[] {
      value,
      label,
      icon
    },
    centerImage {
      asset-> {
        url
      }
    }
  },
  getStartedSection {
    logo {
      asset-> {
        url
      }
    },
    heading,
    bodyText,
    chips[] {
      icon,
      text
    },
    ctaButtons[] {
      label,
      url,
      openInNewTab,
      buttonType
    },
    backgroundImage {
      asset-> {
        url
      }
    },
    whatsappLink,
    scheduleLink
  },
  testimonialsSection {
    title,
    testimonials[] {
      quote,
      name,
      title,
      company,
      image {
        asset-> {
          url
        }
      },
      savings
    }
  },
  metaTitle,
  metaDescription,
  ogImage {
    asset-> {
      url
    }
  }
}
`;

// Cost Optimisation Page query
export const getCostOptimisationPageQuery = () => `
*[_type == "costOptimisationPage"][0] {
  _id,
  heroSection {
    mainHeading,
    subheading,
    animatedTexts,
    animatedTextPrefix,
    animatedTextSuffix,
    ctaButtons[] {
      label,
      url,
      openInNewTab,
      buttonType
    },
    heroImage {
      asset-> {
        url
      }
    }
  },
  clientSection {
    title,
    stats[] {
      title,
      description
    },
    partnerLogos[] {
      name,
      alt,
      logo {
        asset-> {
          url
        }
      }
    }
  },
  industryFactsSection {
    title,
    subtitle,
    facts[] {
      fact,
      source,
      report,
      image {
        asset-> {
          url
        }
      }
    }
  },
  rootCaseSection {
    title,
    video {
      asset-> {
        url
      }
    },
    videoUrl
  },
  testimonialsSection {
    title,
    testimonials[] {
      quote,
      name,
      title,
      company,
      image {
        asset-> {
          url
        }
      },
      savings
    }
  },
  ourApproachSection {
    title,
    subtitle,
    steps[] {
      heading,
      oneLiner,
      details,
      image {
        asset-> {
          url
        }
      },
      isReversed
    }
  },
  getStartedSection {
    logo {
      asset-> {
        url
      }
    },
    heading,
    bodyText,
    chips[] {
      icon,
      text
    },
    ctaButtons[] {
      label,
      url,
      openInNewTab,
      buttonType
    },
    backgroundImage {
      asset-> {
        url
      }
    },
    whatsappLink,
    scheduleLink
  },
  stepsSection {
    title,
    subtitle,
    steps[] {
      headline,
      duration,
      points,
      iconName,
      image {
        asset-> {
          url
        }
      }
    }
  },
  metaTitle,
  metaDescription,
  ogImage {
    asset-> {
      url
    }
  }
}
`;

// Contact Us Page query
export const getContactUsPageQuery = () => `
*[_type == "contactUsPage"][0] {
  _id,
  heroSection {
    mainHeading,
    subheading,
    description,
    bullets,
    ctaButtons[] {
      label,
      url,
      openInNewTab,
      buttonType
    },
    phoneNumber,
    phoneLink,
    emailAddress,
    emailLink
  },
  formSection {
    title,
    description
  },
  metaTitle,
  metaDescription,
  ogImage {
    asset-> {
      url
    }
  }
}
`;