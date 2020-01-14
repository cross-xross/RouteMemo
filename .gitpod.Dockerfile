FROM gitpod/workspace-full:latest

USER root

# Install custom tools, runtime, etc.
RUN npm install expo-cli --global
