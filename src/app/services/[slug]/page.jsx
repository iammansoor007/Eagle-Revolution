import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import breakcrumb from '../../../assets/Breadcrumb-Image.jpeg';
import { 
  Home, Layout, TreePine, Building2, Building, Droplets, 
  CheckCircle, ArrowRight, Phone, Calendar, Clock, Shield, Award,
  ChevronRight, Star, ThumbsUp, Truck, Wrench, HelpCircle, Sparkles
} from 'lucide-react';
import servicesData from '../../../src/data/completeData.json';

// Import images
import roofingImg from '@/assets/portfolio1.png';
import windowsImg from '@/assets/portfolio2.jpg';
import decksImg from '@/assets/portfolio3.jpg';
import commercialImg from '@/assets/portfolio4.jpg';
import sidingImg from '@/assets/portfolio5.jpg';

const iconMap = {
  Home, Layout, TreePine, Building2, Building, Droplets
};

const imageMap = {
  'Residential Roofing': roofingImg,
  'Windows & Doors': windowsImg,
  'Custom Decks': decksImg,
  'Commercial Roofing': commercialImg,
  'Siding, Soffit & Fascia': sidingImg,
  'Gutters & Protection': sidingImg,
};

export async function generateStaticParams() {
  const services = servicesData.services.services;
  return services.map(service => ({
    slug: service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }));
}

// Fixed: Removed TypeScript type annotation
function Clipboard({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

// Fixed: Removed TypeScript type annotation for params
export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  
  const allServices = servicesData.services.services.map(service => ({
    ...service,
    slug: service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    image: imageMap[service.title] || roofingImg
  }));

  const service = allServices.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  const IconComponent = iconMap[service.icon] || Home;

  const faqs = [
    {
      question: `How long does a typical ${service.title.toLowerCase()} project take?`,
      answer: `Most ${service.title.toLowerCase()} projects are completed within 1-3 days depending on the scope and weather conditions. We'll provide a detailed timeline during your free consultation.`
    },
    {
      question: `Are you licensed and insured for ${service.title.toLowerCase()}?`,
      answer: `Yes, Eagle Revolution is fully licensed, bonded, and insured for all ${service.title.toLowerCase()} services. We carry comprehensive liability and workers' compensation insurance.`
    },
    {
      question: `Do you offer financing options for ${service.title.toLowerCase()}?`,
      answer: `Absolutely! We offer flexible financing options with approved credit. Ask your estimator for details or call our office to learn more about payment plans.`
    },
    {
      question: `What areas do you serve for ${service.title.toLowerCase()}?`,
      answer: `We serve the greater St. Louis metropolitan area including St. Charles, St. Louis County, Jefferson County, and surrounding communities.`
    },
    {
      question: `How do I schedule a free estimate?`,
      answer: `Simply fill out the form on this page or call us at 636-449-9714 to schedule your free, no-obligation estimate. We typically respond within 24 hours.`
    }
  ];

  const benefits = [
    { icon: Shield, title: "50-Year Warranty", description: "All our work comes with a comprehensive 50-year warranty for your peace of mind." },
    { icon: Award, title: "Certified Professionals", description: "Factory-trained and certified installers who follow strict quality standards." },
    { icon: ThumbsUp, title: "100% Satisfaction", description: "We don't stop until you're completely happy with the finished result." },
    { icon: Clock, title: "On-Time Delivery", description: "We respect your schedule and complete projects within agreed timelines." }
  ];

  const processSteps = [
    { icon: Phone, title: "Free Consultation", description: "Reach out to schedule your no-obligation estimate and project discussion." },
    { icon: Clipboard, title: "Detailed Proposal", description: "We provide a clear, itemized quote with transparent pricing and options." },
    { icon: Truck, title: "Material Delivery", description: "Quality materials delivered to your site, ready for professional installation." },
    { icon: Wrench, title: "Expert Installation", description: "Our certified team installs with precision, care, and attention to detail." },
    { icon: CheckCircle, title: "Final Inspection", description: "Thorough walkthrough to ensure every detail meets our high standards." }
  ];

  return (
    <main className="bg-white">
      {/* Hero Section - Left aligned breadcrumbs and title */}
      <section className="relative">
        <div className="relative h-[350px] md:h-[400px] w-full overflow-hidden">
          <Image src={breakcrumb} alt={service.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        {/* Left-aligned content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="max-w-2xl">
              {/* Breadcrumbs - Left aligned */}
              <div className="flex items-center gap-2 text-sm mb-4">
                <Link href="/" className="text-white/70 hover:text-white transition-colors duration-300">Home</Link>
                <ChevronRight className="w-4 h-4 text-white/40" />
                <Link href="/services" className="text-white/70 hover:text-white transition-colors duration-300">Services</Link>
                <ChevronRight className="w-4 h-4 text-white/40" />
                <span className="text-white font-medium">{service.title}</span>
              </div>
              
              {/* Title - Left aligned */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {service.title}
              </h1>
              
              {/* Accent line */}
              <div className="w-20 h-1 bg-[#2430D2] mb-4" />
              
              <p className="text-white/80 text-lg max-w-xl">
                Professional {service.title.toLowerCase()} services you can trust
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#2430D2]/10 rounded-xl flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-[#2430D2]" />
                </div>
                <span className="text-sm font-semibold text-[#2430D2] uppercase tracking-wider">{service.tag}</span>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-8">{service.description}</p>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
                <div className="grid gap-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 group">
                      <div className="w-5 h-5 rounded-full bg-[#2430D2]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#2430D2] transition-colors duration-300">
                        <CheckCircle className="w-3.5 h-3.5 text-[#2430D2] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#2430D2] text-white rounded-full text-sm font-semibold hover:bg-[#1A24A8] transition-all duration-300 shadow-lg shadow-[#2430D2]/20 hover:shadow-xl hover:shadow-[#2430D2]/30 hover:-translate-y-0.5"
                >
                  Get Free Estimate <ArrowRight className="w-4 h-4" />
                </Link>
                <a 
                  href="tel:636-449-9714" 
                  className="flex items-center gap-2 px-8 py-4 border-2 border-gray-200 rounded-full text-gray-700 font-semibold hover:border-[#2430D2] hover:text-[#2430D2] transition-all duration-300"
                >
                  <Phone className="w-4 h-4" /> <span>636-449-9714</span>
                </a>
              </div>
            </div>
            
            <div className="relative h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
              <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#2430D2]/30 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#2430D2]/30 rounded-br-2xl" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Banner - Blue theme */}
      <section className="py-16 bg-gradient-to-r from-[#2430D2] to-[#1A24A8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Clock, label: 'Typical Timeline', value: '1-3 Days' },
              { icon: Shield, label: 'Warranty', value: '50 Years' },
              { icon: Award, label: 'Certification', value: 'Pro Installer' },
              { icon: Star, label: 'Customer Rating', value: '5.0 ★' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors duration-300">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-24 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#2430D2]/5 px-4 py-2 rounded-full border border-[#2430D2]/10 mb-6">
              <Sparkles className="w-4 h-4 text-[#2430D2]" />
              <span className="text-[#2430D2] uppercase tracking-wider text-xs font-semibold">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Eagle Revolution
            </h2>
            <p className="text-gray-600 text-lg">
              We deliver exceptional quality and value on every project
            </p>
            <div className="w-20 h-1 bg-[#2430D2] mx-auto mt-6" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => {
              const BenefitIcon = benefit.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-[#2430D2]/10 transition-all duration-300 border border-gray-100 hover:border-[#2430D2]/20 group"
                >
                  <div className="w-14 h-14 bg-[#2430D2]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#2430D2] transition-colors duration-300">
                    <BenefitIcon className="w-7 h-7 text-[#2430D2] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Process */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#2430D2]/5 px-4 py-2 rounded-full border border-[#2430D2]/10 mb-6">
              <Wrench className="w-4 h-4 text-[#2430D2]" />
              <span className="text-[#2430D2] uppercase tracking-wider text-xs font-semibold">
                How It Works
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Simple Process
            </h2>
            <p className="text-gray-600 text-lg">
              From consultation to completion, we make it easy
            </p>
            <div className="w-20 h-1 bg-[#2430D2] mx-auto mt-6" />
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {processSteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={idx} className="text-center relative group">
                  {idx < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-9 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[#2430D2]/30 to-[#2430D2]/10" />
                  )}
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-[#2430D2]/20 group-hover:border-[#2430D2] group-hover:shadow-[#2430D2]/20 transition-all duration-300">
                      <StepIcon className="w-8 h-8 text-[#2430D2]" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-24 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#2430D2]/5 px-4 py-2 rounded-full border border-[#2430D2]/10 mb-6">
              <HelpCircle className="w-4 h-4 text-[#2430D2]" />
              <span className="text-[#2430D2] uppercase tracking-wider text-xs font-semibold">
                Got Questions?
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1 bg-[#2430D2] mx-auto mt-6" />
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-[#2430D2]/20 hover:shadow-md transition-all duration-300">
                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-3">
                  <span className="text-[#2430D2] font-bold">Q:</span>
                  {faq.question}
                </h4>
                <p className="text-gray-600 flex items-start gap-3">
                  <span className="text-[#2430D2] font-bold">A:</span>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-r from-[#2430D2] to-[#1A24A8]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 text-lg mb-10">
            Contact us today for a free, no-obligation estimate
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#2430D2] rounded-full text-sm font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Free Estimate <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="tel:636-449-9714" 
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-full text-sm font-bold hover:bg-white/10 transition-all duration-300"
            >
              <Phone className="w-4 h-4" /> Call 636-449-9714
            </a>
          </div>
          <p className="text-white/60 text-sm mt-8">Serving Greater St. Louis Area | Licensed & Insured</p>
        </div>
      </section>
      
      {/* Related Services */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Our Other Services</h2>
              <div className="w-16 h-0.5 bg-[#2430D2]" />
            </div>
            <Link 
              href="/services" 
              className="text-[#2430D2] font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-300"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {allServices.filter(s => s.slug !== service.slug).slice(0, 3).map((s, idx) => {
              const OtherIcon = iconMap[s.icon] || Home;
              return (
                <Link key={idx} href={`/services/${s.slug}`} className="group">
                  <div className="flex items-center gap-5 p-6 bg-gray-50 rounded-xl hover:bg-white border border-gray-100 hover:border-[#2430D2]/20 hover:shadow-lg hover:shadow-[#2430D2]/10 transition-all duration-300">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-[#2430D2] transition-colors duration-300">
                      <OtherIcon className="w-6 h-6 text-[#2430D2] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-[#2430D2] transition-colors duration-300">{s.title}</h3>
                      <p className="text-sm text-gray-500">{s.tag}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#2430D2] group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}