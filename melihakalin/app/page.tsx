import HomeContainer from '@/components/HomePage/HomeContainer';
import { categories, featuredServices, testimonials } from '@/data/constants';
import FeaturedServicesCard from '@/components/HomePage/FeaturedServicesCard';
import TestimonialCard from '@/components/HomePage/TestimonialCard';
import HeroSection from '@/components/HomePage/HeroSection';

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <HomeContainer className="bg-gray-100" title="Kategoriye Göre Keşfedin">
        {categories.map((item) => {
          return (
            <FeaturedServicesCard
              className="text-center"
              key={item.title}
              {...item}
            />
          );
        })}
      </HomeContainer>
      <HomeContainer title="Önerilen Hizmetler">
        {featuredServices.map((item) => {
          return <FeaturedServicesCard key={item.id} {...item} />;
        })}
      </HomeContainer>
      <HomeContainer
        className="bg-gray-100"
        id="testimonial"
        title="Müşteri Yorumları"
      >
        {testimonials.map((item) => {
          return <TestimonialCard key={item.name} {...item} />;
        })}
      </HomeContainer>
    </main>
  );
}
