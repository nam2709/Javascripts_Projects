#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
#
# __init__.py
__author__ = 'TND - NGUYEN DUC TAM'
import os

from pydub import AudioSegment
from pydub.playback import play


def boost_volume(input_file=None, output_file=None, dB=0, save=False):
    if input_file is not None:
        song = AudioSegment.from_mp3(input_file)
        # boost volume by db
        louder_song = song + dB
        #Play song
        if save is False:
            play(louder_song)
        else:
            #save louder song
            if output_file is None:
                os.system(str('cp "%s" "%s"' % (input_file, input_file + '.bk')))
                louder_song.export(input_file, format='mp3')
            else:
                louder_song.export(output_file, format='mp3')
        return True
    else:
        print('Input file is None!')
        return False

# Lọc tạp âm:
def DecreaseNoice(input_file=None, output_file=None, save=False, highpass_f=400, lowpass_f=1800):
    if input_file is not None:
        os.system(str("ffmpeg -i '%s' -af 'highpass=f=%s,lowpass=f=%s' '%s'" %
                      (input_file,
                       highpass_f,
                       lowpass_f,
                       output_file)))
        return True
    else:
        print('Input file is None!')
        return False
# Convert audio to 8bit
def WavTo8bit(input_file=None, output_file=None, save=False):
    if input_file is not None:
        os.system(str("ffmpeg -i '%s' -ar 8000 -ac 1 -acodec pcm_u8 '%s'" % (input_file, output_file)))
        return True
    else:
        print('Input file is None!')
        return False

#input_file='/data/abc.mp3'
# boost_volume(input_file=input_file, output_file='/data/xxx+100.mp3', dB=100, save=True)
# boost_volume(input_file=input_file, output_file='/data/xxx+70.mp3', dB=70, save=True)
# boost_volume(input_file=input_file, output_file='/data/xxx+30.mp3', dB=30, save=True)
# boost_volume(input_file=input_file, output_file='/data/xxx+50.mp3', dB=50, save=True)
# boost_volume(input_file=input_file, output_file='/data/xxx+20.mp3', dB=20, save=True)
# boost_volume(input_file=input_file, output_file='/data/xxx+10.mp3', dB=10, save=True)

#DecreaseNoice(input_file=input_file, output_file='/data/xxx-decreased.mp3', save=True)