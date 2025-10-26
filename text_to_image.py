import torch
from diffusers import StableDiffusionPipeline
from PIL import Image

# Load the Stable Diffusion pipeline once (so you can reuse it)
device = "cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"
print(f"Using device: {device}")

model_id = "runwayml/stable-diffusion-v1-5"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to(device)

def generate_image_from_prompt(prompt: str, guidance_scale: float = 7.5, num_inference_steps: int = 50) -> Image.Image:
    """
    Generates an image from a text prompt using Stable Diffusion.

    Args:
        prompt (str): The text prompt describing the image.
        guidance_scale (float): How strictly the image follows the prompt.
        num_inference_steps (int): Number of denoising steps (more -> better quality).

    Returns:
        PIL.Image.Image: The generated image.
    """
    if not prompt:
        raise ValueError("Prompt cannot be empty.")

    # New, simplified code
    image = pipe(prompt, guidance_scale=guidance_scale, num_inference_steps=num_inference_steps).images[0]

    return image
