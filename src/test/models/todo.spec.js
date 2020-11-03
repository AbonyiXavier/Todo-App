import chai, { expect } from "chai";

import sinonChai from "sinon-chai";

import Todo from "../../models/todo";

chai.use(sinonChai);
describe("src/models/todo", () => {
  it("should be invalid if title is empty", (done) => {
    const todo = new Todo();

    todo.validate((err) => {
      expect(err.errors.title);
      done();
    });
  });

  it("should be invalid if description is empty", (done) => {
    const todo = new Todo();

    todo.validate((err) => {
      expect(err.errors.description);
      done();
    });
  });

  it("it should valid isDone is true", (done) => {
    const todo = new Todo({ isDone: true });

    todo.validate((err) => {
      expect(err.errors.isDone);
      done();
    });
  });

  it("it should valid isDone is false", (done) => {
    const todo = new Todo({ isDone: false });

    todo.validate((err) => {
      expect(err.errors.isDone);
      done();
    });
  });

  it("should be invalid if isDone is empty", (done) => {
    const todo = new Todo();

    todo.validate((err) => {
      expect(err.errors.isDone);
      done();
    });
  });
});
