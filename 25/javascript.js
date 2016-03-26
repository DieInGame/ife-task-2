(function () {
  "use script";
  
  var panelHead = document.getElementsByClassName('tree-panel_head')[0];
  panelHead.addEventListener('click', (e) => {
    e.stopPropagation();
    if(e.target.className === 'search-button') {
      console.log('search');
    } else if (e.target.className === 'add-button') {
      let nodeName = prompt("New Node Name");
      if(nodeName) {
        let node = createNode(nodeName);
        document.getElementById('tree-panel').appendChild(node);
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
    nodeElement.appendChild(nameTag);
    nodeElement.appendChild(addButton);
    nodeElement.appendChild(delButton);
    
    nodeElement.addEventListener('click', (e) => {
      e.stopPropagation();
      if(~e.target.className.indexOf("node-view_node-name")) {
        let node = e.target.parentNode;
        if(~node.className.indexOf("fold")) {
          node.className = node.className.replace("fold", "");
        } else {
          node.className += "fold";
        }
      } else if(e.target.className === "node-view_button add") {
        let childNodeName = prompt("Child Node Name");
        if(childNodeName) {
          let node = createNode(childNodeName);
          e.target.parentNode.appendChild(node);
        }
      } else if(e.target.className === "node-view_button del") {
        
      }
    });
    
    return nodeElement;
  }
  
})();