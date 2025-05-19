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
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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

  const faqs = [
    {
      question: 'What is the warranty on your telescopes?',
      answer:
        'All our telescopes come with a one-year warranty covering manufacturing defects. If you encounter any issues, please contact our support team for assistance.',
    },
    {
      question: 'How do I choose the right telescope?',
      answer:
        'Consider your experience level and what you want to observe. Beginners might start with a refractor, while advanced users may prefer a reflector for deep-sky viewing.',
    },
    {
      question: 'Can I upgrade my telescope later?',
      answer:
        'Yes, many of our telescopes are compatible with additional lenses and accessories, allowing you to enhance your stargazing experience as you grow more experienced.',
    },
    {
      question: 'Do you offer assembly instructions?',
      answer:
        'Yes, each telescope comes with a detailed manual. Additionally, you can find video tutorials on our website to guide you through the setup process.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept major credit cards, PayPal, and other secure payment options. You can choose your preferred method during checkout.',
    },
    {
      question: 'How can I track my order?',
      answer:
        "Once your order is shipped, you will receive a tracking number via email. Use this number to monitor your shipment's progress on our website or the carrier's site.",
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about our products, services, and policies at ${projectName}. Get the information you need to enhance your stargazing experience.`}
        />
      </Head>
      <WebSiteHeader projectName={'trial flatlogic otel astronomy shop'} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'trial flatlogic otel astronomy shop'}
          image={['Astronomy FAQ illustration']}
          mainText={`Your Questions Answered at ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your most pressing questions about our products and services. At ${projectName}, we're here to help you navigate your stargazing journey.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Learn More`}
        />

        <FaqSection
          projectName={'trial flatlogic otel astronomy shop'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'trial flatlogic otel astronomy shop'} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
