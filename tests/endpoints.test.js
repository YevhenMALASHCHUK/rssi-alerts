let chai = import('chai');
let chaiHttp = import('chai-http');
let app = import('../src/app');

// chai.use(chaiHttp);

describe('Test endpoints', () => {
  it("/rssis", () => {
    chai.request(app).post('/rssis')
    .query({
      deviceId: 'bd4bc0db-4279-4941-9808-20b2ee07aa39',
      rssiLevel: -70})
    .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
    });
  });
});
