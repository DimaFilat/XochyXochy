import React, { Component } from 'react';

export class YaSoberu extends Component {
  render() {
    return (
      <div>
        <iframe
          src="https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%B4%D0%B0%D1%80%D0%BE%D0%BA%20%D0%B4%D1%80%D1%83%D0%B3%D1%83&targets-hint=%D1%82%D0%B5%D0%BA%D1%81%D1%82%20%D0%B4%D0%BB%D1%8F%20%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B4%D0%B0&default-sum=1234&button-text=13&payment-type-choice=on&fio=on&comment=on&mail=on&hint=&successURL=https%3A%2F%2Fheroku.app&quickpay=shop&account=4100190925064"
          width="423"
          height="301"
          frameBorder="0"
          allowtransparency="true"
          scrolling="no"
        ></iframe>{' '}
      </div>
    );
  }
}

export default YaSoberu;
