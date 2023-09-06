#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
#
# __init__.py
__author__ = 'TND - NGUYEN DUC TAM'
import os
from sys import platform
from uuid import uuid4 as UUID4

from PyPDF2 import PdfFileWriter, PdfFileReader

OS_TYPE = None
if platform == "linux" or platform == "linux2":
    OS_TYPE = "linux" # linux
elif platform == "darwin":
    OS_TYPE = "osx" # OS X
elif platform == "win32":
    OS_TYPE = "windows" # Windows...
print('OS_TYPE = %s' % OS_TYPE)

def get_filetype(input_path):
    result = None
    if OS_TYPE == 'windows':
        import magic
        result = magic.from_file(input_path, mime=True)
    elif OS_TYPE == 'linux':
        import imghdr
        result = imghdr.what(input_path)
        if result is None:
            import filetype
            kind = filetype.guess(input_path)
            if kind is None:
                print('Cannot guess file type!')
            else:
                result = kind.extension
            if result is None:
                import magic
                result = magic.from_file(input_path, mime=True)
    elif OS_TYPE == 'osx':
        # brew install libmagic
        import imghdr
        result = imghdr.what(input_path)
        if result is None:
            import filetype
            kind = filetype.guess(input_path)
            if kind is None:
                print('Cannot guess file type!')
            else:
                result = kind.extension
            if result is None:
                try:
                    import magic
                    result = magic.from_file(input_path, mime=True)
                except Exception as xx:
                    print(str(xx))
    else:
        print('Can not found supported OS!')
    print(result)
    return result

def split_pdf(input_path, out_dir=None):
    pages = []
    result = False
    status = ""

    try:
        inputpdf = PdfFileReader(open(input_path, "rb"))
        if inputpdf.isEncrypted:
            try:
                inputpdf.decrypt('')
                print('File Decrypted (PyPDF2)')
            except:
                try:
                    print('File is encrypted, trying to decrypt with qpdf...')
                    command="cp "+input_path+" temp.pdf; qpdf --password='' --decrypt temp.pdf "+input_path
                    os.system(command)
                    print('File Decrypted (qpdf)...')
                    #re-open the decrypted file
                    fp = open(input_path, "rb")
                    inputpdf = PdfFileReader(fp)
                except Exception as xx:
                    print('Can not decrypted file... Exception: %s' % str(xx))
        else:
            print('File Not Encrypted')
        for i in range(inputpdf.numPages):
            output = PdfFileWriter()
            output.addPage(inputpdf.getPage(i))
            temp = {}
            temp['num'] = i
            temp['uuid'] = UUID4()
            if out_dir is None:
                temp['file'] = str("%s.pdf" % (temp['uuid']))
            else:
                if os.path.exists(out_dir) is False:
                    print('%s does not exist...' % out_dir)
                    try:
                        print('Trying create dir %s...' % out_dir)
                        os.mkdir(out_dir)
                        print('Created: %s' % out_dir)
                    except Exception as ex:
                        print('Can not create dir %s ERROR: %s' % (out_dir, str(ex)))
                        print(str(ex))
                temp['file'] = str("%s/%s.pdf" % (out_dir, UUID4()))
            with open(temp['file'], "wb") as outputStream:
                output.write(outputStream)
                pages.append(temp)
        result = True
        status = "Success"
    except Exception as xx:
        status = str(xx)
        print(status)
    print('result = %s' % result)
    print('pages = %s' % str(pages))
    print('status = %s' % status)
    return result, pages, status

# result, pages, status = split_pdf("samples/document.pdf")
# result, pages, status = split_pdf("Cacmactoantap31.pdf")
# result, pages, status = split_pdf("samples/Adobe2.pdf", out_dir='Adobe')
# get_filetype("samples/Adobe.pdf")
# get_filetype("samples/1.jpeg")