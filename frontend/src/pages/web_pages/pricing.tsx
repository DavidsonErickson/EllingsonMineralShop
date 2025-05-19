import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  PricingDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'trial flatlogic otel astronomy shop';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);

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
        <title>{`Affordable Plans at ${projectName}`}</title>
        <meta
          name='description'
          content={`Explore our competitive pricing plans at ${projectName}. Choose the perfect plan that suits your stargazing needs and budget.`}
        />
      </Head>
      <WebSiteHeader projectName={'trial flatlogic otel astronomy shop'} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'trial flatlogic otel astronomy shop'}
          image={['Telescope pricing options display']}
          mainText={`Choose Your Perfect Plan at ${projectName}`}
          subTitle={`Discover flexible pricing options tailored to meet your stargazing needs. At ${projectName}, we offer plans that provide value and quality for every astronomer.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`View Plans`}
        />

        <PricingSection
          projectName={'trial flatlogic otel astronomy shop'}
          withBg={0}
          features={pricing_features}
          description={description}
        />
      </main>
      <WebSiteFooter projectName={'trial flatlogic otel astronomy shop'} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
