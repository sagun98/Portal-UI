import { writeFile} from 'fs';
require('dotenv').config();

const env:any = process.env;

const isProd: boolean =  (env.ANGULAR_PRODUCTION_BUILD === 'true') ;
const prodPostfix: string = (isProd) ? '.prod' : '';
const environmentFile: string = `src/environments/environment${prodPostfix}.ts`;
const envRestBase: string = env.RESTBASE || 'http://localhost:8080';
const editorUrl: string = env.EDITOR_URL || 'http://localhost/editor/';
const forumBase: string = env.FORUMBASE;
const nodebbMasterToken: string = env.FORUM_MASTER_TOKEN;

const envFileContents = `  
export const environment = {
    production: ${isProd},
    restBase : '${envRestBase}',
    forumBase : '${forumBase}',
    editorUrl : '${editorUrl}'
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