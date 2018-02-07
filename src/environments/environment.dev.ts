// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// --env=dev
// ATTENTION: Ne mettre ici que des variables qui ne permettent de rien faire si quelqu'un d'autre y avait accès


export const environment = {
  production: false, 
  host: 'localhost', 
  apiGatewayURL: 'http://localhost:8080'
};
