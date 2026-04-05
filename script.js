function openModal(id) {
	  document.getElementById(id).classList.add('active');
	}

	function closeModal(id) {
	  document.getElementById(id).classList.remove('active');
	}

	window.addEventListener('keydown', (e) => {
	  if (e.key === 'Escape') {
		document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
	  }
	});