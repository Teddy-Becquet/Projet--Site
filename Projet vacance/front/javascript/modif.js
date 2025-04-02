alert("coucou");




// Fetch the ranking data from the API
fetch('http://192.168.64.175/classement')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Assuming 'data' is an array of rankings
    const classement = document.createElement('ul');
    data.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.team}: ${item.points} points`;
      classement.appendChild(listItem);
    });
    document.body.appendChild(classement);
  })
  .catch(error => {
    console.error('Error fetching the ranking data:', error);
  });
