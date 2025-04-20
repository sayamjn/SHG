import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from '../components/about/Carousel';
import Accordion from '../components/about/Accordion';
import { FaInfoCircle, FaHistory, FaHandHoldingHeart } from 'react-icons/fa';

const About = () => {
  const { t } = useTranslation();
  
  // Mock data for carousel images
  const carouselImages = [
    {
      src: '/images/carousel/shg-01.jpg',
      alt: 'SHG members in a meeting',
      caption: 'Self Help Group meeting in rural Maharashtra'
    },
    {
      src: '/images/carousel/shg-02.jpg',
      alt: 'Women entrepreneurs in a workshop',
      caption: 'Skill development workshop for SHG members'
    },
    {
      src: '/images/carousel/shg-03.jpg',
      alt: 'Handicraft products made by SHG members',
      caption: 'Handicrafts created by SHG members for sale'
    }
  ];
  
  // Mock data for accordion sections
  const accordionSections = [
    {
      id: 'objectives',
      title: t('about.objectives.title'),
      icon: <FaInfoCircle className="mr-2" />,
      content: t('about.objectives.content'),
      lastReviewed: '2024-03-15'
    },
    {
      id: 'history',
      title: t('about.history.title'),
      icon: <FaHistory className="mr-2" />,
      content: t('about.history.content'),
      lastReviewed: '2024-02-28'
    },
    {
      id: 'benefits',
      title: t('about.benefits.title'),
      icon: <FaHandHoldingHeart className="mr-2" />,
      content: t('about.benefits.content'),
      lastReviewed: '2024-04-05'
    }
  ];
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary-800 text-center mb-8">
        {t('about.title')}
      </h1>
      
      {/* Image Carousel */}
      <div className="mb-12">
        <Carousel images={carouselImages} />
      </div>
      
      {/* About Content */}
      <div className="card">
        <p className="text-lg text-gray-700 mb-8">
          Self Help Groups (SHGs) are voluntary associations of people formed to achieve collective goals. 
          In Maharashtra, SHGs have played a crucial role in empowering women, reducing poverty, 
          and promoting financial inclusion. The Maharashtra government provides various support 
          schemes and resources to strengthen these groups.
        </p>
        
        {/* Accordion Sections */}
        <div className="space-y-4">
          {accordionSections.map((section) => (
            <Accordion
              key={section.id}
              title={section.title}
              icon={section.icon}
              content={section.content}
              lastReviewed={section.lastReviewed}
            />
          ))}
        </div>
      </div>
      
      {/* Statistics */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active SHGs', value: '2,50,000+' },
          { label: 'Total Members', value: '30,00,000+' },
          { label: 'Districts Covered', value: '36/36' }
        ].map((stat, index) => (
          <div key={index} className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;