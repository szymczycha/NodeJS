const os = require("os")
const fs = require("fs");
const { resolve } = require("path");

const save = async (count) => {
    return new Promise((resolve, reject)=>{
        let i = 0;
        let interval = setInterval(()=>{
            let date = new Date();
            fs.writeFile(
                `./log/log_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}.log`, 
            JSON.stringify({
                totalmem: os.totalmem(),
                freemem: os.freemem()
            }), 
            (err) => {
                if (err)
                  reject("error: " + err);
                else {
                  console.log("File written successfully");
                }
              });
              i++
              if(i==count){
                clearInterval(interval);
                resolve("all files written successfully")
              }
        }, 1000);
    })
}
const readAll = async () => {
    return new Promise((resolve, reject) => {
        let files = [];
        
        fs.readdir("./log", "utf-8", (err, data)=>{
            data.forEach(element => {
                fs.readFile(`./log/${element}`, "utf-8", (err, data) =>{
                    files.push(data);
                    console.log(data)
                });
            });
        })

        resolve(files);
    });
}
const go = async () => {
    const savedFiles = await save(5)
    console.log(savedFiles)
    const readFiles = await readAll(savedFiles)
    console.log(readFiles);
}

go()