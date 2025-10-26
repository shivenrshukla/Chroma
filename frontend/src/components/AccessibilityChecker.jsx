import React, { useState, useMemo } from 'react';
import { FiAlertTriangle, FiCheck, FiEye, FiInfo, FiShield, FiZap, FiUsers, FiTarget, FiBarChart } from 'react-icons/fi';
import { useColorPalette } from '../hooks/useColorPalette';

const AccessibilityChecker = ({ palette }) => {
  console.log(palette);
  const { checkContrast, simulateColorBlindnessLMS } = useColorPalette();
  const [activeSimulation, setActiveSimulation] = useState('normal');
  const contrastResults = useMemo(() => checkContrast(palette), [palette, checkContrast]);
  const colorBlindResults = useMemo(() => {
    return palette.reduce(
      (acc, color) => {
        acc.normal.push(color.hex);
        acc.protanopia.push(simulateColorBlindnessLMS(color.hex, 'protanopia'));
        acc.deuteranopia.push(simulateColorBlindnessLMS(color.hex, 'deuteranopia'));
        acc.tritanopia.push(simulateColorBlindnessLMS(color.hex, 'tritanopia'));
        acc.achromatopsia.push(simulateColorBlindnessLMS(color.hex, 'achromatopsia'));
        return acc;
      },
      { normal: [], protanopia: [], deuteranopia: [], tritanopia: [], achromatopsia: [] }
    );
  }, [palette, simulateColorBlindnessLMS]);

  if (!palette || palette.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <FiShield className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-700 mb-3">No Palette to Analyze</h3>
        <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
          Generate a color palette above to check its accessibility compliance and color blindness compatibility
        </p>
        <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>WCAG AA/AAA</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Color Vision</span>
          </div>
        </div>
      </div>
    );
  }

  const totalTests = contrastResults.length;
  const hasTests = totalTests > 0;

  const accessibilityScore = hasTests ? Math.round((contrastResults.filter(r => r.passesAA).length / totalTests) * 100) : 0;
  const aaaScore = hasTests ? Math.round((contrastResults.filter(r => r.passesAAA).length / totalTests) * 100) : 0;
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'primary';
    if (score >= 60) return 'amber';
    return 'red';
  };

  const scoreColor = getScoreColor(accessibilityScore);

  const colorBlindnessTypes = {
    normal: { 
      name: 'Normal Vision', 
      icon: FiEye, 
      colors: palette.map(p => p.hex),
      description: 'Standard color perception',
      prevalence: 'Most common'
    },
    protanopia: { 
      name: 'Protanopia', 
      icon: FiUsers, 
      colors: colorBlindResults.protanopia,
      description: 'Red color blindness',
      prevalence: '0.51% of the global population'
    },
    deuteranopia: { 
      name: 'Deuteranopia', 
      icon: FiUsers, 
      colors: colorBlindResults.deuteranopia,
      description: 'Green color blindness',
      prevalence: '1% of males and 0.1% females'
    },
    tritanopia: { 
      name: 'Tritanopia', 
      icon: FiUsers, 
      colors: colorBlindResults.tritanopia,
      description: 'Blue color blindness',
      prevalence: 'Rare (<1%)'
    },
    achromatopsia: { 
      name: 'Achromatopsia', 
      icon: FiUsers, 
      colors: colorBlindResults.achromatopsia,
      description: 'Complete color blindness',
      prevalence: 'Very rare'
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Accessibility Score Header */}
      <div className={`${
        scoreColor === 'primary' 
          ? 'bg-gradient-to-br from-primary-50 to-primary-100/60 border-primary-200' 
          : scoreColor === 'amber'
          ? 'bg-gradient-to-br from-amber-50 to-amber-100/60 border-amber-200'
          : 'bg-gradient-to-br from-red-50 to-red-100/60 border-red-200'
      } p-8 rounded-2xl border shadow-sm`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-2xl shadow-lg ${
              scoreColor === 'primary' 
                ? 'bg-gradient-to-br from-primary-500 to-primary-600' 
                : scoreColor === 'amber'
                ? 'bg-gradient-to-br from-amber-500 to-amber-600'
                : 'bg-gradient-to-br from-red-500 to-red-600'
            }`}>
              <FiShield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Accessibility Score</h3>
              <p className="text-gray-600">WCAG AA/AAA Compliance Analysis</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${
                  scoreColor === 'primary' 
                    ? 'text-primary-700' 
                    : scoreColor === 'amber'
                    ? 'text-amber-700'
                    : 'text-red-700'
                }`}>{accessibilityScore}%</div>
                <div className="text-xs text-gray-600 mt-1">AA Standard</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  aaaScore >= 60 ? 'text-primary-600' : 'text-gray-500'
                }`}>{aaaScore}%</div>
                <div className="text-xs text-gray-600 mt-1">AAA Standard</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Progress Bars */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm font-medium mb-2">
              <span className="text-gray-700">WCAG AA Compliance</span>
              <span className={scoreColor === 'primary' ? 'text-primary-700' : scoreColor === 'amber' ? 'text-amber-700' : 'text-red-700'}>
                {accessibilityScore >= 80 ? 'Excellent' : accessibilityScore >= 60 ? 'Good' : 'Needs Work'}
              </span>
            </div>
            <div className="bg-white/80 rounded-full h-3 overflow-hidden shadow-inner">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${
                  scoreColor === 'primary' 
                    ? 'bg-gradient-to-r from-primary-400 to-primary-500' 
                    : scoreColor === 'amber'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                    : 'bg-gradient-to-r from-red-400 to-red-500'
                }`}
                style={{ width: `${accessibilityScore}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between text-sm font-medium mb-2">
              <span className="text-gray-700">WCAG AAA Compliance</span>
              <span className={aaaScore >= 60 ? 'text-primary-700' : 'text-gray-500'}>
                {aaaScore >= 60 ? 'Good' : 'Enhanced Level'}
              </span>
            </div>
            <div className="bg-white/80 rounded-full h-2 overflow-hidden shadow-inner">
              <div 
                className={`h-full transition-all duration-1000 ease-out delay-300 ${
                  aaaScore >= 60 
                    ? 'bg-gradient-to-r from-primary-300 to-primary-400' 
                    : 'bg-gradient-to-r from-gray-300 to-gray-400'
                }`}
                style={{ width: `${aaaScore}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-white/50">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800">{contrastResults.filter(r => r.passesAA).length}</div>
            <div className="text-xs text-gray-600">AA Passes</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800">{contrastResults.filter(r => r.passesAAA).length}</div>
            <div className="text-xs text-gray-600">AAA Passes</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800">{contrastResults.length}</div>
            <div className="text-xs text-gray-600">Total Tests</div>
          </div>
        </div>
      </div>

      {/* Enhanced WCAG Contrast Check */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg hover:border-primary-200 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-xl shadow-lg">
              <FiTarget className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Contrast Analysis</h3>
              <p className="text-gray-600">Color pair readability testing</p>
            </div>
          </div>
          <div className="bg-primary-50 px-3 py-2 rounded-full">
            <span className="text-sm font-semibold text-primary-700">{contrastResults.length} pairs tested</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {contrastResults.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:bg-primary-50/50 transition-all duration-200 border border-gray-100 hover:border-primary-200">
              <div className="flex items-center space-x-5">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-8 h-8 rounded-xl border-2 border-white shadow-lg"
                    style={{ backgroundColor: result.color1 }}
                    title={result.color1}
                  />
                  <span className="text-gray-400 text-lg">×</span>
                  <div
                    className="w-8 h-8 rounded-xl border-2 border-white shadow-lg"
                    style={{ backgroundColor: result.color2 }}
                    title={result.color2}
                  />
                </div>
                <div>
                  <div className="font-mono text-lg font-bold text-gray-800">
                    {result.ratio.toFixed(2)}:1
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {result.ratio >= 7 ? 'Excellent - All text sizes' : 
                     result.ratio >= 4.5 ? 'Good - Normal & large text' : 
                     result.ratio >= 3 ? 'Fair - Large text only' : 
                     'Poor - Insufficient contrast'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {result.passesAAA && (
                    <span className="bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 px-3 py-1.5 rounded-full text-sm font-bold">
                      AAA ✨
                    </span>
                  )}
                  {result.passesAA && !result.passesAAA && (
                    <span className="bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 px-3 py-1.5 rounded-full text-sm font-bold">
                      AA ✓
                    </span>
                  )}
                  {!result.passesAA && (
                    <span className="bg-gradient-to-r from-red-100 to-red-200 text-red-700 px-3 py-1.5 rounded-full text-sm font-bold">
                      Fail ⚠️
                    </span>
                  )}
                </div>
                {result.passesAA || result.passesAAA ? (
                  <FiCheck className="w-6 h-6 text-primary-500" />
                ) : (
                  <FiAlertTriangle className="w-6 h-6 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Color Blindness Simulation */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg hover:border-primary-200 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-gray-500 to-gray-600 p-2 rounded-xl shadow-lg">
              <FiUsers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Color Vision Simulation</h3>
              <p className="text-gray-600">Test accessibility for different vision types</p>
            </div>
          </div>
          <div className="bg-gray-50 px-3 py-2 rounded-full">
            <span className="text-sm font-semibold text-gray-700">~8% affected globally</span>
          </div>
        </div>
        
        {/* Enhanced Vision Type Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 mb-8 p-2 bg-gray-100 rounded-2xl">
          {Object.entries(colorBlindnessTypes).map(([key, type]) => {
            const Icon = type.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveSimulation(key)}
                className={`flex flex-col items-center space-y-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeSimulation === key
                    ? 'bg-white text-primary-700 shadow-lg ring-2 ring-primary-100'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <div className="text-center">
                  <span className="block font-semibold">{type.name}</span>
                  <span className="text-xs opacity-75">{type.prevalence}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Enhanced Active Simulation Display */}
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              {colorBlindnessTypes[activeSimulation].name}
            </h4>
            <p className="text-gray-600 mb-1">{colorBlindnessTypes[activeSimulation].description}</p>
            <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
              <FiBarChart className="w-4 h-4" />
              <span>Affects {colorBlindnessTypes[activeSimulation].prevalence.toLowerCase()}</span>
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-2xl">
            <div className="grid grid-cols-5 gap-4 h-20 rounded-xl overflow-hidden">
              {colorBlindnessTypes[activeSimulation].colors.map((color, index) => (
                <div
                  key={index}
                  className="rounded-xl shadow-lg border-[3px] border-white transition-all hover:scale-105 cursor-pointer hover:shadow-xl relative group"
                  style={{ backgroundColor: color }}
                  title={`Color ${index + 1}: ${color}`}
                >
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all rounded-xl flex items-center justify-center">
                    <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      #{index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {activeSimulation !== 'normal' && (
              <div className="mt-4 text-center">
                <span className="text-xs text-gray-600 bg-white px-3 py-1 rounded-full">
                  Simulated view for {colorBlindnessTypes[activeSimulation].name.toLowerCase()}
                </span>
              </div>
            )}
          </div>
          
          {activeSimulation !== 'normal' && (
            <div className="bg-gradient-to-r from-primary-50 to-orange-50 border border-primary-200 rounded-xl p-5">
              <div className="flex items-start space-x-3">
                <FiInfo className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-primary-900 mb-2">Accessibility Tip</h5>
                  <p className="text-sm text-primary-800 leading-relaxed">
                    Ensure your palette remains distinguishable in this simulation. Consider using different brightness levels, 
                    patterns, or textures alongside color to convey information effectively.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Recommendations */}
      {accessibilityScore < 80 && (
        <div className="bg-gradient-to-r from-primary-50 to-orange-50 border border-primary-200 rounded-2xl p-8">
          <div className="flex items-start space-x-4">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-3 flex-shrink-0 shadow-lg">
              <FiZap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary-900 mb-4">Accessibility Improvements</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="text-sm text-primary-800 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-600 mt-0.5">•</span>
                    <span>Increase contrast between light and dark colors</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-600 mt-0.5">•</span>
                    <span>Use patterns or textures alongside color coding</span>
                  </li>
                </ul>
                <ul className="text-sm text-primary-800 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-600 mt-0.5">•</span>
                    <span>Test with larger text sizes for readability</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-600 mt-0.5">•</span>
                    <span>Consider adding high-contrast alternatives</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityChecker;
