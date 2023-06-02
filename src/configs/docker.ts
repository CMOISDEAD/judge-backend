import Docker from 'dockerode';

export default new Docker({
  protocol: 'http',
  port: '3000',
});
