import FooterContent from "@/components/FooterContent";
import AboutSection from "@/components/home/AboutSection";
import BannerSection from "@/components/home/BannerSection";
import BlogsSection from "@/components/home/BlogsSection";
import CategorySlider from "@/components/home/CategorySlider";
import ContactSection from "@/components/home/ContactSection";
import FeatureCard from "@/components/home/FeatureCard";
import TestimonialSection from "@/components/home/TestimonialSection";
import { getBlogs, getHomeBanners, getHomePageData, getTestimonials } from "@/lib/api";
import { Banner, HomepageContent } from "@/types";

export default async function HomePage() {
  const homepageContent: HomepageContent = await getHomePageData();
  const bannerData: Banner[] = await getHomeBanners();
  const {testimonials} = await getTestimonials();
  const {blogs} = await getBlogs();

  return (
    <>
      <BannerSection data={bannerData} />
      <FeatureCard />
      <CategorySlider
        heading={homepageContent.main_heading}
        description={homepageContent.description_paragraph}
      />
      <AboutSection
        heading={homepageContent.about_section.subtitle}
        description={homepageContent.about_section.description}
        imgBig={homepageContent.about_section.image}
        imgBig_alt={homepageContent.about_section.image_alt_text}
        imgSmall={homepageContent.about_section.video_url}
      />
      <TestimonialSection data={testimonials} />
      <BlogsSection data={blogs} />
      <ContactSection />
      <FooterContent content={homepageContent.content} isFullPage={false}/>
    </>
  );
}
