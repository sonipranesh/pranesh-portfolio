from PIL import Image, ImageFilter, ImageDraw

def process_avatar_pil():
    input_path = '/Users/pranesh/.gemini/antigravity-ide/brain/9e5b14fe-78d3-42d2-afd9-8ac8f85e9e20/media__1786603793596.jpg'
    img = Image.open(input_path).convert("RGBA")
    w, h = img.size

    # Access pixel data
    pixels = img.load()

    # Create Alpha mask
    alpha = Image.new("L", (w, h), 255)
    alpha_pixels = alpha.load()

    # Process pixel-by-pixel for clean separation of Pranesh from background
    for y in range(h):
        for x in range(w):
            r, g, b, _ = pixels[x, y]
            
            # Check for sky, lake water, clouds, distant scenery
            is_sky = (b > r + 15) and (b > g - 10) and (b > 110)
            is_cloud = (r > 175) and (g > 185) and (b > 200) and (y < h * 0.42)
            is_water = ((b > r + 16) and (b > 85) and (x < w * 0.36 or x > w * 0.64)) and (y < h * 0.72)
            is_landscape = (y < h * 0.50) and ((g > r + 8) or (b > r + 12)) and not (r > 140 and g > 100 and b > 60 and r > g)

            is_bg = is_sky or is_cloud or is_water or is_landscape

            # Protect Pranesh: Face/Skin (R > G > B), Dark Hair, Beige Suit, Blue Tie
            is_skin = (r > 130) and (g > 85) and (b > 50) and (r > g) and (x > w * 0.25) and (x < w * 0.75) and (y > h * 0.08) and (y < h * 0.6)
            is_hair = (r < 95) and (g < 95) and (b < 95) and (x > w * 0.28) and (x < w * 0.72) and (y > h * 0.03) and (y < h * 0.42)
            is_suit = (y > h * 0.38) and (x > w * 0.05) and (x < w * 0.95) and not (b > r + 20 and b > 120)

            if is_skin or is_hair:
                is_bg = False

            if is_bg:
                alpha_pixels[x, y] = 0

    # Apply soft blur filter to alpha edge for natural anti-aliased edge
    smoothed_alpha = alpha.filter(ImageFilter.GaussianBlur(radius=1.2))
    img.putalpha(smoothed_alpha)

    # Crop to subject bounding box
    bbox = img.getbbox()
    if bbox:
        cropped = img.crop(bbox)
    else:
        cropped = img

    # Make square aspect ratio for avatar container
    cw, ch = cropped.size
    side = max(cw, ch)
    square_avatar = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    pad_x = (side - cw) // 2
    pad_y = (side - ch) // 2
    square_avatar.paste(cropped, (pad_x, pad_y))

    # Resize to standard crisp high-res 512x512 PNG
    final_avatar = square_avatar.resize((512, 512), Image.Resampling.LANCZOS)

    # Also create a circular portrait badge cut for seamless floating intro display
    circle_avatar = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
    circle_mask = Image.new("L", (512, 512), 0)
    draw = ImageDraw.Draw(circle_mask)
    draw.ellipse((8, 8, 504, 504), fill=255)
    
    circle_avatar.paste(final_avatar, (0, 0), circle_mask)

    # Save to public and root directories
    out_next = '/Users/pranesh/Ag/next-app/public/pranesh_avatar.png'
    out_root = '/Users/pranesh/Ag/pranesh_avatar.png'
    out_next_circle = '/Users/pranesh/Ag/next-app/public/pranesh_avatar_circle.png'
    out_root_circle = '/Users/pranesh/Ag/pranesh_avatar_circle.png'

    final_avatar.save(out_next, 'PNG')
    final_avatar.save(out_root, 'PNG')
    circle_avatar.save(out_next_circle, 'PNG')
    circle_avatar.save(out_root_circle, 'PNG')

    # Also save as default avatar.png so all components receive Pranesh's face!
    final_avatar.save('/Users/pranesh/Ag/next-app/public/avatar.png', 'PNG')
    final_avatar.save('/Users/pranesh/Ag/avatar.png', 'PNG')

    print(f"Successfully processed Pranesh's uploaded avatar into transparent PNG!")

if __name__ == '__main__':
    process_avatar_pil()
