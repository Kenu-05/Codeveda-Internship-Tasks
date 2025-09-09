const apiUrl = 'http://localhost:5000/api/users'; // Backend API URL

const userList = document.getElementById('userList');
const userForm = document.getElementById('userForm');
const userId = document.getElementById('userId');
const userName = document.getElementById('userName');

let editingUserId = null; // Global variable to track editing

// Fetch and display users
async function fetchUsers() {
  const response = await fetch(apiUrl);
  const users = await response.json();
  userList.innerHTML = '';

  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `ID: ${user.id}, Name: ${user.name}`;

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.style.marginLeft = '10px';
    editBtn.addEventListener('click', () => editUser(user));

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.addEventListener('click', () => deleteUser(user.id));

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    userList.appendChild(li);
  });
}

// Delete user
async function deleteUser(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchUsers(); // Refresh list
}

// Edit user
function editUser(user) {
  userId.value = user.id;
  userName.value = user.name;
  editingUserId = user.id; // Track which user is being edited
}

// Handle form submit for Add or Update
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userData = {
    id: userId.value,
    name: userName.value
  };

  if (editingUserId) {
    // Update existing user
    await fetch(`${apiUrl}/${editingUserId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    editingUserId = null; // Reset after update
  } else {
    // Add new user
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
  }

  // Clear form
  userId.value = '';
  userName.value = '';

  // Refresh list
  fetchUsers();
});

// Initial fetch
fetchUsers();
