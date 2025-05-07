document.getElementById('add-task-btn').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    
    console.log('Bouton cliqué');  // Ajout d'un message dans la console

    if (taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.addEventListener('click', function() {
            li.remove();
        });
        
        li.appendChild(deleteBtn);
        document.getElementById('task-list').appendChild(li);
        taskInput.value = ''; // Réinitialiser le champ de texte
    }
});
