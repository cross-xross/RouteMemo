FROM gitpod/workspace-full:latest

USER root

SHELL ["/bin/bash", "--login", "-c"]

# Install custom tools, runtime, etc.
RUN apt-get update -y && apt-get dist-upgrade -y && apt-get install build-essential libssl-dev && apt-get clean && rm -rf /var/cache/apt/* && rm -rf /var/lib/apt/lists/* && rm -rf /tmp/*
RUN curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
RUN nvm install 12.14.0 && nvm use 12.14.0 && nvm cache clear
RUN npm install expo-cli --global
RUN npm install react-native-modal
