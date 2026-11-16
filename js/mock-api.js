const MockApi = (() => {
  const STORAGE_KEY = 'kanban-mock-tasks';
  const LATENCY_MS = 50;

  const INITIAL_TASKS = [
    { id: '1', title: 'Definir requisitos', description: 'Levantar o que o painel precisa fazer', status: 'done' },
    { id: '2', title: 'Montar a interface', description: 'HTML semântico e Bootstrap', status: 'doing' },
    { id: '3', title: 'Integrar com a API', description: 'Fetch com GET, POST, PUT, PATCH e DELETE', status: 'todo' },
  ];

  function readTasks() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    writeTasks(INITIAL_TASKS);
    return [...INITIAL_TASKS];
  }

  function writeTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function nextId(tasks) {
    return String(Math.max(0, ...tasks.map((task) => Number(task.id))) + 1);
  }

  function jsonResponse(body, status = 200) {
    return new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  function simulateFailure() {
    const params = new URLSearchParams(location.search);
    if (params.get('mock') === 'offline') throw new TypeError('Failed to fetch');
    if (params.get('mock') === 'error500') return jsonResponse({ error: 'Simulated server error' }, 500);
    return null;
  }

  async function mockFetch(url, options = {}) {
    await new Promise((resolve) => setTimeout(resolve, LATENCY_MS));

    const failure = simulateFailure();
    if (failure) return failure;

    const method = (options.method ?? 'GET').toUpperCase();
    const [, id] = url.split('?')[0].match(/\/tasks\/?([^/]*)$/) ?? [];
    const body = options.body ? JSON.parse(options.body) : {};
    const tasks = readTasks();
    const index = id ? tasks.findIndex((task) => task.id === id) : -1;

    if (!url.includes('/tasks')) return jsonResponse({ error: 'Route not found' }, 404);

    if (method === 'GET' && !id) return jsonResponse(tasks);

    if (method === 'POST' && !id) {
      const created = { ...body, id: nextId(tasks) };
      writeTasks([...tasks, created]);
      return jsonResponse(created, 201);
    }

    if (id && index === -1) return jsonResponse({ error: 'Task not found' }, 404);

    if (method === 'GET') return jsonResponse(tasks[index]);

    if (method === 'PUT') {
      tasks[index] = { ...body, id };
      writeTasks(tasks);
      return jsonResponse(tasks[index]);
    }

    if (method === 'PATCH') {
      tasks[index] = { ...tasks[index], ...body, id };
      writeTasks(tasks);
      return jsonResponse(tasks[index]);
    }

    if (method === 'DELETE') {
      const [removed] = tasks.splice(index, 1);
      writeTasks(tasks);
      return jsonResponse(removed);
    }

    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  return { fetch: mockFetch };
})();
