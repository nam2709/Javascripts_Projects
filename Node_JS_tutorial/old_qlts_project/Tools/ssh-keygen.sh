#!/usr/bin/env bash

# ssh-keygen -f id_rsa_test_key

# ssh-keygen -f id_rsa_hungnt

# ssh-copy-id mps@27.72.195.145

# OR:
cat id_rsa_test_key | ssh mps@27.72.195.145 "mkdir -p ~/.ssh && touch ~/.ssh/authorized_keys && chmod -R go= ~/.ssh && cat >> ~/.ssh/authorized_keys"

cat id_rsa_test_key.pub | ssh truongnv1@27.72.195.145 "mkdir -p ~/.ssh && touch ~/.ssh/authorized_keys && chmod -R go= ~/.ssh && cat >> ~/.ssh/authorized_keys"

cat id_rsa_hungnt.pub | ssh hungnt@27.72.195.145 "mkdir -p ~/.ssh && touch ~/.ssh/authorized_keys && chmod -R go= ~/.ssh && cat >> ~/.ssh/authorized_keys"


cat id_rsa_hungnt.pub | ssh hungnt@27.72.195.145 "mkdir -p ~/.ssh && touch ~/.ssh/authorized_keys && chmod -R go= ~/.ssh && cat >> ~/.ssh/authorized_keys"
