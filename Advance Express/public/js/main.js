const allowedTypes = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'text/plain',
  'application/zip'
];
const maxSize = 5 * 1024 * 1024; // 5MB

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById('myFile');
  const file = fileInput.files[0];
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = '';

  if (!file) {
    errorMessage.textContent = 'Please select a file.';
    return;
  }

  // Validate file type
  if (!allowedTypes.includes(file.type)) {
    errorMessage.textContent = 'Invalid file type.';
    return;
  }

  // Validate file size
  if (file.size > maxSize) {
    errorMessage.textContent = 'File size exceeds 5MB.';
    return;
  }

  // Upload
  const formData = new FormData();
  formData.append('myFile', file);

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Upload failed');
    }

    fileInput.value = '';
    fetchFiles(); // Refresh list
  } catch (err) {
    errorMessage.textContent = err.message;
  }
});

async function fetchFiles() {
  const res = await fetch('/api/files');
  const files = await res.json();

  const list = document.getElementById('fileList');
  list.innerHTML = '';

  files.forEach(file => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${file.originalName} (${Math.round(file.size / 1024)} KB)
      <a href="/api/download/${file._id}">📥 Download</a>
      <button onclick="deleteFile('${file._id}')">🗑️ Delete</button>
    `;
    list.appendChild(li);
  });
}

async function deleteFile(id) {
  const confirmed = confirm("Are you sure you want to delete this file?");
  if (!confirmed) return;

  await fetch(`/api/delete/${id}`, { method: 'DELETE' });
  fetchFiles();
}

fetchFiles();




async function fetchTrending() {
  try {
    const res = await fetch('/api/trending');
    const repos = await res.json();
    const trendingList = document.getElementById('trendingList');
    trendingList.innerHTML = '';

    repos.forEach(repo => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="${repo.url}" target="_blank"><strong>${repo.author}/${repo.name}</strong></a>
        – ⭐ ${repo.stars}<br/>
        <span>${repo.description || ''}</span>
      `;
      trendingList.appendChild(li);
    });
  } catch (err) {
    console.error('Trending fetch error:', err);
  }
}
fetchTrending();