const tabsbank = [];
let tablist;



const selectTab = (num) => {
  tabsbank.forEach(function(tab, i) {
    console.log('selectBrand');
    if (i == num) {
      tab.style.display ='';
    }
    else {
      tab.style.display = 'none';
    }
  });

  for (var i = 0; i < tablist.childNodes.length; i++) {
    if (i == num) {
      tablist.childNodes[i].style.background = '#4a7f7f';
      tablist.childNodes[i].style.fontWeight = 800;
      tablist.childNodes[i].style.color = 'azure';
      tablist.childNodes[i].style.padding = 1+'em';
      tablist.childNodes[i].style.border = 1 +'em';
      tablist.childNodes[i].style.borderRadius = 0.2 +'em';
      tablist.childNodes[i].style.margin = 0.3+'em';
    } else {
      tablist.childNodes[i].style.background = '';
      tablist.childNodes[i].style.fontWeight = 400;
      tablist.childNodes[i].style.color = 'darkslategrey';
      tablist.childNodes[i].style.padding = 1+'em';
      tablist.childNodes[i].style.border = 1 +'em';
      tablist.childNodes[i].style.borderRadius = 0.2 +'em';
      tablist.childNodes[i].style.margin = 0.3+'em';

    }
  }
};


function asTabs(node) {
  node.style.display = "block";
  node.style.alignItems =  "center";
  node.style.color = "azure";
  node.style.cssFloat= "left";
  for (var i = 0; i < node.children.length; i++) {
    var tabi = node.children[i];
    if (tabi.nodeType == document.ELEMENT_NODE) {
      tabsbank.push(tabi);
    }
  }
  console.log(tabsbank);

  tablist = document.createElement('div');
  tabsbank.forEach(function(tab, i) {
    const button = document.createElement('button');
    button.addEventListener('click', function() {
      selectTab(i);
    });
    button.textContent = tab.getAttribute('data-tabname');
    tablist.appendChild(button);
    console.log('täällä on käyty');
    node.insertBefore(tablist, node.firstChild);

  });


}



asTabs(document.querySelector("tab-panel"));
selectTab(0);
