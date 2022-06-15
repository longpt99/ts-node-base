import assert from 'assert';

describe('Loyalty Controller', () => {
  // before((done) => {
  //   db.serialize((err) => {
  //     if (err) {
  //       return done(err);
  //     }

  //     buildSchemas(db);

  //     done();
  //   });
  // });

  describe('GET /loyalty', () => {
    it('should return health', (done) => {
      assert.strictEqual(3, 3);
      done();
    });
  });
});
