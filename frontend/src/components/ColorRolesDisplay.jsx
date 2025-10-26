// components/ColorRolesDisplay.jsx
import React, { useMemo } from 'react';
import { FiStar, FiLayers, FiZap, FiInfo, FiTarget, FiEye } from 'react-icons/fi';

// Single color swatch component
const ColorSwatch = ({ color }) => (
  <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-primary-300">
    <div
      className="w-12 h-12 rounded-xl border-2 border-white shadow-lg"
      style={{ backgroundColor: color.hex }}
      title={color.hex}
    />
    <div className="flex-1">
      <div className="font-mono text-sm font-bold text-gray-900">{color.hex.toUpperCase()}</div>
      <div className="text-xs text-gray-600 mt-1">{color.name || `Color ${color.hex}`}</div>
      {color.role && (
        <div className="text-xs text-primary-600 font-semibold mt-1 capitalize">
          {color.role} Color
        </div>
      )}
    </div>
  </div>
);

// Main component
const ColorRolesDisplay = ({ palette }) => {
  // Group colors by AI role
  const colorRoles = useMemo(() => {
    if (!palette) return { primary: [], secondary: [], accent: [] };
    return palette.reduce((acc, color) => {
      const role = color.role?.toLowerCase();
      if (role === 'primary' || role === 'secondary' || role === 'accent') {
        if (!acc[role]) acc[role] = [];
        acc[role].push(color);
      }
      return acc;
    }, { primary: [], secondary: [], accent: [] });
  }, [palette]);

  const hasRoles =
    colorRoles.primary.length > 0 ||
    colorRoles.secondary.length > 0 ||
    colorRoles.accent.length > 0;

  // Empty state
  if (!hasRoles) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
        <FiStar className="w-16 h-16 text-gray-400 mx-auto mb-6" />
        <h4 className="text-xl font-bold text-gray-700 mb-3">No AI Roles Assigned</h4>
        <p className="text-gray-600 max-w-md mx-auto leading-relaxed mb-8">
          The current palette doesn’t have AI-classified roles. Try generating a palette
          with <strong>"Advanced AI"</strong> enabled or upload an image to see
          classification in action.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl mb-4 inline-flex">
              <FiStar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-sm font-bold text-gray-800">Primary Colors</div>
            <div className="text-xs text-gray-500 mt-1">Main brand colors</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl mb-4 inline-flex">
              <FiLayers className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm font-bold text-gray-800">Secondary Colors</div>
            <div className="text-xs text-gray-500 mt-1">Supporting elements</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-3 rounded-xl mb-4 inline-flex">
              <FiZap className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-sm font-bold text-gray-800">Accent Colors</div>
            <div className="text-xs text-gray-500 mt-1">Highlights & CTAs</div>
          </div>
        </div>
      </div>
    );
  }

  // Helper renderer
  const renderRoleSection = (title, colors, icon, description, colorClass, usageTip) => {
    if (colors.length === 0) return null;
    const Icon = icon;

    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl shadow-lg ${colorClass}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">{title}</h4>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
          <div className="bg-gray-100 px-3 py-2 rounded-full border border-gray-200">
            <span className="text-sm font-semibold text-gray-700">
              {colors.length} color{colors.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Swatches */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {colors.map((color, index) => (
            <ColorSwatch key={`${color.hex}-${index}`} color={color} />
          ))}
        </div>

        {/* Usage tip */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <FiTarget className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-gray-800 text-sm">Design Usage:</div>
              <div className="text-sm text-gray-700">{usageTip}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {renderRoleSection(
        'Primary Colors',
        colorRoles.primary,
        FiStar,
        'Main brand colors for large surfaces and key elements',
        'bg-gradient-to-br from-purple-500 to-purple-600',
        'Use for headers, main backgrounds, and dominant UI elements. Should occupy ~60% of your design.'
      )}
      {renderRoleSection(
        'Secondary Colors',
        colorRoles.secondary,
        FiLayers,
        'Supporting colors that complement the primary palette',
        'bg-gradient-to-br from-blue-500 to-blue-600',
        'Great for cards, borders, secondary content areas. Should occupy ~30% of your design.'
      )}
      {renderRoleSection(
        'Accent Colors',
        colorRoles.accent,
        FiZap,
        'High-contrast colors for CTAs, highlights, and focal points',
        'bg-gradient-to-br from-orange-500 to-orange-600',
        'Use sparingly for buttons, links, notifications, and call-to-actions. Should occupy ~10% of your design.'
      )}

      {/* Professional Guidelines */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
            <FiInfo className="w-5 h-5 text-white" />
          </div>
          <div>
            <h5 className="font-bold text-gray-900 mb-4">🎨 Professional Design Guidelines</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="font-semibold text-purple-700 mb-2 flex items-center space-x-2">
                  <FiStar className="w-4 h-4" />
                  <span>Primary (60%)</span>
                </div>
                <ul className="text-gray-700 space-y-1 text-xs">
                  <li>• Large background areas</li>
                  <li>• Header sections</li>
                  <li>• Primary navigation</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-blue-700 mb-2 flex items-center space-x-2">
                  <FiLayers className="w-4 h-4" />
                  <span>Secondary (30%)</span>
                </div>
                <ul className="text-gray-700 space-y-1 text-xs">
                  <li>• Card backgrounds</li>
                  <li>• Sidebars</li>
                  <li>• Dividers and borders</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-orange-700 mb-2 flex items-center space-x-2">
                  <FiZap className="w-4 h-4" />
                  <span>Accent (10%)</span>
                </div>
                <ul className="text-gray-700 space-y-1 text-xs">
                  <li>• Call-to-action buttons</li>
                  <li>• Links & highlights</li>
                  <li>• Status indicators</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Note */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-lg">
            <FiEye className="w-5 h-5 text-white" />
          </div>
          <div>
            <h5 className="font-bold text-green-900 mb-2">♿ Accessibility Reminder</h5>
            <p className="text-sm text-green-800 leading-relaxed">
              AI role assignment considers contrast ratios and WCAG guidelines. Always test
              your design with an Accessibility Checker to ensure compliance for users with
              visual differences.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
        <h5 className="font-bold text-gray-900 mb-3">🤖 How AI Classification Works</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <strong>Analysis Factors:</strong>
            <ul className="mt-2 space-y-1 text-xs">
              <li>• Color saturation levels</li>
              <li>• Luminance values</li>
              <li>• Contrast relationships</li>
              <li>• Design theory principles</li>
            </ul>
          </div>
          <div>
            <strong>Assignment Logic:</strong>
            <ul className="mt-2 space-y-1 text-xs">
              <li>• High saturation → Primary</li>
              <li>• Complementary colors → Secondary</li>
              <li>• High contrast → Accent</li>
              <li>• WCAG compliance checked</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorRolesDisplay;
