#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
#
# __init__.py
__author__ = 'TND - NGUYEN DUC TAM'

import base64

from PIL import Image
from google_images_download import google_images_download


# Return height = img_size[0]
# width = img_size[1]
def img_size(image_file):
    try:
        im = Image.open(image_file)
        print(im.size)
        return(im.size)
    except Exception as xx:
        print(str(xx))
        return([0, 0])


def downloadimages(query):
    response = google_images_download.googleimagesdownload()
    arguments = {"keywords": query,
                 "format": "jpg",
                 "limit":4,
                 "print_urls":True,
                 "size": "medium",
                 "aspect_ratio": "panoramic"}
    try:
        response.download(arguments)

    # Handling File NotFound Error
    except FileNotFoundError:
        arguments = {"keywords": query,
                     "format": "jpg",
                     "limit":4,
                     "print_urls":True,
                     "size": "medium"}

        # Providing arguments for the searched query
        try:
            # Downloading the photos based
            # on the given arguments
            response.download(arguments)
        except:
            pass


    '''
    image_obj = Image.open(input_image_path)
    cropped_image = image_obj.crop(coords)
    cropped_image.save(output_image_path)
    cropped_image.show()
    '''
def crop_image(input_image_path, coords, output_image_path):
    im = Image.open(input_image_path)
    w, h = im.size
    print('w = %s' % str(w))
    print('h = %s' % str(h))

    im = im.crop(coords)
    im.save(output_image_path)

# f gets closed when you exit the with statement
# Now save the value of filename to your database

#crop_image("/data/face_reg/images/image1.jpg",(180, 405, 300, 500), "/data/face_reg/images/face1.jpg")

def base64tofile(input_string, output_file):
    chk = str(input_string).split('base64,')
    if  len(chk) > 1:
        base64data = str(chk[1]).strip()
    else:
        base64data = input_string
    print('base64data = %s' % base64data)
    try:
        imgdata = base64.b64decode(base64data)
        with open(output_file, 'wb') as f:
            f.write(imgdata)
        return True, 'success'
    except Exception as xx:
        return False, str(xx)