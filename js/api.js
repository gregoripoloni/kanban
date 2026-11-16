const Api = (() => {
  const baseUrl = CONFIG.USE_MOCK ? '/mock' : CONFIG.API_URL;
  const doFetch = CONFIG.USE_MOCK ? MockApi.fetch : window.fetch.bind(window);

  async function request(path, options = {}) {
    let response;
    try {
      response = await doFetch(`${baseUrl}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
      });
    } catch {
      throw new Error('Falha de comunicação com o servidor. Verifique sua conexão.');
    }

    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao comunicar com a API.`);
    }
    return response.json();
  }

  return {
    listTasks: () => request('/tasks'),
    createTask: (task) =>
      request('/tasks', { method: 'POST', body: JSON.stringify(task) }),
    updateTask: (id, task) =>
      request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(task) }),
    moveTask: (id, status) =>
      request(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    deleteTask: (id) =>
      request(`/tasks/${id}`, { method: 'DELETE' }),
  };
})();
