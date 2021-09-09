#check if nodejs is installed
if nodejs -v 2> /dev/null 1> /dev/null
then
        echo "NodeJS [STATUS]: Installed"
else
	echo "NodeJS [STATUS]: Uninstalled
	Try: 'sudo apt install nodejs'"
        exit
fi


#check if npm is installed
if npm -v 2> /dev/null 1> /dev/null
then
	echo "npm [STATUS]: Installed"
else
	echo "npm [STATUS]: Uninstalled
	Try 'sudo apt install npm'"
	exit
fi


if wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
then
	echo "MongoDB has been installed."
else
	echo "Failed to install MongoDB"
fi
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

sudo apt-get update

sudo apt-get install -y mongodb

sudo service mongodb start




#clone repository from microsoft
git clone -q --depth=1 https://github.com/Microsoft/TypeScript-Node-Starter.git Topi

#enter directory
cd Topi
npm install


#make new directories
mkdir -p /data/db
chmod 777 /data/db

#start REST endpoint
service mongodb start

npm run build
npm start
