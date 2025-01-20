# wolt-frontend-internship-2025  
DOPC - Delivery Order Price Calculator UI.  

## Before build  
The `.env` file used to manage cors restrictions in development.  
To run builded version, use vscode live server extension
https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

### Run steps:
- install bun runtime https://bun.sh (`version v1.1.45 (196621f2)` used for development)  
- install vscode https://code.visualstudio.com  
- install vscode live server extension https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer  
- clone the repo  
- open terminal in root folder(where README.md file placed)  
- terminal `bun i`  
- terminal `bun run build` , it will build the javascript version of DOPC for web browser  
- terminal `bun run dev` , it will run bun mini server to manage json locally
- open `index.html` in vscode with Live Server extension, it will open browser
- test DOPC.  

### Target development version  
Set `TARGET=dev` inside `.env` file.  

### Target production version  
Set `TARGET=pro` inside `.env` file.  

## Build  
`bun run build`  

## Details  
The `.env` file rule commented inside `.gitignore`, since `.env` used only for manage development/production target for `bun build ...` command.  

Project created using `bun init` command. The `react` and `jotai` added later using `bun add` command.  
