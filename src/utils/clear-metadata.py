# Credits to: https://thepythoncode.com/article/how-to-clear-image-metadata-in-python
# + Claude generated code for image rotation

# Import necessary libraries.
import argparse
from PIL import Image

# Function to clear Metadata from a specified image.
def clear_all_metadata(imgname, rotation=0):
    # Open the image file
    img = Image.open(imgname)

    # Rotate the image if a rotation angle is specified.
    if rotation:
        img = img.rotate(-rotation, expand=True)

    # Read the image data, excluding metadata.
    data = list(img.getdata())

    # Create a new image with the same mode and size but without metadata.
    img_without_metadata = Image.new(img.mode, img.size)
    img_without_metadata.putdata(data)

    # Save the new image over the original file, effectively removing metadata.
    img_without_metadata.save(imgname)
    print(f"Metadata successfully cleared from '{imgname}'.")
    if rotation:
        print(f"Image rotated {rotation} degrees clockwise.")


# Setup command line argument parsing
parser = argparse.ArgumentParser(description="Remove metadata from an image file.")
parser.add_argument("img", help="Image file from which to remove metadata")
parser.add_argument(
    "-r", "--rotate",
    type=int,
    default=0,
    choices=[90, 180, 270],
    help="Rotate the image clockwise by 90, 180, or 270 degrees (default: no rotation)"
)

# Parse arguments
args = parser.parse_args()

# If an image file is provided, clear its metadata
if args.img:
    clear_all_metadata(args.img, args.rotate)