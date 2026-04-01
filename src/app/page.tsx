"use client";

import Hero from "@/components/Hero";
import LeadCapture from "@/components/LeadCapture";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Mission from "@/components/Mission";
import TeamValues from "@/components/TeamValues";
import QAForm from "@/components/QAForm";
import FAQ from "@/components/FAQ";
import AggressiveRoofingSection from "@/components/RoofingExperts";
import HowWeWork from "@/components/HowWeWork";
import QuickQuote from "@/components/QuickQuote";

export default function Index() {
  return (
    <div className="relative">
      <Hero />
      <section id="roofingexperts">
        <AggressiveRoofingSection />
      </section>
      <section id="services">
        <Services />
      </section>
      <TeamValues />
      <section id="portfolio">
        <Portfolio />
      </section>
      <Testimonials />
      <section id="about">
        <HowWeWork />
      </section>

      <section id="contact">
        <QAForm />
      </section>
      <section id="faq">
        <FAQ />
      </section>

      {/* ✅ Quick Quote Widget */}
      <QuickQuote />
    </div>
  );
}
