// src/pages/GeneratorPage.jsx
import React, { useState } from 'react';
import { FiLayers, FiEye, FiStar, FiRotateCw } from 'react-icons/fi';
import PaletteGenerator from '../components/PaletteGenerator';
import AccessibilityChecker from '../components/AccessibilityChecker';
import ColorRolesDisplay from '../components/ColorRolesDisplay';
import ColorHarmony from '../components/ColorHarmony';
import SectionLayout from '../components/layout/SectionLayout';

const GeneratorPage = ({ currentPalette, onPaletteGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Palette Generator</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Create beautiful, accessible color palettes with advanced AI technology
        </p>
      </div>

      {/* Generator Section */}
      <SectionLayout
        title="Create Your Palette"
        subtitle="AI-powered generation with advanced role classification and accessibility"
        icon={FiLayers}
        theme="orange"
        actions={
          <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-green-700">AI Ready</span>
          </div>
        }
      >
        <PaletteGenerator
          onPaletteGenerated={onPaletteGenerated}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
      </SectionLayout>

      {/* Results Sections */}
      {currentPalette.length > 0 && (
        <>
          {/* AI Role Classification */}
          <SectionLayout
            title="AI Role Classification & Generated Palette"
            subtitle="Your AI-enhanced palette with roles, usage tips, and export options"
            icon={FiStar}
            theme="purple"
            actions={
              <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
                <span className="text-xs font-semibold text-purple-700">
                  {currentPalette.length} Colors · Smart Assignment
                </span>
              </div>
            }
          >
          {/* AI Role Classification */}
          <ColorRolesDisplay palette={currentPalette} />
        </SectionLayout>


          {/* Color Harmony Analysis */}
          <SectionLayout
            title="Color Harmony Generator"
            subtitle="Explore color theory relationships and create variations"
            icon={FiRotateCw}
            theme="orange"
            actions={
              <div className="flex items-center space-x-2 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200">
                <span className="text-xs font-semibold text-orange-700">Theory-Based</span>
              </div>
            }
          >
            <ColorHarmony
              baseColor={currentPalette[0]?.hex || '#F97316'}
              onPaletteGenerated={onPaletteGenerated}
            />
          </SectionLayout>

          {/* Advanced Accessibility Check */}
          <SectionLayout
            title="Advanced Accessibility Analysis"
            subtitle="WCAG compliance and comprehensive color vision testing with LMS simulation"
            icon={FiEye}
            theme="green"
            actions={
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                <span className="text-xs font-semibold text-green-700">Live Analysis</span>
              </div>
            }
          >
            <AccessibilityChecker palette={currentPalette} />
          </SectionLayout>
        </>
      )}

      {/* Empty State Call to Action */}
      {currentPalette.length === 0 && (
        <div className="bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 rounded-3xl p-16 text-center border-2 border-orange-200">
          <div className="flex justify-center space-x-4 mb-8">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-2xl shadow-lg animate-bounce">
              <FiLayers className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Create Your First AI Palette?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Use the generator above to create your first intelligent color palette.
            Describe your vision, upload an inspiring image, or let AI surprise you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white/80 px-4 py-3 rounded-full border border-orange-200">
              <FiLayers className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">Advanced AI Generation</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 px-4 py-3 rounded-full border border-purple-200">
              <FiStar className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Smart Role Assignment</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 px-4 py-3 rounded-full border border-green-200">
              <FiEye className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">WCAG Tested</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratorPage;
