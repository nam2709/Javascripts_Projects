#!/bin/bash

# Get enviroment

SRCLOC="/Users/apple/1.MPS/Tnd-Projects/Tnd-Linkedin/LisServer/Account"
TARLOC="mps@10.196.197.12:/data/LisServer/Account"

TARLOC="mps@27.72.195.145:/data/LisServer/Account"

# Update ignore file types
rsync --update -zarv --include="*/" --include="*.py" --exclude="*" $SRCLOC/* $TARLOC
