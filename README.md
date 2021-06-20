## About

The purpose of this app is to reduce CLI obstacles of operating a network by
Hyperledger Fabric. This app provides a UI to the administrator to invoke
commands. So the recursive CLI complication is eliminated by this project.

## How to run this project on you machine

1. Make sure your machine has unix based operating system (Linux,macOS).
2. Install git, curl and node on you machine.
3. Clone this project by `git clone https://github.com/Mahmud-007/HyperledgerFabric-Management-System.git` on you Home directory.
4. Run this `curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh | bash -s` to have fabric-samples on `HyperledgerFabric-Management-System` directory.
5. Add `bin` and `config` directory. Run `nano ~/.bashrc` or `source ~/.bashrc` .If you have VS Code use `code ~/.bashrc`
`export PATH=$PATH:$HOME/fabric-samples/bin`
`export FABRIC_CFG_PATH=$HOME/fabric-samples/config`
press `ctrl + s` to save and then `ctrl + x` to exit

6. Now run `npm install` then `npm start` in the both of frontend and api directory.
