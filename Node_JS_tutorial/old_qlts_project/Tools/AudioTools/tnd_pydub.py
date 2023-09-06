#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
#
# __init__.py
__author__ = 'TND - NGUYEN DUC TAM'
import subprocess
import wave
import contextlib

from pydub import AudioSegment
from mutagen.easyid3 import EasyID3


#FFMPEG_PATH = "/data/ffmpeg/ffmpeg"
FFMPEG_PATH = "/usr/local/bin/ffmpeg"

def detect_leading_silence(sound, silence_threshold=-50.0, chunk_size=10):
    '''
    sound is a pydub.AudioSegment
    silence_threshold in dB
    chunk_size in ms

    iterate over chunks until you find the first one with sound
    '''
    trim_ms = 0 # ms

    assert chunk_size > 0 # to avoid infinite loop
    while sound[trim_ms:trim_ms+chunk_size].dBFS < silence_threshold and trim_ms < len(sound):
        trim_ms += chunk_size

    return(trim_ms)

def trim_silent(input_file):
	sound = AudioSegment.from_file(input_file, format="mp3")

	start_trim = detect_leading_silence(sound)
	end_trim = detect_leading_silence(sound.reverse())

	duration = len(sound)
	trimmed_sound = sound[start_trim:duration-end_trim]
	output_file = input_file + '-out.mp3'
	trimmed_sound.export( output_file, format="mp3")
	return(output_file)

def get_duration(input_file):
	'''
	args = str('%s -n stat | grep Length' % (input_file))
	#plpy.notice(args)
	result = subprocess.run(['/usr/bin/sox', args], stdout=subprocess.PIPE)
	#plpy.notice(str(result.stdout))
	duration = str(result.stdout).split(':')[1].lstrip()
	'''
	from mutagen.mp3 import MP3
	audio = MP3(input_file)
	duration = audio.info.length
	print('audio.info.length = %s' % str(audio.info.length))
	return duration


def get_duration2(fname):
	duration = None
	with contextlib.closing(wave.open(fname,'r')) as f:
		frames = f.getnframes()
		rate = f.getframerate()
		duration = frames / float(rate)
	print(duration)
	return duration

def cutfile(input_file, from_milisecon, to_milisecon, output_file=None):
	'''
	startMin = 9
	startSec = 50
	endMin = 13
	endSec = 30
	# Time to miliseconds
	startTime = startMin*60*1000+startSec*1000
	endTime = endMin*60*1000+endSec*1000
	startTime = from_milisecon
	#plpy.notice('startTime = %s ' % str(startTime))
	'''
	duration = get_duration2(input_file)*1000 # Duration in minisecond
	#plpy.notice('duration = %s ' % str(duration))
	endTime = duration - to_milisecon
	#plpy.notice('endTime = %s ' % str(endTime))
	if output_file is None:
		output_file = input_file + '-out.mp3'
	'''
	args = str('/usr/bin/ffmpeg -ss 0.%s -t %s -i %s %s' %(str(f_milisecon), str(_fix_duration), input_file, output_file))
	#plpy.notice('args = %s' % args)
	os.system(args)
	'''
	# Opening file and extracting segment
	song = AudioSegment.from_mp3( input_file )
	extract = song[from_milisecon:to_milisecon]
	# Saving
	extract.export( output_file, format="mp3")
	return output_file

def combine(input_list, output_file):
    combined = AudioSegment.empty()
    for song_file in input_list:
        print('Adding file: %s' % song_file)
        song = AudioSegment.from_mp3( song_file )
        combined += song
    print('Combine done!')
    AudioSegment.converter = FFMPEG_PATH
    combined.export(output_file, format="mp3")
    return(output_file)

def wav2mp3(input_file, output_file):
    try:
        podcast = AudioSegment.from_wav(input_file)
        podcast = podcast.normalize()
        AudioSegment.converter = FFMPEG_PATH
        podcast.export(output_file)
        print('wav2mp3 DONE!')
        return(output_file)
    except Exception as xx:
        print('wav2mp3 ERROR: %s' % str(xx))

        return('WAV to MP3 ERROR: %s' % str(xx))

def mp32wav(input_file, output_file):
    try:
        sound = AudioSegment.from_mp3(input_file)
        AudioSegment.converter = FFMPEG_PATH
        sound.export(output_file, format="wav")
        print('mp32wav DONE!')
        return(output_file)
    except Exception as xx:
        print('mp32wav ERROR: %s' % str(xx))

        return('MP3 to WAV ERROR: %s' % str(xx))

def write_audio_meta(input_file, title="Tamnd Title", artist="Tamnd Test Artist", album="Tamnd Test Album", composer="Tamnd Composer"):
	audio = EasyID3(input_file)
	audio['title'] = title
	audio['artist'] = artist
	audio['album'] = album
	audio['composer'] = composer # clear
	audio['acoustid_fingerprint'] = input_file
	audio.save()
	'''
	['albumartistsort',
	 'musicbrainz_albumstatus',
	 'lyricist',
	 'musicbrainz_workid',
	 'releasecountry',
	 'date',
	 'albumartist',
	 'musicbrainz_albumartistid',
	 'composer',
	 'catalognumber',
	 'encodedby',
	 'tracknumber',
	 'musicbrainz_albumid',
	 'album',
	 'asin',
	 'musicbrainz_artistid',
	 'mood',
	 'copyright',
	 'author',
	 'media',
	 'performer',
	 'length',
	 'acoustid_fingerprint',
	 'version',
	 'artistsort',
	 'titlesort',
	 'discsubtitle',
	 'website',
	 'musicip_fingerprint',
	 'conductor',
	 'musicbrainz_releasegroupid',
	 'compilation',
	 'barcode',
	 'performer:*',
	 'composersort',
	 'musicbrainz_discid',
	 'musicbrainz_albumtype',
	 'genre',
	 'isrc',
	 'discnumber',
	 'musicbrainz_trmid',
	 'acoustid_id',
	 'replaygain_*_gain',
	 'musicip_puid',
	 'originaldate',
	 'language',
	 'artist',
	 'title',
	 'bpm',
	 'musicbrainz_trackid',
	 'arranger',
	 'albumsort',
	 'replaygain_*_peak',
	 'organization',
	 'musicbrainz_releasetrackid']

	'''
	try:
		print(get_audio_info(input_file))
	except Exception as xx:
		print(str(xx))

def get_audio_info(input_file):
	command = str('%s -i %s' % (FFMPEG_PATH, input_file))
	sub_process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
	subprocess_return = sub_process.stdout.read()
	print(subprocess_return)
	return str(subprocess_return)

# mp32wav("/Users/apple/1.MPS/Tnd-Projects/Tnd-Linkedin/LisServer/Tools/AudioTools/samples/test-tongdai.mp3", "/Users/apple/1.MPS/Tnd-Projects/Tnd-Linkedin/LisServer/Tools/AudioTools/samples/test-tongdai.wav")

# cutfile("/Users/apple/1.MPS/Tnd-Projects/Tnd-Linkedin/LisServer/Tools/AudioTools/samples/test-tongdai.wav", 0, 30000, output_file="/Users/apple/1.MPS/Tnd-Projects/Tnd-Linkedin/LisServer/Tools/AudioTools/samples/test-tongdai-30s.mp3")

# get_audio_info("/Users/apple/1.MPS/Tnd-Projects/Tnd-Linkedin/LisServer/Tools/AudioTools/samples/test-tongdai.wav")
# get_audio_info("/Users/apple/1.MPS/Tnd-Projects/Tnd-Linkedin/LisServer/Tools/AudioTools/samples/test-tongdai.mp3") # Error with MP3

# write_audio_meta("/Users/apple/1.MPS/Tnd-Projects/Tnd-Linkedin/LisServer/Tools/AudioTools/samples/test-tongdai.mp3", title="Tamnd Title", artist="Tamnd Test Artist", album="Tamnd Test Album", composer="Tamnd Composer")