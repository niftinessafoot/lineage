/**
 * A library for walking up the DOM tree from a specified element.
 *
 * @remarks
 * Specify a DOM element and Lineage will iterate up the DOM until it hits `document.body`. An optional callback can be run on each node iteration. The topmost node can be configured to any parent node other than `body`.
 *
 * @packageDocumentation
 */

type Node = ParentNode;
interface Config {
  callback?(): unknown;
  callbackData?: unknown[];
  root?: Node;
}

/**
 * @param ele - The starting DOM node
 * @param config - Optional configuration
 *
 * @returns Array of DOM nodes.
 */
const Lineage = (ele: Node, config: Config): Node[] => {
  const map = [];
  const settings = {
    callback: null,
    callbackData: [],
    root: document.body,
  };

  try {
    Object.assign(settings, config);
    const { callback, callbackData, root } = settings;

    if (!ele.nodeType) {
      throw new Error(`${ele} is not a valid node.`);
    }

    if (!root.contains(ele)) {
      throw new Error(`${root} is not a parent of ${ele}`);
    }

    let current = ele;

    while (current.parentNode) {
      map.push(current);
      if (typeof callback === 'function') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        callback.call(null, current, callbackData);
      }
      if (current === root) {
        break;
      }
      current = current.parentNode;
    }
  } catch (err) {
    console.error(err);
    return [];
  }

  return map;
};

export { Lineage };
