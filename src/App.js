import React, { useEffect, useState } from "react";
import api from './services/api';
import "./styles.css";
function App() {
const [ repositories, setRepositories ] = useState(["App DevMaster", "https://www.gituhub.com/devmaster", "John Wick"])
useEffect(() => {
  api.get('repositories').then( response => {
    setRepositories(response.data)
     })
  
}, [])
  async function handleAddRepository() {
    const newRepository = {
      title: "repositorio 1",
      url: "http://github.com/repo1",
      techs: ["ReactJS, ReactNative, TypeScript"]
    }
  const response = await api.post('repositories', newRepository)
  setRepositories([...repositories, response.data])
  }
  async function handleRemoveRepository(id) {
  await api.delete(`repositories/${id}`)
  setRepositories(repositories.filter(repository => repository.id !== id))
  }
  return (
    <div>
    <ul data-testid="repository-list">
    {repositories.map(repository => 
    <li key={repository.title}>{repository.title}
    <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
    </li>
  )}
  </ul>
<button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
