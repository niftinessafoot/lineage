import { Lineage } from '../src/index.ts';
import { _C } from '../constants.js';

const expectedOutput = ['LI', 'UL', 'BODY'];

describe('Lineage:', () => {
  beforeEach(() => {
    const nodeOne = document.createElement('ul');
    const nodeTwo = document.createElement('li');
    nodeOne.id = 'one';
    nodeTwo.id = 'two';
    nodeOne.appendChild(nodeTwo);
    document.body.appendChild(nodeOne);
  });

  it('should return a DOM tree in array form', () => {
    const node = document.getElementById('two');
    const output = Lineage(node).map((ele) => ele.nodeName);

    expect(output).toEqual(expectedOutput);
  });

  describe('Errors:', () => {
    let err;

    beforeEach(() => {
      err = jest.spyOn(console, 'error').mockImplementation(() => true);
    });

    afterEach(() => {
      err.mockReset();
    });

    it('should throw an error if the first param is not a DOM node', () => {
      Lineage('foo');

      expect(err).toBeCalledWith(new Error(`foo ${_C.ErrorNode}`));
    });

    it('should return an empty array on DOM node issues', () => {
      const output = Lineage('foo');

      expect(output).toEqual([]);
    });

    it('should throw an error if the root is not a parent of the node', () => {
      const node = document.getElementById('two');
      const sibling = document.createElement('p');

      Lineage(node, { root: sibling });

      expect(err).toBeCalledWith(
        new Error(`${sibling} ${_C.ErrorParent} ${node}`)
      );
    });

    it('should return an empty array on parent root issues', () => {
      const node = document.getElementById('two');
      const sibling = document.createElement('p');
      document.body.appendChild(sibling);

      const output = Lineage(node, { root: sibling });

      expect(output).toEqual([]);
    });
  });

  describe('Callbacks:', () => {
    it('should run a provided callback on each iteration', () => {
      const node = document.getElementById('two');
      const callback = jest.fn();

      Lineage(node, { callback });

      expect(callback).toHaveBeenCalledTimes(3);
    });

    it('should run a provided callback with specified data', () => {
      const one = document.getElementById('one');
      const two = document.getElementById('two');
      const callback = jest.fn();

      Lineage(two, { callback, callbackData: 'bar' });

      expect(callback).toHaveBeenNthCalledWith(1, two, 'bar');
      expect(callback).toHaveBeenNthCalledWith(2, one, 'bar');
    });
  });
});
