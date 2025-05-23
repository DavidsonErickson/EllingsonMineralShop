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
  const projectName = 'Ellingson Mineral Company of New York, New York';

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
      <WebSiteHeader
        projectName={'Ellingson Mineral Company of New York, New York'}
      />
      <main className="flex-grow bg-white rounded-none">
        <section className="py-12 container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Public Site</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Products</h3>
              <ul className="list-disc list-inside">
                <li>GeoSonar 9000 – Advanced mineral survey and seismic mapping kit. $666.00</li>
                <li>EllingsonCore Drills – Precision drilling rigs for deep-core mineral extraction. $420,000.00</li>
                <li>ThermoX Ore Analyzers – Portable spectrometers for rapid mineral analysis. $1234.00</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Services</h3>
              <ul className="list-disc list-inside">
                <li>Remote Geological Consulting – AI-assisted subsurface modeling and viability assessments. $1,000,000.00</li>
                <li>Enterprise Resource Planning (ERP) for Mining – Full-stack digital management suite for logistics, compliance, and forecasting. $2,000,000.00</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="py-12 container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Advanced Products and Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Products</h3>
              <ul className="list-disc list-inside">
                <li>GibsonBackdoor v4.7 – Zero-day backdoor exploit kits tailored for legacy enterprise mainframes. Call for Quote</li>
                <li>DeepMine Ledger Wiper – Blockchain obfuscation tool for erasing transactional footprints. Call for Quote</li>
                <li>NeuroPhage Drive – AI-enhanced phishing automation platform with voice clone capabilities. Call for Quote</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Services</h3>
              <ul className="list-disc list-inside">
                <li>Corporate Sabotage-as-a-Service (CSaaS) – Includes logic bomb deployment, data corruption, and disinformation campaigns. Call for Quote</li>
                <li>Asset Reallocation Services – Silent fund siphoning via shell companies and ghost transactions, with laundering pipeline included. Call for Quote</li>
              </ul>
            </div>
          </div>
        </section>
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
