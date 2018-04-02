import browserEnv from 'browser-env';

browserEnv();

// So the tests fail when React warns about something
console.warn = (message) => {
  throw new Error(message);
};

console.error = (message) => {
  throw new Error(message);
};
