import { writeFile} from 'fs';
require('dotenv').config();

const env:any = process.env;

// TODO: Replace this with real test of whether this is a prod env
const isProd: boolean =  (env.ANGULAR_PRODUCTION_BUILD === 'true') ;
const prodPostfix: string = (isProd) ? '.prod' : '';
const environmentFile: string = `src/environments/environment${prodPostfix}.ts`;
const envRestBase: string = env.RESTBASE || 'http://localhost:8080';
const forumBase: string = env.FORUMBASE;

console.log(env); 

const envFileContents = `  
export const environment = {
    production: ${isProd},
    restBase : '${envRestBase}',
    forumBase : '${forumBase}'
};
`;

writeFile(environmentFile, envFileContents, (err) => {
    if(err){
        console.log(err);
        return;
    }

    console.log("envRestBase: ", envRestBase);
    console.log("environmentFile: ", environmentFile);
    console.log("prodPostfix: ", prodPostfix);
    console.log("isProd: ", isProd);
    console.log("FORUMBASE: ", forumBase);
    console.log("ANGULAR_BUILD_TYPE: ", env.ANGULAR_BUILD_TYPE);
    console.log("RESTBASE: ", env.RESTBASE);
    console.log("ANGULAR_PRODUCTION_BUILD: ", env.ANGULAR_PRODUCTION_BUILD)
    console.log("Sucessfully wrote environment file");
});