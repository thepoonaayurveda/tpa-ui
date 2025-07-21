import { AuthenticHeroSection } from "@/components/home/AuthenticHeroSection";
import { AuthenticProductGrid } from "@/components/home/AuthenticProductGrid";
import { VideoPopupSection } from "@/components/home/VideoPopupSection";
import { MissionSection } from "@/components/home/MissionSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div>
      <AuthenticHeroSection />
      <AuthenticProductGrid />
      <VideoPopupSection />
      <MissionSection />
      <TestimonialSection />
      <NewsletterSection />
    </div>
  );
}
