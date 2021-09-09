sudo apt install docker-compose
sudo wget -c https://github.com/jitsi/docker-jitsi-meet/archive/refs/tags/stable-6173.tar.gz -O - | tar -xz
cd docker-jitsi-meet-stable-6173
cp env.example .env
./gen-passwords.sh
mkdir -p ~/.jitsi-meet-cfg/{web/letsencrypt,transcripts,prosody/config,prosody/prosody-plugins-custom,jicofo,jvb,jigasi,jibri}
sudo groupadd docker
sudo usermod -aG docker ${USER}
su ${USER}
docker-compose up -d
