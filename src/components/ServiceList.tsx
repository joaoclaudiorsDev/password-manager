import React from 'react';

type Props = {
  services: Service[];
  onRemoveService: (index: number) => void;
  onAddNewService: () => void;
};

type Service = {
  serviceName: string;
  login: string;
  password: string;
  url: string;
};

function ServiceList({ services, onRemoveService, onAddNewService }: Props) {
  const handleApagarSenha = (index: number) => {
    onRemoveService(index);
  };

  return (
    <div className="service-list">
      <h3>Serviços Cadastrados:</h3>
      {services.length === 0 ? (
        <p>Nenhuma senha cadastrada.</p>
      ) : (
        services.map((service, index) => (
          <div className="service-card" key={index}>
            <p>
              service:{' '}
              <a className="visible-password" href={service.url} target="_blank" rel="noopener noreferrer">
                {service.serviceName}
              </a>
            </p>
            <p>
              login: <span className="visible-password">{service.login}</span>
            </p>
            <p>
              password: <span className="visible-password">{service.password}</span>
            </p>
            <button data-testid="remove-btn" onClick={() => handleApagarSenha(index)}>
              Remover senha
            </button>
          </div>
        ))
      )}
      <button className="form-button cadastrar-nova-senha" onClick={onAddNewService}>
        Cadastrar nova senha
      </button>
    </div>
  );
}

export default ServiceList;
