from rembg import remove
from PIL import Image, ImageDraw

def process_with_rembg():
    input_path = '/Users/pranesh/.gemini/antigravity-ide/brain/9e5b14fe-78d3-42d2-afd9-8ac8f85e9e20/media__1786603793596.jpg'
    img = Image.open(input_path)
    
    # AI Background Removal via rembg
    output = remove(img)

    # Crop to subject bounding box
    bbox = output.getbbox()
    if bbox:
        cropped = output.crop(bbox)
    else:
        cropped = output

    # Make square aspect ratio for avatar container
    cw, ch = cropped.size
    side = max(cw, ch)
    square_avatar = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    pad_x = (side - cw) // 2
    pad_y = (side - ch) // 2
    square_avatar.paste(cropped, (pad_x, pad_y))

    # Resize to standard high-res 512x512 PNG
    final_avatar = square_avatar.resize((512, 512), Image.Resampling.LANCZOS)

    # Also create circular avatar cut
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

    # Also save as default avatar.png
    final_avatar.save('/Users/pranesh/Ag/next-app/public/avatar.png', 'PNG')
    final_avatar.save('/Users/pranesh/Ag/avatar.png', 'PNG')

    print("Rembg AI background removal completed successfully!")

if __name__ == '__main__':
    process_with_rembg()
