(() => {
  let tasks = [];

  const board = document.getElementById('board');
  const form = document.getElementById('task-form');
  const idField = document.getElementById('task-id');
  const titleField = document.getElementById('task-title');
  const descriptionField = document.getElementById('task-description');
  const statusField = document.getElementById('task-status');
  const formError = document.getElementById('form-error');
  const saveButton = document.getElementById('btn-save');
  const modal = new bootstrap.Modal(document.getElementById('task-modal'));

  async function loadTasks() {
    try {
      tasks = await Api.listTasks();
      Ui.clearStatus();
      Ui.renderBoard(tasks);
    } catch (error) {
      Ui.showError(error.message);
    }
  }

  function openModal(task = null) {
    form.classList.remove('was-validated');
    formError.classList.add('d-none');
    document.getElementById('modal-title').textContent = task ? 'Editar tarefa' : 'Nova tarefa';
    idField.value = task?.id ?? '';
    titleField.value = task?.title ?? '';
    descriptionField.value = task?.description ?? '';
    statusField.value = task?.status ?? CONFIG.COLUMNS[0].id;
    modal.show();
  }

  async function saveTask(event) {
    event.preventDefault();
    form.classList.add('was-validated');
    if (!form.checkValidity()) return;

    const data = {
      title: titleField.value.trim(),
      description: descriptionField.value.trim(),
      status: statusField.value,
    };

    saveButton.disabled = true;
    formError.classList.add('d-none');
    try {
      if (idField.value) {
        await Api.updateTask(idField.value, data);
      } else {
        await Api.createTask(data);
      }
      modal.hide();
      await loadTasks();
    } catch (error) {
      formError.textContent = error.message;
      formError.classList.remove('d-none');
    } finally {
      saveButton.disabled = false;
    }
  }

  async function handleBoardClick(event) {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const id = button.closest('[data-id]').dataset.id;
    const task = tasks.find((item) => item.id === id);
    const { action, target } = button.dataset;

    try {
      if (action === 'edit') {
        openModal(task);
        return;
      }
      if (action === 'delete') {
        if (!confirm(`Excluir a tarefa "${task.title}"?`)) return;
        await Api.deleteTask(id);
      }
      if (action === 'move') {
        await Api.moveTask(id, target);
      }
      await loadTasks();
    } catch (error) {
      Ui.showError(error.message);
    }
  }

  function init() {
    statusField.innerHTML = CONFIG.COLUMNS.map((column) => `<option value="${column.id}">${column.name}</option>`).join('');
    document.getElementById('btn-new-task').addEventListener('click', () => openModal());
    form.addEventListener('submit', saveTask);
    board.addEventListener('click', handleBoardClick);
    loadTasks();
  }

  init();
})();
