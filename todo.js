// todo.js
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'todos.json');
const [, , cmd, ...rest] = process.argv; // cmd = add|list|remove, rest = args

function load() {
  try {
    const raw = fs.readFileSync(file, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    // if file doesn't exist or is corrupted, return empty list
    return [];
  }
}

function save(arr) {
  fs.writeFileSync(file, JSON.stringify(arr, null, 2), 'utf8');
}

if (cmd === 'add') {
  const text = rest.join(' ').trim();
  if (!text) {
    console.log('Usage: node todo.js add <text>');
    process.exit(1);
  }
  const todos = load();
  const item = { id: Date.now(), text };
  todos.push(item);
  save(todos);
  console.log('Added:', item);
} else if (cmd === 'list') {
  const todos = load();
  if (todos.length === 0) {
    console.log('No todos yet.');
  } else {
    todos.forEach(t => console.log(`${t.id}  - ${t.text}`));
  }
} else if (cmd === 'remove') {
  const id = Number(rest[0]);
  if (!id) {
    console.log('Usage: node todo.js remove <id>');
    process.exit(1);
  }
  let todos = load();
  const before = todos.length;
  todos = todos.filter(t => t.id !== id);
  if (todos.length === before) {
    console.log('No todo found with id', id);
  } else {
    save(todos);
    console.log('Removed', id);
  }
} else {
  console.log('Usage: node todo.js add <text> | list | remove <id>');
}
