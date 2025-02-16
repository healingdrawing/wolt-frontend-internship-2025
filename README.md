# wolt-frontend-internship-2025  
DOPC - Delivery Order Price Calculator UI.  

![demo](demo.webp)

## Assignment
https://github.com/woltapp/frontend-internship-2025  

## Before build  
The `.env` file used to manage cors restrictions in development.  
To run builded version, use vscode live server extension
https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

### Run steps:
- install bun runtime https://bun.sh (`version v1.1.45 (196621f2)` used for development)  
- install vscode https://code.visualstudio.com  
- install vscode live server extension https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer  
- clone the repository  
- open cloned repository or unzipped folder in vscode  
- open terminal in root folder(where this README.md file placed)  
- terminal `bun i`  
- terminal `bun run dev` , it will build project, then run bun mini server to manage API requests locally  
- open file `public/index.html` in vscode with Live Server extension, it will open browser(in "explorer" tab of vscode, left mouse button click on file `index.html` to open file in editor, then, again in "explorer" tab of vscode, right mouse button click on file `index.html` and choose `Open with Live Server`)  
- test DOPC.  

### Target development version  
Set `TARGET=dev` inside `.env` file.  

### Target production version  
Set `TARGET=pro` inside `.env` file.  

## Build  
`bun run build`  

## Details  
The `.env` file rule commented inside `.gitignore`, since `.env` used only for manage development/production target for `bun build ...` command.  

Project created using `bun init` command. The `react` and `jotai` added later using `bun add` command. Testing environment set according to bun docs.  

Rare lags of (Live Server) vscode extension detected. To solve lags, reopen vscode.  
If execution `bun run dev` fails with error code, reopen vscode fixes this too. Development server written just as is, for dev needs only(it was not part of an assignment).  

To run tests execute `bun test` command in terminal opened in root folder.  

Developed on linux.  
