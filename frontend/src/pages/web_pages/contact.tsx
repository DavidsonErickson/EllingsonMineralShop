import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  ContactFormDesigns,
  HeroDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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

  const faqs = [
    {
      question: 'What types of telescopes do you offer?',
      answer:
        'We offer a wide range of telescopes, including refractors, reflectors, and compound telescopes. Each type is designed to cater to different stargazing needs, from beginners to advanced astronomers.',
    },
    {
      question: 'How can I place an order?',
      answer:
        'To place an order, simply browse our product catalog, add items to your cart, and proceed to checkout. You can complete your purchase as a guest or create an account for a faster checkout experience in the future.',
    },
    {
      question: 'What is your return policy?',
      answer:
        "We offer a 30-day return policy for all our products. If you're not satisfied with your purchase, you can return it for a full refund or exchange, provided it is in its original condition.",
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Yes, we ship our products worldwide. Shipping costs and delivery times vary depending on your location. You can find more details during the checkout process.',
    },
    {
      question: 'How can I contact customer support?',
      answer:
        'You can reach our customer support team via the contact form on our website or by emailing us directly. We strive to respond to all inquiries within 24 hours.',
    },
    {
      question: 'Are there any discounts available?',
      answer:
        'We offer seasonal discounts and promotions. Sign up for our newsletter to stay updated on the latest deals and offers.',
    },
    {
      question: 'Can I track my order?',
      answer:
        "Yes, once your order is shipped, you will receive a tracking number via email. You can use this number to track your order's progress on our website or the carrier's site.",
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Get in Touch with ${projectName}`}</title>
        <meta
          name='description'
          content={`Reach out to us for any inquiries or support. Our team at ${projectName} is here to assist you with your stargazing needs.`}
        />
      </Head>
      <WebSiteHeader
        projectName={'Ellingson Mineral Company of New York, New York'}
      />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Ellingson Mineral Company of New York, New York'}
          image={['Customer service representative smiling']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`We're here to help with any questions or support you need. Contact our team at ${projectName} and let us assist you in your stargazing journey.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Contact Us`}
        />

        <FaqSection
          projectName={'Ellingson Mineral Company of New York, New York'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'Ellingson Mineral Company of New York, New York'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on a laptop']}
          mainText={`Reach Out to ${projectName} `}
          subTitle={`We're available to assist you with any inquiries or support. Contact us anytime, and our team will respond promptly to ensure your satisfaction.`}
        />
      </main>
      <WebSiteFooter
        projectName={'Ellingson Mineral Company of New York, New York'}
      />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
