#!/usr/bin/env python
# -*- coding: utf-8 -*-
#region Description
__author__ = 'Tamnd - NGUYEN DUC TAM'
__copyright__ = "Copyright ©2020 Tamnd <ductambka@gmail.com>"
__maintainer__ = "Tamnd"
__email__ = "ductambka@gmail.com"
__status__ = "Production"
__date__ = 12 / 17 / 20
#endregion

#
#
# __init__.py

import sys
import os
import time
import datetime


import pyaudio
import wave

#filename = 'record.wav'
filename = 'output_1.wav'
# Set chunk size of 1024 samples per data frame
CHUNK = 4096

# Open the sound file
wf = wave.open(filename, 'rb')

# Create an interface to PortAudio
p = pyaudio.PyAudio()

# Open a .Stream object to write the WAV file to
# 'output = True' indicates that the sound will be played rather than recorded
WIDTH = wf.getsampwidth()
print('WIDTH = %s' % WIDTH)

FORMAT = p.get_format_from_width(WIDTH)
print('FORMAT = %s' % WIDTH)

CHANNELS = wf.getnchannels()
print('CHANNELS = %s' % CHANNELS)

RATES = wf.getframerate()
print('RATES = %s' % RATES)

stream = p.open(format = FORMAT,
                channels = CHANNELS,
                rate = RATES,
                output = True)

# Read data in chunks
data = wf.readframes(CHUNK)

print('data = %s' % data)

print('len(data) = %s' % len(data))

# Play the sound by writing the audio data to the stream
while data != '':
    stream.write(data)
    data = wf.readframes(CHUNK)

# Close and terminate the stream
stream.close()
p.terminate()

# End of TFile



