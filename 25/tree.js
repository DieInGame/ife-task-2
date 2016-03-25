"use script";

class Node {
  constructor(data, parent=null, children=[]) {
    this.data = data;
    this.parent = parent;
    this.children = children;
  }
  
  findIndexOfChild(data) {
    for(let i = 0, len = this.children.length; i < len; i++) {
      if(data === this.children[i].data) {
        return i;
      }
    }
    return -1;
  }
  
  addChild(node) {
    this.children.push(node);
  }
  
  removeChild(data) {
    let idx = this.findIndexOfChild(data);
    if(idx === -1) {
      throw new Error('Node to remove does not exists');
    }
    return this.children[idx];
  }
}

class Tree {
  constructor(data) {
    this._root = new Node(data);
  }
  
  add(data, toData, traversal = this.traverseBF) {
    var parent = null;
    this.contains((node) => {
      if(node.data === toData) {
        parent = node;
      }
    }, traversal);
    if(parent) {
      parent.addChild(new Node(data, parent));
    } else {
      throw new Error('Cannot add node to an non-existent parent');
    }
  }
  
  contains(cb, traversal = this.traverseBF) {
    traversal.call(this, cb);
  }
  
  remove(data, FromData, traversal = this.traverseBF) {
    var parent = null;
    this.contains((node) => {
      if(node.data === toData) {
        parent = node;
      }
    }, traversal);
    if(parent) {
      return parent.removeChild(data);
    } else {
      throw new Error('Parent does not exists');
    }
  }
  
  traverseDF(cb) {
    (function recurse(currentNode) {
      for(let i = 0, len = currentNode.children.length; i < len; i++) {
        recurse(currentNode.children[i]);
      }
      cb && cb(currentNode);
    })(this._root);
  }
  
  traverseBF(cb) {
    let queue = []; // use javascript array as a queue
    queue.push(this._root);
    let currentNode = queue.shift();
    while(currentNode) {
      for(let i = 0, len = currentNode.children.length; i < len; i++) {
        queue.push(currentNode.children[i]);
      }
      cb && cb(currentNode);
      currentNode = queue.shift();
    }
  }
}
