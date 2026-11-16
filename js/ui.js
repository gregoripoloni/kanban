const Ui = (() => {
  const board = document.getElementById('board');
  const statusArea = document.getElementById('status');

  function showError(message) {
    statusArea.innerHTML = `<div class="alert alert-danger mb-0" role="alert">${message}</div>`;
  }

  function clearStatus() {
    statusArea.innerHTML = '';
  }

  function taskCardHtml(task, columnIndex) {
    const previous = CONFIG.COLUMNS[columnIndex - 1];
    const next = CONFIG.COLUMNS[columnIndex + 1];
    const title = task.title;

    return `
      <article class="card mb-2 shadow-sm" data-id="${task.id}">
        <div class="card-body">
          <h3 class="fs-6 card-title text-break">${title}</h3>
          <p class="small card-text text-break">${task.description}</p>
          <div class="d-flex flex-wrap gap-1">
            ${previous ? `<button type="button" class="btn btn-sm btn-outline-secondary" data-action="move" data-target="${previous.id}" aria-label="Mover ${title} para ${previous.name}">←</button>` : ''}
            ${next ? `<button type="button" class="btn btn-sm btn-outline-secondary" data-action="move" data-target="${next.id}" aria-label="Mover ${title} para ${next.name}">→</button>` : ''}
            <button type="button" class="btn btn-sm btn-outline-primary ms-auto" data-action="edit" aria-label="Editar ${title}">Editar</button>
            <button type="button" class="btn btn-sm btn-outline-danger" data-action="delete" aria-label="Excluir ${title}">Excluir</button>
          </div>
        </div>
      </article>`;
  }

  function renderBoard(tasks) {
    board.innerHTML = CONFIG.COLUMNS.map((column, index) => {
      const columnTasks = tasks.filter((task) => task.status === column.id);
      return `
        <div class="col-12 col-md-4">
          <section class="bg-body-secondary rounded p-3" aria-labelledby="title-${column.id}">
            <h2 class="fs-5" id="title-${column.id}">
              ${column.name} <span class="badge text-bg-secondary">${columnTasks.length}</span>
            </h2>
            ${columnTasks.map((task) => taskCardHtml(task, index)).join('') || '<p class="text-body-secondary mb-0">Nenhuma tarefa.</p>'}
          </section>
        </div>`;
    }).join('');
  }

  return { showError, clearStatus, renderBoard };
})();
