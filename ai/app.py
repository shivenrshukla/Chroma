# ai/app.py - UNIFIED BACKEND
import os
import json
import re
import torch
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# --- Helper Module Imports ---
try:
    from image_to_palette import extract_palette
    from text_to_image import generate_image_from_prompt 
    from advanced_ai_palette import optimize_palette, PaletteAestheticNet, assign_roles, composite_reward
except ImportError as e:
    print(f"⚠️ Warning: Could not import helper modules: {e}. Some routes may not work.")
    extract_palette = None
    generate_image_from_prompt = None
    optimize_palette = None
    PaletteAestheticNet = None
    assign_roles = None
    composite_reward = None

# --- Application Setup ---
load_dotenv()
app = Flask(__name__)
CORS(app)

# --- Constants ---
DEFAULT_PALETTE = ["#D92626", "#F27D16", "#F2B90C", "#8CBF68", "#2A8C82", "#2A578C", "#5E34A6", "#A64B95"]
K_VALUE = 8
PINECONE_INDEX_NAME = "color-palettes" # <-- Added Pinecone index name

# Aesthetic Model for Image Palette Optimization
aesthetic_model = None
if PaletteAestheticNet:
    MODEL_SAVE_PATH = "palette_aesthetic_model.pth"
    try:
        aesthetic_model = PaletteAestheticNet(K=K_VALUE)
        if os.path.exists(MODEL_SAVE_PATH):
            print(f"✅ Loading pre-trained aesthetic model from {MODEL_SAVE_PATH}")
            aesthetic_model.load_state_dict(torch.load(MODEL_SAVE_PATH, map_location=torch.device('cpu')))
            aesthetic_model.eval()
            print("✅ Model loaded successfully.")
        else:
            print(f"⚠️ Model file not found at {MODEL_SAVE_PATH}. Using default untrained model.")
    except Exception as e:
        print(f"❌ Could not load or create aesthetic model: {e}")
        aesthetic_model = None

# --- API Routes ---
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "aesthetic_model_status": "available" if aesthetic_model else "unavailable"
    }), 200

def format_palette_details(hex_colors):
    """
    Takes a list of HEX codes and enriches it with roles, scores, and color formats.
    """
    if not hex_colors or not assign_roles or not composite_reward:
        # Fallback for when helper modules aren't available
        return [{"hex": h, "role": f"Color {i+1}"} for i, h in enumerate(hex_colors)]

    roles = assign_roles(hex_colors)
    _, components = composite_reward(hex_colors, roles, model_L=aesthetic_model)

    detailed_palette = []
    for i, hex_code in enumerate(hex_colors):
        role = 'primary' if i in roles.get('primary', []) else \
               'secondary' if i in roles.get('secondary', []) else \
               'accent' if i in roles.get('accent', []) else 'neutral'
        
        detailed_palette.append({
            "hex": hex_code,
            "rgb": hex_to_rgb_string(hex_code),
            "hsl": hex_to_hsl_string(hex_code),
            "role": role,
            "aesthetic_score": float(components.get('L', 0.5)),
            "harmony_score": float(components.get('H', 0.5)),
            "contrast_score": float(components.get('C', 0.5))
        })
    return detailed_palette

@app.route('/api/generate-palette', methods=['POST'])
def generate_palette_from_text():
    # Generates an image from a text prompt using diffusion, extracts a color palette from the generated image, and optionally optimizes it.
    data = request.get_json()
    user_prompt = data.get('prompt', '')
    optimize = data.get('optimize', False)  # True/False
    if not user_prompt:
        return jsonify({"error": "No 'prompt' provided"}), 400

    hex_colors = []
    source = "default"

    try:
        # 1️⃣ Generate image from text prompt
        generated_image = generate_image_from_prompt(user_prompt)  # returns PIL.Image
        if not generated_image:
            raise Exception("Diffusion model failed to generate image")

        # 2️⃣ Extract palette from generated image
        hex_colors, _, _ = extract_palette(generated_image, num_colors=K_VALUE, hex_only=True)
        if not hex_colors:
            print("⚠️ Palette extraction failed, using default")
            hex_colors = DEFAULT_PALETTE
            source = "diffusion-image-fallback"
        else:
            source = "diffusion-image"

        # 3️⃣ Optional AI optimization
        if optimize and aesthetic_model:
            optimized, _, score, _ = optimize_palette(hex_colors, steps=50, model_L=aesthetic_model)
            hex_colors = optimized
            source += "-optimized"

    except Exception as e:
        print(f"⚠️ Failed to generate and extract palette: {e}")
        hex_colors = DEFAULT_PALETTE
        source = "default"

    # 4️⃣ Format and return
    detailed_palette = format_palette_details(hex_colors)
    return jsonify({
        "palette": detailed_palette,
        "source": source,
        "message": "Palette generated from text prompt"
    })

@app.route('/api/extract', methods=['POST'])
def extract_palette_api():
    # Extracts a color palette from an uploaded image with optional advanced optimization.
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    if not extract_palette or not optimize_palette:
        return jsonify({"error": "Image processing modules not available"}), 503

    optimize_level = request.form.get('optimize', 'basic')
    
    try:
        # Advanced AI Optimization Flow
        if optimize_level == 'advanced' and aesthetic_model:
            print("Processing with Advanced AI Optimization...")

            # ✅ Unpack tuple correctly
            hex_palette, swatch, used_space = extract_palette(file, num_colors=K_VALUE, hex_only=True)

            if not hex_palette:
                return jsonify({"error": "Could not extract initial colors"}), 500

            # ✅ Ensure it's always a list
            initial_hex = list(hex_palette)

            optimized, _, _, _ = optimize_palette(initial_hex, steps=50, model_L=aesthetic_model)
            enhanced_palette = format_palette_details(optimized)

            return jsonify({
                "palette": enhanced_palette,
                "message": "Advanced AI-optimized palette extracted"
            })

        # Basic Extraction Flow
        else:
            print("Processing with Basic Extraction...")

            # Correctly unpack the tuple, we only need the first item
            palette_list, _, _ = extract_palette(file, num_colors=10, hex_only=False)

        if not palette_list:
            return jsonify({"error": "Could not process the image"}), 500

            # ✅ Return only the serializable palette list in the JSON
        return jsonify({
                "palette": palette_list,
            "message": "Basic palette extracted successfully"
        })
        
    except Exception as e:
        print(f"ERROR in /api/extract: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Internal server error during image processing."}), 500

@app.route('/api/optimize', methods=['POST'])
def optimize_palette_api():
    """Optimizes an existing palette with the aesthetic model."""
    data = request.get_json()
    if not data or 'palette' not in data:
        return jsonify({"error": "No palette provided"}), 400
    if not aesthetic_model:
        return jsonify({"error": "AI optimization model not available"}), 503
    
    try:
        hex_colors = data['palette'][:K_VALUE]
        # MODIFIED: Get steps from the request, with a default of 50
        steps = data.get('steps', 50)
        
        # MODIFIED: Capture all 4 return values from the function, including components
        optimized, _, score, components = optimize_palette(hex_colors, steps=steps, model_L=aesthetic_model)
        
        # Format the palette with roles, RGB/HSL strings, etc.
        enhanced_palette = format_palette_details(optimized)
        
        # MODIFIED: Return the full data structure the frontend expects
        return jsonify({
            "palette": enhanced_palette, 
            "aesthetic_score": float(score),
            "components": {k: float(v) for k, v in components.items()} # Ensure components are JSON serializable
        })
    except Exception as e:
        print(f"Error optimizing palette: {str(e)}")
        return jsonify({"error": "Failed to optimize palette"}), 500

# --- Utility Functions ---
def hex_to_rgb_string(hex_color):
    h = hex_color.lstrip('#')
    return f"rgb({','.join(str(int(h[i:i+2], 16)) for i in (0, 2, 4))})"

def hex_to_hsl_string(hex_color):
    h = hex_color.lstrip('#')
    r, g, b = [int(h[i:i+2], 16)/255.0 for i in (0, 2, 4)]
    max_val, min_val = max(r, g, b), min(r, g, b)
    l = (max_val + min_val) / 2
    if max_val == min_val: h = s = 0
    else:
        d = max_val - min_val
        s = d / (2 - max_val - min_val) if l > 0.5 else d / (max_val + min_val)
        if max_val == r: h = (g - b) / d + (6 if g < b else 0)
        elif max_val == g: h = (b - r) / d + 2
        else: h = (r - g) / d + 4
        h /= 6
    return f"hsl({int(h*360)}, {int(s*100)}%, {int(l*100)}%)"

if __name__ == '__main__':
    app.run(debug=True, port=5001)