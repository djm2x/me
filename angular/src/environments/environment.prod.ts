const port = '3000';
const host = 'http://localhost';
export const environment = {
  production: true,

  apiUrl: `${host}:${port}/api`,
  url: `${host}:${port}`,
  hub: `localhost`,
};

export function cloneDeep(e) {
  return JSON.parse(JSON.stringify(e));
}
