import React from 'react';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

import { Container, Title, Warning } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const { user } = useAuth();

  return (
    <Container>
      <Title>Bem-vindo {user.name}</Title>
      <Warning>
        Agredecemos a visita. No momento o ambiente está em desenvolvimento.
        Pedimos desculpas pelo inconveniente, você receberá um e-mail no momento
        que a plataforma estiver liberada.
      </Warning>
      <Button onPress={signOut}>Fazer LogOff</Button>
    </Container>
  );
};

export default Dashboard;
