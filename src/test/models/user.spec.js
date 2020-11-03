import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import sinon from "sinon";

import User from "../../models/User";

chai.use(sinonChai);
describe("src/models/user", () => {
  it("should be invalid if name is empty", (done) => {
    const user = new User();

    user.validate((err) => {
      expect(err.errors.name);
      done();
    });
  });

  it("should be invalid if email is empty", (done) => {
    const user = new User();

    user.validate((err) => {
      expect(err.errors.email);
      done();
    });
  });

  it("should valid email to be unique", (done) => {
    const email1 = "xavier@gmail.com";
    const email = "xavier@gmail.com";
    const user = new User({
      email,
      email1,
    });

    user.validate((err) => {
      expect(err.errors.email);
      done();
    });
  });

  it("it should be valid if verified is true", (done) => {
    const user = new User({ verified: true });

    user.validate((err) => {
      expect(err.errors.verified);
      done();
    });
  });

  it("it should be valid if verified is false", (done) => {
    const user = new User({ verified: false });

    user.validate((err) => {
      expect(err.errors.verified);
      done();
    });
  });

  it("it should throw error if resetPasswordToken is true", (done) => {
    const user = new User({ resetPasswordToken: true });

    user.validate((err) => {
      expect(err.errors.resetPasswordToken);
      done();
    });
  });

  it("it should be valid if resetPasswordToken is false", (done) => {
    const user = new User({ resetPasswordToken: false });

    user.validate((err) => {
      expect(err.errors.resetPasswordToken);
      done();
    });
  });
});
