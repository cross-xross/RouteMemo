FROM gitpod/workspace-full:latest

USER root

# Install custom tools, runtime, etc.
RUN apt-get update -y && apt-get dist-upgrade -y
RUN npm install expo-cli --global
RUN npm install react-native-modal
RUN expo update 35.0.0
