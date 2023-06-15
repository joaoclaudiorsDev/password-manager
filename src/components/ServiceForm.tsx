import React, { useState } from 'react';

type Props = {
  onCancel: () => void;
  onAddService: (service: Service) => void;
};

type Service = {
  serviceName: string;
  login: string;
  password: string;
  url: string;
};

function ServiceForm({ onCancel, onAddService }: Props) {
  const [service, setService] = useState<Service>({
    serviceName: '',
    login: '',
    password: '',
    url: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setService((prevService) => ({
      ...prevService,
      [id]: value,
    }));
  };

  const isFormValid =
    service.serviceName !== '' &&
    service.login !== '' &&
    service.password !== '' &&
    service.password.length >= 8 &&
    service.password.length <= 16 &&
    /\d/.test(service.password) &&
    /[a-zA-Z]/.test(service.password) &&
    /[!@#$%^&*]/.test(service.password);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddService(service);
    setService({
      serviceName: '',
      login: '',
      password: '',
      url: '',
    });
  };

  const passwordValidations = [
    {
      text: 'Possuir algum caractere especial',
      isValid: /[!@#$%^&*]/.test(service.password),
    },
    { text: 'Possuir 8 ou mais caracteres', isValid: service.password.length >= 8 },
    { text: 'Possuir até 16 caracteres', isValid: service.password.length <= 16 },
    {
      text: 'Possuir letras e números',
      isValid: /\d/.test(service.password) && /[a-zA-Z]/.test(service.password),
    },
   
  ];

  return (
    <>
    <form className="form-container" onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="inpt1">
        Nome do serviço:
      </label>
      <input
        className="form-input"
        id="serviceName"
        type="text"
        value={service.serviceName}
        onChange={handleInputChange}
      />

      <label className="form-label" htmlFor="inpt2">
        Login:
      </label>
      <input
        className="form-input"
        id="login"
        type="text"
        value={service.login}
        onChange={handleInputChange}
      />

      <label className="form-label" htmlFor="inpt3">
        Senha:
      </label>
      <input
        className="form-input"
        id="password"
        type="password"
        value={service.password}
        onChange={handleInputChange}
      />

      <label className="form-label" htmlFor="inpt4">
        URL:
      </label>
      <input
        className="form-input"
        id="url"
        type="text"
        value={service.url}
        onChange={handleInputChange}
      />
       <div id="container-ul">
          <ul>
            {passwordValidations.map(({ text, isValid }, index) => (
              <li
                key={index}
                className={isValid ? 'valid-password-check' : 'invalid-password-check'}
              >
                {text}
              </li>
            ))}
          </ul>
      </div>
    </form>

    <div className="container-button">
        <button className="form-button form-button-cancel" onClick={onCancel}>
          Cancelar
        </button>

        <button className={`form-button ${isFormValid ? 'cadastrar-active' : ''}`} onClick={onAddService} disabled={!isFormValid}>
          Cadastrar
        </button>
      </div>         
  </>
  );
}

export default ServiceForm;
