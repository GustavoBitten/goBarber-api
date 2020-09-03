import React from 'react';

import { useTransition } from 'react-spring';
import { Conteiner } from './styles';
import { ToastMessage } from '../../hooks/toast';
import { Toast } from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%' },
      enter: { right: '110%' },
      leave: { right: '-120%' },
    },
  );
  return (
    <Conteiner>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Conteiner>
  );
};

export default ToastContainer;
