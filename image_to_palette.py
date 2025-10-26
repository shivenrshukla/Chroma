from PIL import Image, ImageDraw
import numpy as np
import colorsys
from sklearn.cluster import KMeans
from skimage.color import rgb2hsv, rgb2lab, lab2rgb

# ------------------------
# Utility Functions (Unchanged)
# ------------------------
def rgb_to_hex(rgb_tuple):
    # Converts an (R, G, B) tuple to a HEX string.
    return '#{:02x}{:02x}{:02x}'.format(int(rgb_tuple[0]), int(rgb_tuple[1]), int(rgb_tuple[2]))

def hex_to_rgb_string(hex_color):
    # Converts a HEX string to an 'rgb(R, G, B)' string.
    h = hex_color.lstrip('#')
    return f"rgb({','.join(str(int(h[i:i+2], 16)) for i in (0, 2, 4))})"

def rgb_to_hsl_string(rgb_tuple):
    # Converts an (R, G, B) tuple to an 'hsl(H, S, L)' string.
    r, g, b = [x / 255.0 for x in rgb_tuple]
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    return f"hsl({int(h*360)}, {int(s*100)}%, {int(l*100)}%)"

def make_swatch_image(rgb_array, sw=100, sh=100):
    # Creates a horizontal swatch image from an array of RGB colors.
    n = len(rgb_array)
    img = Image.new("RGB", (sw * n, sh))
    draw = ImageDraw.Draw(img)
    for i, col in enumerate(rgb_array):
        draw.rectangle([i * sw, 0, (i + 1) * sw, sh], fill=tuple(int(x) for x in col))
    return img

# ------------------------
# Main Extraction Function (Improved)
# ------------------------
def extract_palette(
    image_input,
    num_colors=8,  # Defaulted to 8 as requested
    hex_only=True,
    min_saturation=0.15,
    value_low=0.1,
    value_high=0.95,
    sample_size=5000
):
    """
    Extracts a vibrant, representative color palette from an image using
    efficient vectorized operations.

    Args:
        image_path: Path to the image file or a file-like object.
        num_colors (int): The number of colors to extract.
        hex_only (bool): If True, returns a simple list of hex codes.
                         If False, returns a list of detailed color dictionaries.
        min_saturation (float): Minimum saturation for a pixel to be considered.
        value_low (float): Minimum value/brightness for a pixel to be considered.
        value_high (float): Maximum value/brightness for a pixel to be considered.
        sample_size (int): Number of pixels to sample before clustering for performance.

    Returns:
        A tuple containing (palette, swatch_image, color_space_used).
        - palette: A list of hex strings or detailed dictionaries.
        - swatch_image: A PIL Image object showing the palette.
        - color_space_used: 'lab' or 'rgb', indicating the clustering method.
    """
    try:
        if isinstance(image_input, Image.Image):
            img = image_input.convert("RGB")
        else:
            img = Image.open(image_input).convert("RGB")
        
        img.thumbnail((600, 600))               # Resize for performance
        pixels = np.array(img).reshape(-1, 3)
        # Convert pixels to HSV color space in a single, fast operation.
        pixels_hsv = rgb2hsv(pixels / 255.0)

        # Create a boolean mask to find pixels within our desired saturation/value range.
        mask = (
            (pixels_hsv[:, 1] > min_saturation) &
            (pixels_hsv[:, 2] > value_low) &
            (pixels_hsv[:, 2] < value_high)
        )
        vibrant_pixels = pixels[mask]

        # If filtering removed too many pixels, fall back to using all pixels.
        if len(vibrant_pixels) < num_colors:
            vibrant_pixels = pixels

        # --- K-MEANS CLUSTERING ---
        # Use a random sample to speed up K-Means.
        n_samples = len(vibrant_pixels)
        if n_samples > sample_size:
            idx = np.random.choice(n_samples, sample_size, replace=False)
            sample_pixels = vibrant_pixels[idx]
        else:
            sample_pixels = vibrant_pixels

        # Ensure we don't request more clusters than available pixels.
        num_clusters = min(num_colors, len(np.unique(sample_pixels, axis=0)))
        if num_clusters == 0:
            return [], None, "none"

        # 1. Try clustering in CIELAB space (perceptually uniform, often better results)
        try:
            used_space = "lab"
            lab_pixels = rgb2lab(sample_pixels / 255.0)
            kmeans = KMeans(n_clusters=num_clusters, random_state=42, n_init=10).fit(lab_pixels)
            # Convert cluster centers back to RGB
            centers_rgb = lab2rgb(kmeans.cluster_centers_) * 255.0

        # 2. Fallback to RGB space if Lab clustering fails
        except Exception:
            used_space = "rgb"
            kmeans = KMeans(n_clusters=num_clusters, random_state=42, n_init=10).fit(sample_pixels)
            centers_rgb = kmeans.cluster_centers_

        # Sort colors by prominence (number of pixels in each cluster)
        counts = np.bincount(kmeans.labels_)
        order = np.argsort(counts)[::-1]
        centers_rgb_sorted = centers_rgb[order].clip(0, 255).astype(int)

        # --- FORMAT AND RETURN OUTPUT ---
        final_palette_rgb = centers_rgb_sorted[:num_colors]
        swatch = make_swatch_image(final_palette_rgb)

        if hex_only:
            palette_output = [rgb_to_hex(c) for c in final_palette_rgb]
            return palette_output, swatch, used_space
        else:
            # Assign roles more robustly for any number of colors
            roles = ["Primary", "Secondary", "Accent 1", "Accent 2", "Background"]
            detailed_output = []
            for i, c in enumerate(final_palette_rgb):
                hex_code = rgb_to_hex(c)
                role = roles[i] if i < len(roles) else f"Color {i + 1}"
                detailed_output.append({
                    "hex": hex_code,
                    "rgb": hex_to_rgb_string(hex_code),
                    "hsl": rgb_to_hsl_string(c),
                    "role": role
                })
            return detailed_output, swatch, used_space
    except Exception as e:
        print(f"Error opening or processing image: {e}")
        return None, None, None