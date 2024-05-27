export const INITIAL_RECEIPT = {
  id: Date.now(),
  num: '04/2020',
  loc: '',
  amount: 0,
  date: new Date(),
  expiration: new Date(),
  home: '',
  concepts: [
    {
      name: '',
      amount: 0,
    },
  ],
  payer: {
    name: '',
    address: '',
  },
  collector: {
    name: '',
    address: '',
  },
  notes: '',
};

export const formatDate = (date: Date): string => {
  const result = date.toLocaleString('en-US', {
    month: '2-digit',
    year: 'numeric',
  });
  return result;
};
