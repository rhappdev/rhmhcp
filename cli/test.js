'use strict';

const fs = require('fs');
const et = require('elementtree');
const tree = et.parse(fs.readFileSync('fixtures/config.xml', 'utf8'));

// const sub = tree.find('./chcp');

// if (sub) {
//   console.log('found chcp')
//   console.log(sub.getItem(0))
//   for (var i in sub) console.log(i)
// } else {
  // console.log(tree.find('./widget'));
  const root = et.Element('chcp');
  const url = et.SubElement(root, 'config-file');
  url.set('url', 'test');
  const t = tree.find('./')
  t.append(root)
  const newTree = new et.ElementTree(t);
  console.log(newTree.write({

    indent: 4
  }));
// }
