import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../stores/hooks';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  PricingDesigns,
  AboutUsDesigns,
  ContactFormDesigns,
} from '../components/WebPageComponents/designs';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

import PricingSection from '../components/WebPageComponents/PricingComponent';

import AboutUsSection from '../components/WebPageComponents/AboutUsComponent';

import ContactFormSection from '../components/WebPageComponents/ContactFormComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'Ellingson Mineral Company of New York, New York';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/products',
      label: 'products',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },

    {
      href: '/pricing',
      label: 'pricing',
    },
  ];

  const features_points = [
    {
      name: 'Wide Product Range',
      description:
        'Choose from a diverse selection of telescopes and accessories tailored to both beginners and seasoned astronomers. Find the perfect fit for your stargazing needs.',
      icon: 'mdiTelescope',
    },
    {
      name: 'User-Friendly Interface',
      description:
        'Navigate our site with ease. Our intuitive design ensures a smooth shopping experience, allowing you to find and purchase products effortlessly.',
      icon: 'mdiMonitor',
    },
    {
      name: 'Secure Checkout',
      description:
        'Shop with confidence. Our secure checkout process protects your personal and payment information, ensuring a safe transaction every time.',
      icon: 'mdiLock',
    },
  ];

  const pricing_features = {
    standard: {
      features: [
        'Access to basic telescopes',
        'Standard customer support',
        'Monthly newsletter',
      ],
      limited_features: ['Limited product range', 'Basic analytics'],
    },
    premium: {
      features: [
        'Access to all telescopes',
        'Priority customer support',
        'Weekly newsletter',
      ],
      also_included: ['Advanced analytics', 'Exclusive discounts'],
    },
    business: {
      features: [
        'Custom telescope solutions',
        'Dedicated account manager',
        'Daily insights and reports',
      ],
    },
  };

  const description = {
    standard:
      'Ideal for individual stargazers looking to explore the universe with essential tools and support.',
    premium:
      'Perfect for small businesses or astronomy clubs seeking a comprehensive range of products and enhanced support.',
    business:
      'Designed for enterprises requiring tailored solutions, dedicated support, and in-depth analytics.',
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>Ellingson Mineral Company – Everything a morally flexible enterprise needs</title>
        <meta name='description' content='From mining rare earths to erasing digital footprints, Ellingson offers everything a morally flexible enterprise needs.' />
      </Head>
      <WebSiteHeader
        projectName={'Ellingson Mineral Company of New York, New York'}
        pages={pages}
      />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Ellingson Mineral Company of New York, New York'}
          image={['Stargazing with a telescope']}
          mainText={`Explore the Universe with ${projectName}`}
          subTitle={`From mining rare earths to erasing digital footprints, Ellingson offers everything a morally flexible enterprise needs—whether you’re digging for gold or digging into government servers.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Shop Now`}
        />

        <FeaturesSection
          projectName={'Ellingson Mineral Company of New York, New York'}
          image={['Telescopes and accessories display']}
          withBg={1}
          features={features_points}
          mainText={`Discover the Benefits of ${projectName}`}
          subTitle={`Explore the unique features of ${projectName} that make your stargazing experience seamless and enjoyable.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <PricingSection
          projectName={'Ellingson Mineral Company of New York, New York'}
          withBg={1}
          features={pricing_features}
          description={description}
        />

        <AboutUsSection
          projectName={'Ellingson Mineral Company of New York, New York'}
          image={['Team exploring the night sky']}
          mainText={`Unveiling the Universe with ${projectName}`}
          subTitle={`At ${projectName}, we are passionate about bringing the wonders of the cosmos closer to you. Our mission is to provide high-quality telescopes and accessories that inspire exploration and discovery.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
        />

        <ContactFormSection
          projectName={'Ellingson Mineral Company of New York, New York'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person using a telescope']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`We're here to assist you with any inquiries or support you need. Reach out to us anytime, and we'll respond promptly to ensure your stargazing experience is stellar.`}
        />
      </main>
      <WebSiteFooter
        projectName={'Ellingson Mineral Company of New York, New York'}
        pages={pages}
      />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
