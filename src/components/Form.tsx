import React, { useState } from 'react';
import ServiceList from './ServiceList';
import ServiceForm from './ServiceForm';

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
  const [services, setServices] = useState<Service[]>([]);
  const [formVisible, setFormVisible] = useState(true);

  const handleCancelar = () => {
    onCancel();
  };

  const handleCadastrarNovaSenha = () => {
    setFormVisible(true);
  };

  const handleApagarSenha = (index: number) => {
    setServices((prevServices) => {
      const updatedServices = [...prevServices];
      updatedServices.splice(index, 1);
      return updatedServices;
    });
  };

  const handleAddService = (newService: Service) => {
    setServices([...services, newService]);
    setFormVisible(false);
  };

  return (
    <div className="form-wrapper">
      {formVisible ? (
        <ServiceForm onCancel={handleCancelar} onAddService={handleAddService} />
      ) : (
        <ServiceList services={services} onRemoveService={handleApagarSenha} onAddNewService={handleCadastrarNovaSenha} />
      )}
    </div>
  );
}

export default Form;
