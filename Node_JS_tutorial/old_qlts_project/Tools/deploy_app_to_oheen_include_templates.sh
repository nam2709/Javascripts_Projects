#!/bin/bash

# Get enviroment
source ~/.bash_profile
source ~/.bashrc

APPNAME="Tools"

rm -rf "$APISRC-bin/$APPNAME"

#### COmpile All and run on remote
# Remove all .pyc file
for i in $(find $APISRC/$APPNAME -name \*.pyc -type f)
do
	rm -rf "$i"
done

# Remove all migrations directory
# for i in $(find $APISRC-bin -name \*migrations -type d)
# do
# 	rm -rf "$i"
# done

# Remove all __pycache__ directory
for i in $(find $APISRC/$APPNAME -name \*__pycache__ -type d)
do
	rm -rf "$i"
done

# Compile
python -m compileall $APISRC/$APPNAME/
# Copy All file
if [[ "$1" == "all" ]]; then
    rsync --update -razv $APISRC/$APPNAME/* $APISRC-bin/$APPNAME/
else
# Copy ignore file types
    rsync --update -razv $APISRC/$APPNAME/* $APISRC-bin/$APPNAME/
fi

# Rename *.cpython-37.pyc  --> *.pyc
for i in $(find $APISRC-bin/$APPNAME -name \*.cpython-37.pyc -type f)
do
	mv "$i" "`echo $i | sed 's/.cpython-37//'`"
done

# Remove files in __pychache__ dir to parent dir
for i in $(find $APISRC-bin/$APPNAME -name \*.pyc -type f)
do
	mv "$i" "`echo $i | sed 's/__pycache__//'`"
done

# Delete __pychache__ dirs
for i in $(find $APISRC-bin/$APPNAME -name \*__pycache__ -type d)
do
	rm -rf "$i"
done

if [[ "$1" == "all" ]]; then
# Update All file type
    rsync --update -razv $APISRC-bin/$APPNAME/* root@oheen.com:$APISRC/$APPNAME/
else
# Update ignore file types
    rsync --update -razv $APISRC-bin/$APPNAME/* root@oheen.com:$APISRC/$APPNAME/
fi

#ssh -tt root@oheen.com 'source ~/.bashrc && /data/dp restart &'
