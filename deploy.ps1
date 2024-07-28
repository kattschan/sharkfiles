# Function to display usage
function Show-Usage {
    Write-Output "Usage: .\deploy.ps1 [express]"
    exit 1
}

# Check for arguments
if ($args.Count -gt 1) {
    Show-Usage
}

# Variables
$server = "root@sharkfiles.kattschan.co.uk"
$remoteDir = "/root"
$buildDir = "build"
$zipFile = "build.zip"

if ($args[0] -eq "express") {
    # Upload express.js and run specific commands
    scp "express.js" "${server}:${remoteDir}"
    ssh $server "mv express.js sharkfiles; pm2 restart express"
}
else {
    npm run build

    if ($LASTEXITCODE -ne 0) {
        Write-Output "npm build failed."
        exit 1
    }

    # Move express.js and package.json into the build folder
    Copy-Item -Path "express.js" -Destination "$buildDir/"
    Copy-Item -Path "package.json" -Destination "$buildDir/"

    # Compress the build folder
    Compress-Archive -Path "$buildDir/*" -DestinationPath $zipFile -Force
    # Upload the zipped build folder
    scp $zipFile "${server}:${remoteDir}"
    ssh $server "mv sharkfiles/config.json .; mv sharkfiles/node_modules .; pm2 stop all; rm -rf sharkfiles; unzip build.zip; rm build.zip; mkdir sharkfiles; mv * sharkfiles; cd sharkfiles; npm i; pm2 restart all;"
    Remove-Item -Path $zipFile
}
Write-Output "Deployment complete."
