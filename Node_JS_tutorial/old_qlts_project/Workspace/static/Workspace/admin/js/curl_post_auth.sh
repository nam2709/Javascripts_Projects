#!/usr/bin/env bash
# Script Name	: Project: TndResearchWeb
# Description	: Created by tamnd on 8/2/21 
# Args          :
# Author       	: Tamnd
# Email         : DUCTAMBKA@GMAIL.COM
# Copyright     : ©2021 Tamnd <ductambka@gmail.com>

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"tamnd","password":"Vonghialy@123"}' \
  http://localhost:8999/api/v1/jwt/token/