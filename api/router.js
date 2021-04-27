const router = require('express').Router();
const { spawn } = require("child_process");
const cors = require("cors")


    //Network Down

router.get('/network-down',cors(),(req,res)=>{
    const scriptDir ="../fabric-samples/test-network"
    const scriptName = "network.sh"

    const ls = spawn(`./${scriptName}`,['down'],{cwd:scriptDir});

    ls.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
        
    });

    ls.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
        
    });

    ls.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
        
        res.send('closed');
    });


});

    //Netowrk Up

router.get('/network-up',cors(),(req,res)=>{
    const scriptDir ="../fabric-samples/test-network"
    const scriptName = "network.sh"

    const ls = spawn(`./${scriptName}`,['up'],{cwd:scriptDir});

    ls.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
        
    });

    ls.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
        
    });

    ls.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
        
        res.send('Network up');
    });

    
});

    //create channel 

router.get('/create/channel/:channelname',cors(),(req,res)=>{
    const scriptDir ="../fabric-samples/test-network"
    const scriptName = "network.sh"

    //const ls = spawn(`./${scriptName}`,['-c','testchannel'],{cwd:scriptDir});
    //const ls = spawn(`./${scriptName}`,['-c',req.params.channelname],{cwd:scriptDir});

    const ls = spawn(`./${scriptName}`,['up','createChannel','-ca','-c',req.params.channelname,'-s','couchdb'],{cwd:scriptDir});

    ls.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
        
    });

    ls.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
        
    });

    ls.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
        
        res.send('Channel create called');
    });

    // res.send('server is up and running');
});

    //mychannel createion

router.get(`/create/mychannel`,cors(),(req,res)=>{
    const scriptDir ="../fabric-samples/test-network"
    const scriptName = "network.sh"
    
    const ls = spawn(`./${scriptName}`,['up','createChannel','-ca','-c','mychannel','-s','couchdb'],{cwd:scriptDir});

    ls.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
        
    });

    ls.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
        
    });

    ls.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
        
        res.send('Channel create called');
    });
  
});

    //DeployCC

    router.get(`/deploycc/`,cors(),(req,res)=>{
        const scriptDir ="../fabric-samples/test-network"
        const scriptName = "network.sh"
        
        const data = req.query
        const file = data.ccfile

        const ls = spawn(`./${scriptName}`,['deployCC','-c',data.channelname,'-ccn',data.ccname,
        '-ccp',`../asset-transfer-basic/${file}`,
        '-ccl',data.cclanguage],{cwd:scriptDir});
    
        ls.stdout.on("data", data => {
            console.log(`stdout: ${data}`);
            
        });
    
        ls.stderr.on("data", data => {
            console.log(`stderr: ${data}`);
            
        });
    
        ls.on('error', (error) => {
            console.log(`error: ${error.message}`);
        });
    
        ls.on("close", code => {
            console.log(`child process exited with code ${code}`);
            
            res.send('Channel create called');
        });
      
    });

    //addOrg3

    router.get('/addorg/:channelname',cors(),(req,res)=>{
        const scriptDir ="../fabric-samples/test-network/addOrg3"
        const scriptName = "addOrg3.sh"
        
        const channel = req.params.channelname

        const ls = spawn(`./${scriptName}`,['up','-c',req.params.channelname],{cwd:scriptDir});
    
        ls.stdout.on("data", data => {
            console.log(`stdout: ${data}`);
            
        });
    
        ls.stderr.on("data", data => {
            console.log(`stderr: ${data}`);
            
        });
    
        ls.on('error', (error) => {
            console.log(`error: ${error.message}`);
        });
    
        ls.on("close", code => {
            console.log(`child process exited with code ${code}`);
            
            res.send('Organization added');
        });
      
    });

    //Test network create channel with couchdb

    // router.get('/create/testnetwork/:channel',cors(),(req,res)=>{
    //     const scriptDir ="../fabric-samples/test-network"
    //     const scriptName = "network.sh"
    
    //     //const ls = spawn(`./${scriptName}`,['-c','testchannel'],{cwd:scriptDir});
    //     const ls = spawn(`./${scriptName}`,['up','createChannel','-ca','-c',req.params.channel,'-s','couchdb'],{cwd:scriptDir});
    
    //     ls.stdout.on("data", data => {
    //         console.log(`stdout: ${data}`);
            
    //     });
    
    //     ls.stderr.on("data", data => {
    //         console.log(`stderr: ${data}`);
            
    //     });
    
    //     ls.on('error', (error) => {
    //         console.log(`error: ${error.message}`);
    //     });
    
    //     ls.on("close", code => {
    //         console.log(`child process exited with code ${code}`);
            
    //         res.send(`Test network is up with channel ${req.params.channel}.
    //         Couchdb is on http://localhost:5984/_utils/`);
    //     });
    
            
    // });


module.exports = router;