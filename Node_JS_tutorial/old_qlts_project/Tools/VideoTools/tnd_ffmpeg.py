#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
#
# __init__.py
__author__ = 'TND - NGUYEN DUC TAM'
import os
import sys

import ffmpeg
from PIL import Image

from Tools.AudioTools import tnd_pydub


def overlay(input_video, input_png, output_video):
    in_file = ffmpeg.input(input_video)
    overlay_file = ffmpeg.input(input_png)
    (
        ffmpeg
        .concat(
            in_file,
        )
        .overlay(overlay_file.hflip())
        .drawbox(50, 50, 120, 120, color='red', thickness=5)
        .output(output_video)
        .run()
    )
    return(output_video)

def pipeline(input_video1, input_video2, output_video):
    in1 = ffmpeg.input(input_video1)
    in2 = ffmpeg.input(input_video2)
    v1 = in1.video.hflip().filter('setdar', 16/9)
    a1 = in1.audio
    v2 = in2.video.filter('reverse').filter('hue', s=0).filter('setdar', 16/9)
    a2 = in2.audio.filter('areverse').filter('aphaser')
    joined = ffmpeg.concat(v1, a1, v2, a2, v=1, a=1).node
    v3 = joined[0]
    a3 = joined[1].filter('volume', 0.8)
    out = ffmpeg.output(v3, a3, output_video, pix_fmt='yuv420p')
    out.run()

def images2mp4():
    (
        ffmpeg
        .input('/data/web-data/media/*.jpg', pattern_type='glob', framerate=25)
        .filter('deflicker', mode='pm', size=10)
        .filter('scale', size='hd1080', force_original_aspect_ratio='increase')
        .output("/data/web-data/media/images2mp4-output.mp4", preset='slower', movflags='faststart', pix_fmt='yuv420p')
        #.view(filename='filter_graph')
        .run()
    )

def mp3tomp4(input_mp3, input_mp4, output_video):
    in1 = ffmpeg.input(input_mp3)
    a1 = in1.audio
    #v1 = in1.video

    in2 = ffmpeg.input(input_mp4)
    a2 = in2.audio
    v2 = in2.video

    #joined = ffmpeg.concat(a1, v1, a2, v2, v=1, a=1).node
    joined = ffmpeg.concat(v2, a2, a1, v=1, a=2).node
    v3 = joined[0]
    a3 = joined[1]
    out = ffmpeg.output(v3, a3, output_video, pix_fmt='yuv420p')
    out.run()

# OK
def get_video_info(input_filename):
    try:
        probe = ffmpeg.probe(input_filename)
    except ffmpeg.Error as e:
        print(e.stderr, file=sys.stderr)
        return(None)

    video_stream = next((stream for stream in probe['streams'] if stream['codec_type'] == 'video'), None)
    if video_stream is None:
        print('No video stream found', file=sys.stderr)
        return(None)
    print(video_stream)
    return(video_stream)

# OK
def generate_thumbnail(in_filename, out_filename, time, width):
    try:
        (
            ffmpeg
            .input(in_filename, ss=time)
            .filter('scale', width, -1)
            .output(out_filename, vframes=1)
            .overwrite_output()
            .run(capture_stdout=True, capture_stderr=True)
        )
        return(out_filename)
    except ffmpeg.Error as e:
        print(e.stderr.decode(), file=sys.stderr)
        return(None)

def facetime(output_file):
    (
    ffmpeg
    .input('FaceTime', format='avfoundation', pix_fmt='uyvy422', framerate=30)
    .output(output_file, pix_fmt='yuv420p', vframes=100)
    .run()
    )

def resize_image_width(source_path, dest_path, basewidth):
    try:
        img = Image.open(source_path)
        wpercent = (basewidth/float(img.size[0]))
        hsize = int((float(img.size[1])*float(wpercent)))
        img = img.resize((basewidth,hsize), Image.ANTIALIAS)
        quality_val = 100
        img.save(dest_path, 'JPEG', quality=quality_val)
        return(dest_path)
    except Exception as xx:
        print(str(xx))
        return(None)
def resize_image_height(source_path, dest_path, basewidth):
    try:
        img = Image.open(source_path)
        hpercent = (basewidth/float(img.size[1]))
        wsize = int((float(img.size[0])*float(hpercent)))
        img = img.resize((wsize, basewidth), Image.ANTIALIAS)
        img.save(dest_path)
        return(dest_path)
    except Exception as xx:
        print(str(xx))
        return(None)
def create_video(input_mp3, images_list, output_mp4, intro_video=None, end_video=None):
    audio_duration = tnd_pydub.get_duration(input_mp3)
    print('audio_duration = %s' % audio_duration)
    image_duration = audio_duration / len(images_list)
    print('image_duration = %s' % image_duration)
    trim_duration = round(image_duration, 0)
    print('trim_duration = %s' % trim_duration)

    #ZOOMPAN_STRING = "zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=125,trim=duration=5"
    #ZOOMPAN_STRING = "zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=250,trim=duration=5"
    #ZOOMPAN_STRING = "zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=500,trim=duration=5"
    #ZOOMPAN_STRING = "zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=500,trim=duration=10"
    #ZOOMPAN_STRING = "zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=750,trim=duration=20"
    ZOOMPAN_STRING = str("scale=1280x720,zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1000,setdar=dar=0,trim=duration=%s" % (str(trim_duration)))

    print('Image file: %s' % str(len(images_list)))
    command = str("ffmpeg -y -i %s " % (input_mp3))

    input_video_count = len(images_list)
    current_video_input = 1
    current_audio_input = 0

    # Khai báo input cho video Introduc
    if intro_video is not None:
        command += str(' -i %s ' % intro_video)
        input_video_count += 1
        current_video_input += 1


    # Khai báo input cho các ảnh
    for i in range(1, len(images_list) + 1):
        print('i = %s' % str(i))
        print('image_file[%s] = %s' % (str(i), images_list[i-1]))
        command += str(' -loop 1 -t 1 -i %s ' % (images_list[i-1]))

    # Khai báo input cho End Video
    if end_video is not None:
        command += str(' -i %s ' % end_video)
        input_video_count += 1

    # Khai báo Filter
    command += str(' -filter_complex "')

    # Scale for Instro Video
    command += str(" [1:v]scale=1280x720[v0];")
    # Đặt tên các Input stream và filter Zoompan
    temp_count = current_video_input
    for i in range(1, len(images_list) + 1):
        command += str(" [%s:v]%s[v%s]; "
                        % (str(temp_count), ZOOMPAN_STRING, str(i)))
        temp_count += 1


    # Scale for END Video
    command += str(" [%s:v]scale=1280x720[v%s]; " % (str(temp_count), str(temp_count-1)))

    # CONCAT VIDEO and name to: [v]
    if intro_video is not None:
        command += str('[v0]')
    temp_count = current_video_input
    for i in range(1, len(images_list) + 1):
        command += str('[v%s]'
                        % (str(i)))
        temp_count += 1
    if end_video is not None:
        command += str('[v%s]' % str(temp_count-1))

    command += str('concat=n=%s:v=1:a=0,format=yuv420p[v]; '
                    % (str(input_video_count)))
    # CONCAT AUDIO and name to: [a]
    if intro_video is not None:
        command += str('[1:a]')
        current_audio_input += 1
    command += str('[0:a]')
    current_audio_input += 1
    if end_video is not None:
        command += str('[%s:a]' % (input_video_count))
        current_audio_input += 1
    command += str('concat=n=%s:v=0:a=1[a]"' % (current_audio_input))

    # MAP AUDIO and VIDEO to output
    command += str(' -map "[a]"  -map "[v]" -s "1080x720" -profile:v main %s;' % (output_mp4))

    print('FFMPEG COMMAND = %s' % command)
    os.system(command)
    return(output_mp4)

def create_video(input_mp3, images_list, output_mp4, video_image_filter=None, intro_video=None, end_video=None):
    audio_duration = tnd_pydub.get_duration(input_mp3)
    print('audio_duration = %s' % audio_duration)
    image_duration = audio_duration / len(images_list)
    print('image_duration = %s' % image_duration)
    trim_duration = round(image_duration, 0)
    print('trim_duration = %s' % trim_duration)

    #ZOOMPAN_STRING = "zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=125,trim=duration=5"
    #ZOOMPAN_STRING = "zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=250,trim=duration=5"
    #ZOOMPAN_STRING = "zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=500,trim=duration=5"
    #ZOOMPAN_STRING = "zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=500,trim=duration=10"
    #ZOOMPAN_STRING = "zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=750,trim=duration=20"
    ZOOMPAN_STRING = video_image_filter + str("%s" % (str(trim_duration)))
    print('ZOOMPAN_STRING = %s' % ZOOMPAN_STRING)
    print('Image file: %s' % str(len(images_list)))
    command = str("ffmpeg -y -i %s " % (input_mp3))

    input_video_count = len(images_list)
    current_video_input = 1
    current_audio_input = 0

    # Khai báo input cho video Introduc
    if intro_video is not None:
        command += str(' -i %s ' % intro_video)
        input_video_count += 1
        current_video_input += 1


    # Khai báo input cho các ảnh
    for i in range(1, len(images_list) + 1):
        print('i = %s' % str(i))
        print('image_file[%s] = %s' % (str(i), images_list[i-1]))
        command += str(' -loop 1 -t 1 -i %s ' % (images_list[i-1]))

    # Khai báo input cho End Video
    if end_video is not None:
        command += str(' -i %s ' % end_video)
        input_video_count += 1

    # Khai báo Filter
    command += str(' -filter_complex "')

    # Scale for Instro Video
    command += str(" [1:v]scale=1280x720[v0];")
    # Đặt tên các Input stream và filter Zoompan
    temp_count = current_video_input
    for i in range(1, len(images_list) + 1):
        command += str(" [%s:v]%s[v%s]; "
                        % (str(temp_count), ZOOMPAN_STRING, str(i)))
        temp_count += 1


    # Scale for END Video
    command += str(" [%s:v]scale=1280x720[v%s]; " % (str(temp_count), str(temp_count-1)))

    # CONCAT VIDEO and name to: [v]
    if intro_video is not None:
        command += str('[v0]')
    temp_count = current_video_input
    for i in range(1, len(images_list) + 1):
        command += str('[v%s]'
                        % (str(i)))
        temp_count += 1
    if end_video is not None:
        command += str('[v%s]' % str(temp_count-1))

    command += str('concat=n=%s:v=1:a=0,format=yuv420p[v]; '
                    % (str(input_video_count)))
    # CONCAT AUDIO and name to: [a]
    if intro_video is not None:
        command += str('[1:a]')
        current_audio_input += 1
    command += str('[0:a]')
    current_audio_input += 1
    if end_video is not None:
        command += str('[%s:a]' % (input_video_count))
        current_audio_input += 1
    command += str('concat=n=%s:v=0:a=1[a]"' % (current_audio_input))

    # MAP AUDIO and VIDEO to output
    command += str(' -map "[a]"  -map "[v]" -s "1080x720" -profile:v main %s;' % (output_mp4))

    print('FFMPEG COMMAND = %s' % command)
    os.system(command)
    return(output_mp4)

def gtts_fix(input_mp3, filter_string, output_mp3):

    command = str("ffmpeg -y -i %s -filter:a " % (input_mp3))

    # Khai báo Filter
    command += str(' "%s" ' % filter_string)

    # MAP AUDIO and VIDEO to output
    command += str(' %s;' % (output_mp3))

    print('FFMPEG COMMAND = %s' % command)
    os.system(command)
    return(output_mp3)

def create_video_testing(input_mp3, images_list, output_mp4, intro_video=None, end_video=None):

    """
    ffmpeg \
    -t 5 -i 1.jpg \
    -t 5 -i 2.jpg \
    -t 5 -i 3.jpg \
    -t 5 -i 4.jpg \
    -filter_complex \
    "[0:v]zoompan=z='if(lte(zoom,1.0),1.5,max(1.001,zoom-0.0015))':d=125,fade=t=out:st=4:d=1[v0]; \
     [1:v]zoompan=z='if(lte(zoom,1.0),1.5,max(1.001,zoom-0.0015))':d=125,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v1]; \
     [2:v]zoompan=z='if(lte(zoom,1.0),1.5,max(1.001,zoom-0.0015))':d=125,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v2]; \
     [3:v]zoompan=z='if(lte(zoom,1.0),1.5,max(1.001,zoom-0.0015))':d=125,fade=t=in:st=0:d=1,fade=t=out:st=4:d=1[v3]; \
     [v0][v1][v2][v3]concat=n=4:v=1:a=0,format=yuv420p[v]" -map "[v]" -s "800x450" -t 40 ./out_fade.mp4
    """
    audio_duration = tnd_pydub.get_duration(input_mp3)
    print('audio_duration = %s' % audio_duration)
    image_duration = audio_duration / len(images_list)
    print('image_duration = %s' % image_duration)
    trim_duration = round(image_duration, 0)
    print('trim_duration = %s' % trim_duration)

    ZOOMPAN_STRING = "zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=125,trim=duration=5"
    ZOOMPAN_STRING = "zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=250,trim=duration=5"
    ZOOMPAN_STRING = "zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=500,trim=duration=5"
    ZOOMPAN_STRING = "zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=500,trim=duration=10"
    ZOOMPAN_STRING = "zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=750,trim=duration=20"
    ZOOMPAN_STRING = str("zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1000,trim=duration=%s" % (str(trim_duration)))

    print('Image file: %s' % str(len(images_list)))
    command = str("ffmpeg -y -i %s " % (input_mp3))

    input_video_count = len(images_list)
    current_video_input = 1
    current_audio_input = 0

    # Khai báo input cho video Introduc
    if intro_video is not None:
        command += str(' -i %s ' % intro_video)
        input_video_count += 1
        current_video_input += 1


    # Khai báo input cho các ảnh
    for i in range(1, len(images_list) + 1):
        print('i = %s' % str(i))
        print('image_file[%s] = %s' % (str(i), images_list[i-1]))
        command += str(' -loop 1 -t 1 -i %s ' % (images_list[i-1]))

    # Khai báo input cho End Video
    if end_video is not None:
        command += str(' -i %s ' % end_video)
        input_video_count += 1

    # Khai báo Filter
    command += str(' -filter_complex "')
    # Đặt tên các Input stream và filter Zoompan
    temp_count = current_video_input
    for i in range(1, len(images_list) + 1):
        command += str(" [%s:v]%s[v%s]; "
                        % (str(temp_count), ZOOMPAN_STRING, str(i)))
        temp_count += 1

    # CONCAT VIDEO and name to: [v]
    if intro_video is not None:
        command += str('[1:v]')
    temp_count = current_video_input
    for i in range(1, len(images_list) + 1):
        command += str('[v%s]'
                        % (str(i)))
        temp_count += 1
    if end_video is not None:
        command += str('[%s:v]' % str(temp_count))

    command += str('concat=n=%s:v=1:a=0,format=yuv420p[v]; '
                    % (str(input_video_count)))
    # CONCAT AUDIO and name to: [a]
    if intro_video is not None:
        command += str('[1:a]')
        current_audio_input += 1
    command += str('[0:a]')
    current_audio_input += 1
    if end_video is not None:
        command += str('[%s:a]' % (input_video_count))
        current_audio_input += 1
    command += str('concat=n=%s:v=0:a=1[a]"' % (current_audio_input))

    # MAP AUDIO and VIDEO to output
    command += str(' -map "[a]"  -map "[v]" -s "1080x720" -profile:v main %s;' % (output_mp4))

    print('FFMPEG COMMAND = %s' % command)
    os.system(command)
    return(output_mp4)

def concat_videos(input_mp4_1, input_mp4_2, input_mp4_3, output_mp4):
    command = str('ffmpeg -i "concat:%s|%s|%s" -c copy %s'
                  % (
                    input_mp4_1,
                    input_mp4_2,
                    input_mp4_3,
                    output_mp4,
                    )
                )
    print('FFMPEG COMMAND = %s' % command)
    os.system(command)
    return(output_mp4)
##########################################################
input_video = "/data/web-data/media/input1.mp4"
input_png = "/data/web-data/media/OPPO-A71-selife-Chinh.jpg"
output_video = "/data/web-data/media/overlay-output.mp4"
#overlay(input_video, input_png, output_video)

##########################################################
input_video1 = "/data/web-data/media/input1.mp4"
input_video2 = "/data/web-data/media/input2.mp4"
output_video = "/data/web-data/media/pipeline-output.mp4"
# PROBLEMING
#pipeline(input_video1, input_video2, output_video)

##########################################################
input_mp3 = "/data/web-data/media/1.mp3"
input_mp4 = "/data/web-data/media/input1.mp4"
output_video = "/data/web-data/media/mp3tomp4-output.mp4"
#mp3tomp4(input_mp3, input_mp4, output_video)

##########################################################
#print(get_video_info(input_mp4))

#print(generate_thumbnail(input_mp4, input_mp4 + '.jpg', 30, 1000))
#output_video = "/data/web-data/media/facetime-output.mp4"
#facetime(output_video)
'''
print(resize_image_width('/data/web-data/media/i1.jpg', '/data/web-data/media/i1-1280.jpg', 1280))
print(resize_image_width('/data/web-data/media/i2.jpg', '/data/web-data/media/i2-1280.jpg', 1280))
print(resize_image_width('/data/web-data/media/i3.jpg', '/data/web-data/media/i3-1280.jpg', 1280))
print(resize_image_width('/data/web-data/media/i4.jpg', '/data/web-data/media/i4-1280.jpg', 1280))

input_mp3 = '/data/web-data/media/1.mp3'
images_list = []
images_list.append('/data/web-data/media/i1.jpg')
images_list.append('/data/web-data/media/i2.jpg')
images_list.append('/data/web-data/media/i3.jpg')
images_list.append('/data/web-data/media/i4.jpg')

#output_mp4 = '/data/web-data/media/test_out.mp4'
#create_video(input_mp3, images_list, output_mp4)
'''