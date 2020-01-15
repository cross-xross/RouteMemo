FROM gitpod/workspace-full:latest

USER root

ENV NVM_DIR /usr/local/nvm
SHELL ["/bin/bash", "--login", "-c"]

# Install custom tools, runtime, etc.
RUN apt-get update -y && apt-get dist-upgrade -y curl npm nodejs git;
RUN apt-get install build-essential libssl-dev && apt-get clean && rm -rf /var/cache/apt/* && rm -rf /var/lib/apt/lists/* && rm -rf /tmp/*

# compatibility fix for node on ubuntu
RUN ln -s /usr/bin/nodejs /usr/bin/node;

# install nvm
RUN curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash

# invoke nvm to install node
RUN cp -f ~/.nvm/nvm.sh ~/.nvm/nvm-tmp.sh; \
    echo "nvm install 0.12.2; nvm alias default 0.12.2" >> ~/.nvm/nvm-tmp.sh; \
    sh ~/.nvm/nvm-tmp.sh; \
    rm ~/.nvm/nvm-tmp.sh;

RUN nvm install 12.14.0 && nvm use 12.14.0 && nvm cache clear
RUN npm install expo-cli --global
RUN npm install react-native-modal
