(function () {
  "use script";
  
  var tree = document.getElementById('tree-panel');
  var panelHead = document.getElementsByClassName('tree-panel_head')[0];
  panelHead.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if(e.target.className === 'search-button') {
      let input = document.getElementsByClassName('search-text')[0];
      let searchString = input.value;
      if(searchString) {
        input.value = "";
        DFS(tree, searchString);
      }
    } else if (e.target.className === 'add-button') {
      let nodeName = prompt("New Node Name");
      if(nodeName) {
        let node = createNode(nodeName);
        tree.appendChild(node);
      }
    }
  });
  
  function createNode(nodeName) {
    let nameTag = document.createElement('div');
    nameTag.className = 'node-view_node-name';
    nameTag.innerHTML = nodeName;
    
    let addButton = document.createElement('div');
    addButton.className = "node-view_button add";
    
    let delButton = document.createElement('div');
    delButton.className = "node-view_button del";
    
    let nodeElement = document.createElement('div');
    nodeElement.className = "node-view fold";
    nodeElement.setAttribute('value', nodeName);
    nodeElement.appendChild(nameTag);
    nodeElement.appendChild(addButton);
    nodeElement.appendChild(delButton);
    
    nodeElement.addEventListener('click', (e) => {
      e.stopPropagation();
      
      if(~e.target.className.indexOf("node-view_node-name")) {
        let thisNode = e.target.parentNode;
        thisNode.classList.toggle("fold");
      } else if(e.target.className === "node-view_button add") {
        let childNodeName = prompt("Child Node Name");
        if(childNodeName) {
          let childNode = createNode(childNodeName);
          let thisNode = e.target.parentNode;
          thisNode.appendChild(childNode);
          thisNode.classList.remove('fold');
        }
      } else if(e.target.className === "node-view_button del") {
        let thisNode = e.target.parentNode;
        thisNode.remove();
      }
    });
    
    return nodeElement;
  }
  
  function DFS(rootNode, searchString) {
    (function recurse(currentNode) {
      let containTargetNode = false;
      for(let i = 0, len = currentNode.children.length; i < len; i++) {
        let childNode = currentNode.children[i];
        if(childNode.classList.contains('node-view')) {
          if(recurse(childNode))
          containTargetNode = recurse(childNode) || containTargetNode;
        }
      }
      
      let isTargetNode = (currentNode != rootNode && ~currentNode.getAttribute('value').indexOf(searchString));
      
      containTargetNode && currentNode.classList.remove('fold');
      isTargetNode && currentNode.classList.add('highlight');
      
      return containTargetNode || isTargetNode;
    })(rootNode);
  }
  
})();