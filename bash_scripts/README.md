## Self-Hosting Jitsi With Docker
---
​
The jitsi_install.sh script utilizes the below commands to run Jitsi Meet on a machine utilizing Docker and Docker Compose.
​
---
​
### Initial Setup
---
This ensures Docker compose and jitsi are downloaded properly.
​
​
1. Download Docker Compose
​
```
> sudo apt install docker-compose
```
​
2. Download and extract the latest Jitsi release
```
> sudo wget -c https://github.com/jitsi/docker-jitsi-meet/archive/refs/tags/stable-6173.tar.gz -O - | tar -xz
```
3. Go into the Jitsi Repository
```
cd docker-jitsi-meet-stable-6173
```
4. Create a .env file by copying the Jitsi env.example
```
> cp env.example .env
```
​
5. Set strong passwords in the security section options of .env file by running the given bash script
```
> ./gen-passwords.sh
```
6. Create required config directories
```
> mkdir -p ~/.jitsi-meet-cfg/{web/letsencrypt,transcripts,prosody/config,prosody/prosody-plugins-custom,jicofo,jvb,jigasi,jibri}
```
​
Assuming all of these steps run successfully you should be able to run Jitsi with Docker.
​
### Connecting to Docker and Using Docker-Compose
---
This ensures Docker is set up with the correct user.
​
1. Create the docker group
​
```
> sudo groupadd docker
```
​
2. Add your user to the docker group
​
```
> sudo usermod -aG docker ${USER}
```
​
3. Re-evaluates group membership with updated changes
​
```
> su ${USER}
```
​
4. Test docker is setup correctly with hello-world
​
```
> docker run hello-world
```
​
5. Runs docker-compose
​
```
> docker-compose up -d
```
​
5. Access the web UI at ```https://localhost:8443``` (or a different port if you edit the compose file)
​

