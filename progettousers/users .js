async function filtraUtenti() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        console.log('Utenti ottenuti dall\'API:', users); // Verifica i dati ottenuti dall'API

        const searchInput = document.querySelector('input[type="search"]');
        const usersTable = document.querySelector('.table tbody');

        function funzioneRicercaDropdown() {
            const filterKey = this.textContent.toLowerCase()
            const searchTerms = searchInput.value.trim().toLowerCase();
            if(filterKey.includes(users)) {
                filterAndRenderUsers(filterKey, searchTerms);
            } else {
                console.log('Filtro non valido');
            }
            
        }

        function funzioneRicercaInput() {
            const filterKey = 'name' || 'username' || 'email'
            const searchTerms = this.value.trim().toLowerCase();
            if (searchTerms.length > 0) {
                filterAndRenderUsers(filterKey, searchTerms);
            } else {
                console.log('Termine di ricerca non valido');
            }
        }

        function filterAndRenderUsers(filterKey, searchTerms) {
            const searchTerm = searchTerms.toLowerCase();
            const filteredUsers = users.filter(user => {
                const userValue = user[filterKey].trim().toLowerCase();
                console.log('Valore di confronto:', userValue); // Verifica il valore utilizzato per il confronto
                return userValue.includes(searchTerm);
            });
            console.log('Utenti filtrati:', filteredUsers); // Verifica gli utenti filtrati
            renderUsers(filteredUsers);
        }

        function renderUsers(users) {
            console.log('Renderizzazione utenti:', users); // Verifica gli utenti da renderizzare
            usersTable.innerHTML = '';
            users.forEach((user, index) => {
                const row = `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${user.email}</td>
                    <td>${user.username}</td>
                    <td>${user.name}</td>
                </tr>
            `;
            usersTable.insertAdjacentHTML('beforeend', row);
            });
        }

        const dropDownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');
        dropDownItems.forEach(item => {
            item.addEventListener('click', funzioneRicercaDropdown);
        });

        searchInput.addEventListener('input', funzioneRicercaInput);

        // Renderizza gli utenti iniziali
        renderUsers(users);

    } catch (error) {
        console.error('Errore durante il recupero degli utenti:', error);
    }
}

filtraUtenti();



/* async function FilterAndSearchUsers () {
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const users = await response.json()

        const searchInput = document.querySelector('input[type="search"]')
        const usersTable = document.querySelector('.table tbody')

        function dropDownFilter() {
            const filterKey = this.textContent.toLowerCase()
            const searchValue = searchInput.value.trim().toLowerCase()

            if(filterKey.includes(users)) {
                searchUsers(filterKey, searchValue)
            } else {
                console.log('filtro non valido');
            }
        }

        function inputSearch() {
            const filterKey = 'name' || 'username' || 'email'
            const searchValue = searchInput.value.trim().toLowerCase()

            if(searchValue.length > 0) {
                searchUsers(filterKey, searchValue)
            } else {
                console.log('termine di ricerca non valido')
            }
        }

        function searchUsers(filterKey, searchValue) {
            const userfiltered = users.filter(user => {
                user[filterKey].trim().toLowerCase()
                return userfiltered.includes(searchValue)
            })

            renderUsers(userfiltered)
        }

        function renderUsers(users) {
            usersTable.innerHTML = ''
            users.forEach((user, index) => {
                const row = `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${user.email}</td>
                    <td>${user.username}</td>
                    <td>${user.name}</td>
                </tr>
            `;
            usersTable.insertAdjacentHTML('beforeend', row)
            })
        }

        const dropDownClick = document.querySelectorAll('.dropdown-menu .dropdown-item')
        dropDownClick.forEach(item => {
            item.addEventListener('click', dropDownFilter)
        })

        searchInput.addEventListener('input', inputSearch)

        renderUsers(users)

    } catch (error) {
        console.error('Errore durante il recupero degli utenti:', error);
    }

}

FilterAndSearchUsers()
 */