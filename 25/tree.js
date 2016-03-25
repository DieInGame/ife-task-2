"use script";

class Node {
  constructor(nodeName, parent=null, children=[]) {
    this.nodeName = nodeName;
    this.parent = parent;
    this.children = children;
    
    let addButton = document.createElement('div');
    addButton.className = "node-view_button add";
    
    let delButton = document.createElement('div');
    addButton.className = "node-view_button del";
    
    let nodeElement = document.createElement('div');
    nodeElement.className = "node-view";
    nodeElement.appendChild(addButton);
    nodeElement.appendChild(delButton);
    
    this.element = nodeElement;
  }
  
  addChild(nodeName) {
    let childNode = new Node(nodeName, this);
    this.element.appendChild(childNode.element);
  }
  
  remove() {
    this.element.remove();
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

class NodeView {
  constructor(nodeName) {
    let addButton = document.createElement('div');
    addButton.className = "node-view_button add";
    
    let delButton = document.createElement('div');
    addButton.className = "node-view_button del";
    
    let nodeElement = document.createElement('div');
    nodeElement.className = "node-view";
    nodeElement.appendChild(addButton);
    nodeElement.appendChild(delButton);
    
    this._view = nodeElement;
    this._model = 
  }
  
  add() {
    let nodeName = prompt("What's the name of this node");
    if(nodeName) {
      
    }
  }
}

class TreeView {
  constructor(element) {
    this._rootView = element;
    this._treeModel = new Tree(element);
  }
  
  add() {
    
  }
  
  remove() {
    
  }
  
  
}