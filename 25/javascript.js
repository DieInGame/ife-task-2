(function () {
  "use script";
  
  var panelHead = document.getElementsByClassName('tree-panel_head')[0];
  panelHead.addEventListener('click', (e) => {
    e.stopPropagation();
    if(e.target.className === 'search-button') {
      console.log('search');
    } else if (e.target.className === 'add-button') {
      console.log('add');
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
    nodeElement.className = "node-view";
    nodeElement.appendChild(nameTag);
    nodeElement.appendChild(addButton);
    nodeElement.appendChild(delButton);
    
    nodeElement.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    return nodeElement;
  }
  
})();