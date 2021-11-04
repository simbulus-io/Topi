
# Welcome to your CDK Python project!

This is a blank project for Python development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

This project is set up like a standard Python project.  The initialization
process also creates a virtualenv within this project, stored under the `.venv`
directory.  To create the virtualenv it assumes that there is a `python3`
(or `python` for Windows) executable in your path with access to the `venv`
package. If for any reason the automatic creation of the virtualenv fails,
you can create the virtualenv manually.

On Ubuntu system you'll need an apt package
```
sudo apt install python3.8-venv
```

To manually create a virtualenv on MacOS and Linux:

```
$ python3 -m venv .venv
```

After the init process completes and the virtualenv is created, you can use the following
step to activate your virtualenv.

```
$ source .venv/bin/activate
```

If you are a Windows platform, you would activate the virtualenv like this:

```
% .venv\Scripts\activate.bat
```

Once the virtualenv is activated, you can install the required dependencies.

```
$ curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

$ pip install -r requirements.txt

$ python -m pip install  aws-cdk.aws-ec2

$ aws configure
 
```

install CDK
```
npm install -g aws-cdk
```

At this point you can now synthesize the CloudFormation template for this code.

```
$ cdk synth
```

To add additional dependencies, for example other CDK libraries, just add
them to your `setup.py` file and rerun the `pip install -r requirements.txt`
command.

## Useful commands

 * `cdk ls`          list all stacks in the app
 * `cdk synth`       emits the synthesized CloudFormation template
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk docs`        open CDK documentation

Enjoy!

For deployment!!!:

In vscode or wherever you have your code bank the command to deploy is:
```
*`cdk deploy`
```
then within your aws console connect to your ec2 instance that you just created and pull from the topi github using the command
```
*`git clone https://github.com/simbulus-io/Topi.git`
```
install nvm and node version 14.18.0 using the commands:
```
*`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`
```
```
*`. ~/.nvm/nvm.sh`
```
```
*`nvm install 14.18.0`
```
then once you have node 14.18.0 installed you should install yarn version 1.22.15 using the commands:
```
*`curl -o- -L https://yarnpkg.com/install.sh | bash`
```
```
*`source ~/.bashrc`
```
then  cd into Topi/topi_server using:
```
*`cd Topi/topi_server`
```
then run the following commands to get the api up and running
```
*`yarn build`
```
```
*`node dist/topi_main.js`
```
SUCCESS you just deployed the topi api on an ec2 server.
