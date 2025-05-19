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
  GalleryPortfolioDesigns,
  FeaturesDesigns,
  PricingDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import GalleryPortfolioSection from '../../components/WebPageComponents/GalleryPortfolioComponent';

import { getMultiplePexelsImages } from '../../helpers/pexels';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

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

  const [images, setImages] = useState([]);
  const pexelsQueriesWebSite = [
    'Astronomer using a telescope',
    'Close-up of telescope lens',
    'Starry night sky observation',
    'Telescope setup on a tripod',
    'Astronomy equipment display',
    'Family stargazing together',
  ];
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getMultiplePexelsImages(pexelsQueriesWebSite);
        const formattedImages = (images || []).map((image) => ({
          src: image?.src || undefined,
          photographer: image?.photographer || undefined,
          photographer_url: image?.photographer_url || undefined,
        }));
        setImages(formattedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const features_points = [
    {
      name: 'High-Quality Optics',
      description:
        'Our telescopes are equipped with premium optics, ensuring clear and sharp views of celestial objects. Experience the universe like never before.',
      icon: 'mdiTelescope',
    },
    {
      name: 'User-Friendly Design',
      description:
        'Designed with ease of use in mind, our telescopes are perfect for both beginners and experienced astronomers. Set up and start exploring in minutes.',
      icon: 'mdiMonitor',
    },
    {
      name: 'Durable Construction',
      description:
        'Built to last, our telescopes are made from high-quality materials that withstand the test of time and the elements, ensuring long-lasting performance.',
      icon: 'mdiShieldCheck',
    },
  ];

  const pricing_features = {
    standard: {
      features: [
        'Basic telescope access',
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
        <title>{`Explore Our Telescope Collection - ${projectName}`}</title>
        <meta
          name='description'
          content={`Browse our extensive range of telescopes and astronomy equipment. Find the perfect tools to enhance your stargazing experience with ${projectName}.`}
        />
      </Head>
      <WebSiteHeader projectName={'trial flatlogic otel astronomy shop'} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'trial flatlogic otel astronomy shop'}
          image={['Variety of telescopes on display']}
          mainText={`Discover Your Perfect Telescope Today`}
          subTitle={`Explore our curated selection of high-quality telescopes and accessories at ${projectName}. Whether you're a beginner or a seasoned astronomer, find the perfect tools to enhance your stargazing experience.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Shop Now`}
        />

        <GalleryPortfolioSection
          projectName={'trial flatlogic otel astronomy shop'}
          images={images}
          mainText={`Explore Our Stellar Collection`}
          design={GalleryPortfolioDesigns.HORIZONTAL_WITH_BUTTONS || ''}
        />

        <FeaturesSection
          projectName={'trial flatlogic otel astronomy shop'}
          image={['Telescope with starry background']}
          withBg={1}
          features={features_points}
          mainText={`Unveiling the Features of ${projectName}`}
          subTitle={`Discover the unique features that make our products stand out. At ${projectName}, we ensure quality and innovation in every telescope.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
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
