import './App.css';
import { useState } from 'react';
import Form from './components/Form';

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleCadastrarNovaSenha = () => {
    setShowForm(true);
  };

  const handleCancelar = () => {
    setShowForm(false);
  };

  return (
    <>
      <header>
        <h1> Gerenciador de senhas</h1>

      </header>
      <div className="home">
        {showForm ? (
          <Form onCancel={ handleCancelar } />
        ) : (
          <>
            <span>nenhuma senha cadastrada</span>
            <button onClick={ handleCadastrarNovaSenha }>Cadastrar nova senha</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
