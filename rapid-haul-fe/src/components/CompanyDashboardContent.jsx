import React, { useEffect } from 'react';
import { Button, Table } from 'antd';
import { useRouter } from 'next/navigation';
import { fetchCompanies } from '@/store/companiesSlice';
import { useDispatch, useSelector } from 'react-redux';

const CompanyDashboardContent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies?.companiesList);

  const companyColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Phone Number?',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
  ];

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleGoToProfile = () => {
    router.push('/dashboard/company');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button
        type="primary"
        onClick={handleGoToProfile}
        style={{ marginBottom: '20px' }}
      >
        Go to Profile
      </Button>
      <Table columns={companyColumns} dataSource={companies} rowKey="id" />
    </div>
  );
};

export default CompanyDashboardContent;
