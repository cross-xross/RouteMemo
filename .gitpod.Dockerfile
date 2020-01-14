FROM gitpod/workspace-full:latest

USER root

# Install custom tools, runtime, etc.
RUN sudo apt-get update && sudo apt-get dist-upgrade
RUN npm install expo-cli --global
RUN npm install react-native-modal
