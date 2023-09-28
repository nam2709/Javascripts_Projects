#!/usr/bin/env python
# -*- coding: utf-8 -*-
#region Description
__author__ = 'Tamnd - NGUYEN DUC TAM'
__copyright__ = "Copyright ©2020 Tamnd <ductambka@gmail.com>"
__maintainer__ = "Tamnd"
__email__ = "ductambka@gmail.com"
__status__ = "Production"
__date__ = 12 / 22 / 20
#endregion

#
#
# __init__.py

import os
import wave

import audioop


def downsampleWav(file_src, file_dst, inrate=44100, outrate=16000, inchannels=2, outchannels=1):
    if not os.path.exists(file_src):
        print('Source not found!')
        return False

    if not os.path.exists(os.path.dirname(file_dst)):
        os.makedirs(os.path.dirname(file_dst))

    try:
        s_read = wave.open(file_src, 'r')
        s_write = wave.open(file_dst, 'w')
    except:
        print('Failed to open files!')
        return False

    n_frames = s_read.getnframes()
    data = s_read.readframes(n_frames)

    try:
        converted = audioop.ratecv(data, 2, inchannels, inrate, outrate, None)
        if outchannels == 1:
            converted = audioop.tomono(converted[0], 2, 1, 0)
    except:
        print('Failed to downsample wav')
        return False

    try:
        s_write.setparams((outchannels, 2, outrate, 0, 'NONE', 'Uncompressed'))
        s_write.writeframes(converted)
    except:
        print('Failed to write wav')
        return False

    try:
        s_read.close()
        s_write.close()
    except:
        print('Failed to close wav files')
        return False
    return True

# End of TFile



