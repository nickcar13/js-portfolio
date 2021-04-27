const fs = require('fs'); //para trabajar con archivos de computadora

fs.writeFileSync('./.env', `API=${process.env.API}`);
