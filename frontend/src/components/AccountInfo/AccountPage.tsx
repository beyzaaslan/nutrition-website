import  { useState } from 'react';
import AccountInfo from './AccountInfo';
import Orders from './Orders';
import LayoutAccount from './LayoutAccount';
import Address from './AddressList';

const AccountPage = () => {
  const [selectedTab, setSelectedTab] = useState('account');

  const renderContent = () => {
    switch (selectedTab) {
      case 'account':
        return <AccountInfo />;
      case 'orders':
        return <Orders />;
      case 'address':
        return <Address />;
      default:
        return null;
    }
  };

  return (
    <LayoutAccount onTabChange={setSelectedTab}>
      {renderContent()}
    </LayoutAccount>
  );
};

export default AccountPage;