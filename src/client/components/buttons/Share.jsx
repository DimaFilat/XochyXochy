import { Button } from 'semantic-ui-react';
import { Col } from 'reactstrap';
import React from 'react';
import YaSoberu from '../yaSoberu/YaSoberu';

export default function Share() {
  return (
    <div>
      <Col xs="2">
        <Button style={{ backgroundColor: 'orange', width: '125px' }}>
          Вскладчину
        </Button>
      </Col>
    </div>
  );
}
