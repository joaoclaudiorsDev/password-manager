import React, { useState } from 'react';

type Propstype = {
  onCancel: () => void;
};

type Service = {
  serviceName: string;
  login: string;
  password: string;
  url: string;
};

function Form({ onCancel }: Propstype) {
  const [serviceName, setServiceName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [formVisible, setFormVisible] = useState(true);

  const handleCancelar = () => {
    onCancel();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === 'inpt1') {
      setServiceName(value);
    } else if (id === 'inpt2') {
      setLogin(value);
    } else if (id === 'inpt3') {
      setPassword(value);
    } else if (id === 'inpt4') {
      setUrl(value);
    }
  };

  const isFormValid = serviceName !== ''
    && login !== ''
    && password !== ''
    && password.length >= 8
    && password.length <= 16
    && /\d/.test(password)
    && /[a-zA-Z]/.test(password)
    && /[!@#$%^&*]/.test(password);

  const passwordValidations = [
    { text: 'Possuir 8 ou mais caracteres', isValid: password.length >= 8 },
    { text: 'Possuir até 16 caracteres', isValid: password.length <= 16 },
    {
      text: 'Possuir letras e números',
      isValid: /\d/.test(password) && /[a-zA-Z]/.test(password),
    },
    {
      text: 'Possuir algum caractere especial',
      isValid: /[!@#$%^&*]/.test(password),
    },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newService: Service = { serviceName, login, password, url };
    setServices([...services, newService]);
    setServiceName('');
    setLogin('');
    setPassword('');
    setUrl('');
    setFormVisible(false);
  };

  const handleCadastrarNovaSenha = () => {
    setFormVisible(true);
  };

  const handleApagarSenha = (index: number) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  return (
    <div className="form-wrapper">
      {formVisible ? (
        <form className="form-container" onSubmit={ handleSubmit }>
          <label className="form-label" htmlFor="inpt1">
            Nome do serviço
          </label>
          <input
            className="form-input"
            id="inpt1"
            type="text"
            value={ serviceName }
            onChange={ handleInputChange }
          />

          <label className="form-label" htmlFor="inpt2">
            Login
          </label>
          <input
            className="form-input"
            id="inpt2"
            type="text"
            value={ login }
            onChange={ handleInputChange }
          />

          <label className="form-label" htmlFor="inpt3">
            Senha
          </label>
          <input
            className="form-input"
            id="inpt3"
            type="password"
            value={ password }
            onChange={ handleInputChange }
          />

          <label className="form-label" htmlFor="inpt4">
            URL
          </label>
          <input
            className="form-input"
            id="inpt4"
            type="text"
            value={ url }
            onChange={ handleInputChange }
          />

          <ul>
            {passwordValidations.map(({ text, isValid }, index) => (
              <li
                key={ index }
                className={ isValid ? 'valid-password-check' : 'invalid-password-check' }
              >
                {text}
              </li>
            ))}
          </ul>

          <button className="form-button form-button-cancel" onClick={ handleCancelar }>
            Cancelar
          </button>

          <button
            className={ `form-button ${isFormValid ? 'cadastrar-active' : ''}` }
            disabled={ !isFormValid }
          >
            Cadastrar
          </button>
        </form>
      ) : (
        <div className="service-list">
          <h3>Serviços Cadastrados:</h3>
          {services.length === 0 ? (
            <p>Nenhuma senha cadastrada.</p>
          ) : (
            services.map((service, index) => (
              <div className="service-card" key={ index }>
                <p>
                  service:
                  {' '}
                  <a href={ service.url } target="_blank" rel="noopener noreferrer">
                    {service.serviceName}
                  </a>
                </p>
                <p>login:</p>
                <p>{service.login}</p>
                <p>
                  password:
                  {' '}
                  <span className="visible-password">{service.password}</span>
                </p>
                <button
                  data-testid="remove-btn"
                  onClick={ () => handleApagarSenha(index) }
                >
                  Remover senha
                </button>
              </div>
            ))
          )}
          <button
            className="form-button cadastrar-nova-senha"
            onClick={ handleCadastrarNovaSenha }
          >
            Cadastrar nova senha
          </button>
        </div>
      )}
    </div>
  );
}

export default Form;
