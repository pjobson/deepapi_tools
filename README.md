# DeepAPI Tools CLI

DeepAPI Tools for command line, I wrote these to experiment with.

    git clone git@github.com:pjobson/deepapi_tools.git
    cd deepapi_tools
    npm install
    npm link

First run of any tool will prompt you for your DeepAPI key, which you can get from your profile: https://deepai.org/dashboard/profile

This is not sponsored nor created by anyone on the DeepAPI team, it is simply a CLI wrapper for their API which I wrote.

## colorize

> Colorize black and white images or videos using the image colorization API. Add
> color to old family photos and historic images, or bring an old film back to life
> with colorization. This image colorization API is a deep learning model that has
> been trained on pairs of color images with their grayscale counterpart. After hours
> of training, the models learns how to add color back to black and white images.

https://deepai.org/machine-learning-model/colorizer

    colorize image.jpg

## superres

> The Super Resolution API uses machine learning to clarify, sharpen, and upscale 
> the photo without losing its content and defining characteristics. Blurry images 
> are unfortunately common and are a problem for professionals and hobbyists alike.
> Super resolution uses machine learning techniques to upscale images in a fraction 
> of a second.

https://deepai.org/machine-learning-model/torch-srgan

    superres image.jpg

## similarity

> Image Similarity compares two images and returns a value that tells you how 
> visually similar they are. The lower the the score, the more contextually 
> similar the two images are with a score of '0' being identical. Sifting 
> through datasets looking for duplicates or finding a visually similar set of 
> images can be painful - so let computer vision do it for you with this API.

https://deepai.org/machine-learning-model/image-similarity

    similarity image1.jpg image2.jpg

## deepdream

> Exaggerates feature attributes or textures using information that the 
> bvlc_googlenet model learned during training.

https://deepai.org/machine-learning-model/deepdream

    deepdream image1.jpg

## waifu2x

> Waifu2x is an algorithm that upscales images while reducing noise within the 
> image. It gets its name from the anime-style art known as 'waifu' that it was 
> largely trained on. Even though waifus made up most of the training data, this 
> waifu2x api still performs well on photographs and other types of imagery. You 
> can use Waifu2x to double the size of your images while reducing noise.

https://deepai.org/machine-learning-model/waifu2x

    waifu2x image1.jpg
